import Anchor from '@components/anchor/Anchor';
import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Container from '@components/base/container/Container';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
// import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import Divider from '@components/divider/Divider';
// import Dropdown from '@components/dropdown/Dropdown';
import CoinPrice from '@components/shared/CoinPrice';
import coins from '@constants/coins';
import { GET_OFFERS } from '@graphql/offer';
import useApolloQuery from '@hooks/useApolloQuery';
import useOffers from '@hooks/useOffers';
import Offer from '@ts_types/offer';
import currencySymbol from '@utils/currencySymbol';
import formatDecimal from '@utils/formatDecimal';
import marginPrice from '@utils/marginPrice';
import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const typeTabs = [
  { label: 'Sell', value: 'buy' },
  { label: 'Buy', value: 'sell' },
];

const Filters = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const TYPE = searchParams.get('type') || 'sell';

  return (
    <Container
      p={0}
      maxWidth={'full'}
      minHeight={'full'}
    >
      <Divider
        my={6}
        backgroundColor={'transparent'}
      />

      <Flex gap={4}>
        {typeTabs.map((type) => {
          const isActive = type.value === TYPE;

          return (
            <Anchor
              py={8}
              border={1}
              width={'full'}
              key={type.value}
              to={`${pathname}?type=${type.value}`}
              color={isActive ? 'gray-10' : 'gray-60'}
              borderColor={isActive ? 'gray-90' : 'transparent'}
              backgroundColor={isActive ? 'white' : 'transparent'}
              boxShadow={
                isActive ? '0px .5px 0px 0px rgba(var(--gray-80))' : ''
              }
              _hover={{
                color: 'gray-10',
                backgroundColor: isActive ? 'white' : 'gray-100',
              }}
            >
              {type.label}
            </Anchor>
          );
        })}
      </Flex>
    </Container>
  );
};

const List = () => {
  const { setOffers } = useOffers();
  const { search } = useLocation();
  const [searchParams] = useSearchParams();

  const TYPE = searchParams.get('type') || 'sell';

  const { data, error } = useApolloQuery(GET_OFFERS, {
    variables: {
      payload: {
        page: 1,
        limit: 12,
        type: TYPE,
        assets: 'all',
      },
    },
  });

  if (!data || !data?.getOffers) return null;

  if (error)
    return (
      <Heading
        fontSize={16}
        color={'red-60'}
      >
        Unable to fetch offers. Try refreshing the page.
      </Heading>
    );

  const { total, offers } = data.getOffers;

  return (
    <Box
      border={1}
      rounded={12}
      overflow={'clip'}
      borderColor={'gray-90'}
      backgroundColor={'white'}
      boxShadow={'0px .5px 0px 0px rgba(var(--gray-80))'}
      notLastChild={{
        borderBottom: 1,
        borderBottomColor: 'gray-90',
      }}
    >
      <Flex
        px={12}
        py={8}
      >
        <Heading fontSize={14}>Found {`${total || 0}`} offers</Heading>
      </Flex>

      {offers?.map((offer: Offer.Type) => {
        const COIN = coins.find((coin) => coin.id === offer.coinId)!;

        return (
          <Anchor
            py={10}
            px={12}
            gap={12}
            width={'full'}
            key={offer._id}
            rounded={'none'}
            textAlign={'left'}
            onClick={() =>
              setOffers({
                type: 'SET_CURRENT_OFFER',
                payload: { offer: offer },
              })
            }
            justifyContent={'start'}
            to={`/app/offers/${offer._id}/${search}`}
            _hover={{ backgroundColor: 'gray-100' }}
          >
            <Avatar
              hasError
              backgroundColor={'gray-95'}
            >
              <Avatar.Fallback
                fontSize={14}
                textTransform={'capitalize'}
              >{`${offer?.createdBy?.firstName?.substring(
                0,
                1
              )}`}</Avatar.Fallback>
            </Avatar>

            <Box css={{ flex: 1 }}>
              <Flex
                alignItems={'center'}
                justifyContent={'between'}
              >
                <Heading
                  fontSize={14}
                  lineHeight={'1'}
                  textTransform={'capitalize'}
                >
                  {`${offer.type}ing ${
                    offer.amount
                  } ${COIN.symbol.toUpperCase()}`}
                </Heading>
                <CoinPrice
                  fiat={offer.fiat}
                  coinId={offer.coinId}
                >
                  {({ price }) => {
                    return (
                      <Text
                        fontSize={13}
                        lineHeight={'1'}
                        color={'gray-10'}
                        fontWeight={'semibold'}
                      >
                        {`${currencySymbol(offer.fiat)}${marginPrice(
                          price,
                          offer.priceMargin
                        )}`}
                      </Text>
                    );
                  }}
                </CoinPrice>
              </Flex>

              <Flex
                mt={10}
                alignItems={'center'}
                justifyContent={'between'}
              >
                <Text
                  fontSize={13}
                  lineHeight={'1'}
                >
                  Min. {`${formatDecimal(offer.minLimit)}`}
                </Text>
                <Text
                  fontSize={13}
                  lineHeight={'1'}
                >
                  Max. {`${formatDecimal(offer.maxLimit)}`}
                </Text>
              </Flex>
            </Box>
          </Anchor>
        );
      })}
    </Box>
  );
};

const SideBar = () => {
  const { pathname } = useLocation();

  const isParentRoute = pathname === '/app/';

  return (
    <React.Fragment>
      {/* <Dropdown
        pt={32}
        px={12}
        display={{ initial: 'flex', md: 'hidden' }}
      >
        <Dropdown.Trigger
          py={6}
          width={'fit'}
          color={'gray-60'}
          borderColor={'gray-90'}
          backgroundColor={'white'}
          boxShadow={'0px .5px 0px 0px rgba(var(--gray-80))'}
          _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
        >
          <Iconify
            width={16}
            icon={'fluent:options-24-regular'}
          />
          Filters
        </Dropdown.Trigger>
        <Dropdown.Content
          px={12}
          py={20}
          top={'0px'}
          width={'100%'}
          height={'100vh'}
          rounded={'none'}
          backgroundColor={'gray-95'}
        >
          <Flex
            alignItems={'center'}
            justifyContent={'between'}
          >
            <Heading fontSize={21}>Filters</Heading>
            <Dropdown.Trigger
              p={4}
              size={'24px'}
              rounded={'full'}
              color={'gray-60'}
              borderColor={'gray-90'}
              backgroundColor={'white'}
              boxShadow={'0px .5px 0px 0px rgba(var(--gray-80))'}
              _hover={{ backgroundColor: 'gray-90' }}
            >
              <Iconify
                width={16}
                icon={'fluent:dismiss-24-regular'}
              />
            </Dropdown.Trigger>
          </Flex>
          <Filters />
        </Dropdown.Content>
      </Dropdown> */}

      <Box
        p={12}
        borderRight={1}
        minHeight={'screen'}
        position={{ md: 'fixed' }}
        borderRightColor={'gray-80'}
        width={{ initial: 'full', md: '400px' }}
        display={{ initial: isParentRoute ? 'block' : 'hidden', md: 'block' }}
      >
        <Heading>Market</Heading>
        <Filters />
        <Divider
          my={8}
          backgroundColor={'transparent'}
        />
        <List />
      </Box>
    </React.Fragment>
  );
};

export default SideBar;
