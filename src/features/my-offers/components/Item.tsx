import Offer from '@ts_types/offer';
import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Text from '@components/base/text/Text';
import Avatar from '@components/avatar/Avatar';
import { formatDistanceToNow } from 'date-fns';
import formatDecimal from '@utils/formatDecimal';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Dropdown from '@components/dropdown/Dropdown';
import ManageOfferFeature from '@features/shared/dropdowns/manage-offers/Feature';
import useOffers from '@hooks/useOffers';
import Badge from '@components/badge/Badge';

const List = ({ label, value }: { label: string; value: string }) => {
  return (
    <Flex justifyContent={'between'}>
      <Text
        fontSize={13}
        color={'gray-60'}
        fontWeight={'medium'}
      >
        {label}
      </Text>
      <Text
        fontSize={13}
        color={'gray-10'}
        fontWeight={'semibold'}
      >
        {value}
      </Text>
    </Flex>
  );
};

type Props = { offer: Offer.Type };

const Item = ({ offer }: Props) => {
  const { setOffers } = useOffers();

  const RATE = offer.coin.quote[offer.fiat.symbol].price;
  const PERCENTAGE = offer.margin / 100;
  const AMOUNT_TO_ADD = RATE * PERCENTAGE;

  const AMOUNT =
    offer.type === 'sell' ? RATE + AMOUNT_TO_ADD : RATE - AMOUNT_TO_ADD;

  return (
    <Flex
      p={16}
      gap={0}
      border={1}
      rounded={8}
      width={'full'}
      color={'gray-40'}
      borderColor={'gray-90'}
      flexDirection={'column'}
      backgroundColor={'white'}
      boxShadow={'0px 1px 0px 0px rgb(var(--gray-90))'}
    >
      <Flex
        gap={12}
        width={'full'}
        alignItems={'start'}
      >
        <Box
          py={2}
          css={{ flex: 1 }}
        >
          <Flex
            gap={6}
            alignItems={'center'}
          >
            <Heading
              fontSize={21}
              textAlign={'left'}
            >
              {`${offer.fiat.sign}`}
              {formatDecimal(AMOUNT || 0)}
            </Heading>
            <Badge
              py={4}
              px={8}
              rounded={8}
              backgroundColor={'indigo-60'}
            >
              <Badge.Caption
                fontSize={12}
                lineHeight={'1'}
                color={'white'}
                fontWeight={'semibold'}
              >{`${offer.type === 'sell' ? '+' : '-'}${
                offer.margin
              }%`}</Badge.Caption>
            </Badge>
          </Flex>

          <Text
            fontSize={13}
            color={'gray-60'}
            textAlign={'left'}
            fontWeight={'medium'}
            textTransform={'capitalize'}
          >{`${offer.type} ${offer.coin.symbol}`}</Text>
        </Box>

        <Dropdown
          justifyContent={'end'}
          minWidth={'200px'}
        >
          <Dropdown.Trigger
            p={0}
            size={'24px'}
            color={'gray-40'}
            borderColor={'transparent'}
            backgroundColor={'gray-95'}
            _hover={{ color: 'gray-10', backgroundColor: 'gray-90' }}
            onClick={() => {
              setOffers({ type: 'SET_CURRENT_OFFER', payload: { offer } });
            }}
          >
            <Iconify
              width={20}
              icon={'fluent:more-horizontal-24-regular'}
            />
          </Dropdown.Trigger>
          <ManageOfferFeature />
        </Dropdown>
      </Flex>

      <Box
        mt={20}
        notLastChild={{ mb: 8 }}
      >
        <List
          label={'Min. Limit'}
          value={`${offer.fiat.symbol}${formatDecimal(offer.minLimit)}`}
        />
        <List
          label={'Max. Limit'}
          value={`${offer.fiat.symbol}${formatDecimal(offer.maxLimit)}`}
        />
        <List
          label={'Offer time limit'}
          value={`${offer.timeout} minutes`}
        />
        <List
          label={'Offer status'}
          value={offer.isActive ? 'Active' : 'Not Active'}
        />
      </Box>

      <Flex
        mt={20}
        alignItems={'center'}
        justifyContent={'between'}
      >
        <Avatar
          p={6}
          border={1}
          size={'32px'}
          rounded={'full'}
          borderColor={'gray-90'}
          backgroundColor={'white'}
          boxShadow={'0px .75px 1px 0px rgb(var(--gray-80))'}
        >
          <Avatar.Picture src={offer.coin.logo} />
        </Avatar>

        <Text
          fontSize={12}
          color={'gray-60'}
          fontWeight={'medium'}
        >{`${formatDistanceToNow(new Date(offer.createdAt), {
          includeSeconds: true,
          addSuffix: true,
        })}`}</Text>
      </Flex>
    </Flex>
  );
};

export default Item;
