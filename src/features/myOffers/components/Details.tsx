import React from 'react';
import Overlay from '@components/overlay/Overlay';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Dropdown from '@components/dropdown/Dropdown';
import useApolloQuery from '@hooks/useApolloQuery';
import { GET_OFFER } from '@graphql/offer';
import coins from 'src/constants/coins';
import Flex from '@components/base/flex/Flex';
import Image from '@components/base/image/Image';
import useTanstackQuery from '@hooks/useTanstackQuery';
import { getCoinPrice } from 'src/apis/coins';
import Text from '@components/base/text/Text';
import Box from '@components/base/box/Box';
import number from '@utils/number';
import Divider from '@components/divider/Divider';
import Loader from '@components/base/button/Loader';

const Item = (props: { label: string; value: string }) => {
  const { label, value } = props;

  return (
    <Flex
      py={8}
      alignItems={'center'}
      justifyContent={'between'}
    >
      <Text fontSize={12}>{label}</Text>
      <Heading
        as={'h4'}
        fontSize={12}
        textAlign={'right'}
        letterSpacing={'xs'}
      >
        {value}
      </Heading>
    </Flex>
  );
};

const Price = ({
  fiat,
  coinId,
  priceMargin,
}: {
  fiat: string;
  coinId: string;
  priceMargin: number;
}) => {
  const {
    isFetching,
    error,
    data: coinPrice,
  } = useTanstackQuery<any>({
    queryKey: [coinId, fiat],
    queryFn: getCoinPrice,
    initialData: null,
  });

  const price = coinPrice ? coinPrice[coinId][fiat] : 0;

  const rate = price * (priceMargin / 100) + price;

  switch (true) {
    case isFetching:
      return (
        <Loader
          visible={true}
          color={'gray-60'}
        />
      );
    case error !== null:
      return (
        <Text
          fontSize={13}
          color={'red-60'}
        >
          Error
        </Text>
      );
    default:
      return (
        <Text
          as={'p'}
          fontSize={13}
          letterSpacing={'xs'}
          fontWeight={'medium'}
          textTransform={'uppercase'}
        >
          {`${fiat} ${number.formatDecimal(rate)}`}
        </Text>
      );
  }
};

type Props = {
  offerId: string;
};

const Content = ({ offerId }: { offerId: string }) => {
  const { loading, error, data } = useApolloQuery(GET_OFFER, {
    variables: { id: offerId },
  });

  const offer = data?.getOffer;

  if (!offer) return null;

  switch (true) {
    case loading:
      return (
        <Loader
          width={'20px'}
          visible={true}
          color={'gray-60'}
        />
      );
    case error !== undefined:
      return (
        <React.Fragment>
          <Iconify
            width={'40px'}
            color={'red-60'}
            icon={'material-symbols-light:warning-rounded'}
          />
          <Heading
            mt={12}
            fontSize={21}
          >
            Query failed
          </Heading>
        </React.Fragment>
      );

    default:
      const selectedCoin = coins.find((coin) => coin.id === offer.coinId)!;

      return (
        <React.Fragment>
          <Divider my={12} />

          <Flex
            flexDirection={'column'}
            alignItems={'center'}
          >
            <Image
              p={4}
              size={'32px'}
              rounded={'full'}
              src={selectedCoin.image}
              boxShadow={'ringGray95'}
              alt={`${selectedCoin.symbol}`}
            />

            <Heading
              mt={12}
              mb={8}
              fontSize={17}
              letterSpacing={'xs'}
              textAlign={'center'}
              textTransform={'capitalize'}
            >{`${offer.type} ${selectedCoin.id}`}</Heading>

            <Price
              fiat={offer.fiat}
              coinId={offer.coinId}
              priceMargin={offer.priceMargin}
            />
          </Flex>

          <Divider my={20} />

          <Box
            px={16}
            width={'full'}
            notLastChild={{
              borderBottom: 1,
              borderBottomColor: 'gray-95',
            }}
          >
            <Item
              label={'Limits'}
              value={
                offer
                  ? `${offer.minLimit} - ${
                      offer.maxLimit
                    } ${offer.fiat.toUpperCase()}`
                  : ''
              }
            />
            <Item
              label={'Amount'}
              value={
                offer
                  ? `${offer.amount} ${selectedCoin!.symbol.toUpperCase()}`
                  : ''
              }
            />
            <Item
              label={'Payment method'}
              value={
                offer
                  ? `${offer.payment.method} - ${offer.payment.bankAccountNumber}`
                  : ''
              }
            />
          </Box>
        </React.Fragment>
      );
  }
};

const Details = ({ offerId }: Props) => {
  return (
    <Overlay>
      {({ setIsOpen }) => {
        return (
          <React.Fragment>
            <Dropdown.Item onClick={() => setIsOpen(true)}>
              <Iconify
                width={'20px'}
                icon={'material-symbols-light:file-present-rounded'}
              />
              Details
            </Dropdown.Item>

            <Overlay.Panel justifyContent={{ initial: 'end', sm: 'center' }}>
              <Overlay.Background />
              <Overlay.Content
                py={12}
                maxWidth={'400px'}
                minHeight={'200px'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Flex
                  px={16}
                  gap={8}
                  width={'full'}
                  alignItems={'center'}
                  justifyContent={'between'}
                  borderBottomColor={'gray-90'}
                >
                  <Heading
                    fontSize={21}
                    textTransform={'capitalize'}
                  >
                    Offer details
                  </Heading>
                  <Overlay.Trigger
                    p={0}
                    size={'24px'}
                    rounded={'full'}
                    color={'gray-50'}
                    borderColor={'gray-90'}
                    backgroundColor={'transparent'}
                    _hover={{
                      color: 'red-30',
                      borderColor: 'red-95',
                      backgroundColor: 'red-95',
                    }}
                  >
                    <Iconify
                      width={'24px'}
                      icon={
                        'material-symbols-light:close-small-outline-rounded'
                      }
                    />
                  </Overlay.Trigger>
                </Flex>
                <Content offerId={offerId} />
              </Overlay.Content>
            </Overlay.Panel>
          </React.Fragment>
        );
      }}
    </Overlay>
  );
};

export default Details;
