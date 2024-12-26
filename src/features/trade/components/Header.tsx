import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import Overlay from '@components/overlay/Overlay';
import PaymentFeature from '@features/shared/modals/payment/Feature';
import TradePaymentFeature from '@features/shared/modals/trade-pay/Feature';
import useTrades from '@hooks/useTrades';
import useUser from '@hooks/useUser';
import currencySymbol from '@utils/currencySymbol';
import formatDecimal from '@utils/formatDecimal';

const Header = () => {
  const { user } = useUser();
  const { trade } = useTrades();

  const IS_SELLER =
    (trade?.offer?.type === 'buy' &&
      user?._id === trade.offer.createdBy?._id) ||
    (trade?.offer?.type === 'sell' && user?._id === trade.createdBy?._id);

  return (
    <Flex
      py={8}
      px={20}
      gap={12}
      top={'0px'}
      borderBottom={1}
      position={'sticky'}
      alignItems={'center'}
      backdropBlur={'lg'}
      borderBottomColor={'gray-95'}
      backgroundColor={'white/50'}
    >
      <Avatar
        hasError
        size={'32px'}
        backgroundColor={'gray-90'}
      >
        <Avatar.Fallback
          fontSize={14}
          lineHeight={'1'}
          color={'gray-10'}
        >
          {trade?.createdBy?.firstName?.substring(0, 1)}
        </Avatar.Fallback>
      </Avatar>

      <Box css={{ flex: 1 }}>
        <Heading
          fontSize={14}
          textTransform={'capitalize'}
        >{`${trade?.createdBy?.firstName} ${trade?.createdBy?.lastName}`}</Heading>
        <Text fontSize={12}>{`${trade?.rate} * ${
          trade?.amount
        } = ${currencySymbol(trade?.offer?.fiat)}${formatDecimal(
          (trade?.rate || 0) * (trade?.amount || 0)
        )}`}</Text>
      </Box>

      <Overlay ms={4}>
        <Overlay.Trigger
          p={2}
          rounded={'full'}
          color={'gray-60'}
          borderColor={'transparent'}
          backgroundColor={'transparent'}
          _hover={{
            color: 'gray-10',
            backgroundColor: 'gray-90',
          }}
        >
          <Iconify
            width={20}
            icon={'fluent:building-bank-24-regular'}
          />{' '}
        </Overlay.Trigger>
        <PaymentFeature payment={trade?.offer?.payment} />
      </Overlay>

      {IS_SELLER ? (
        <Overlay>
          <Overlay.Trigger
            py={4}
            px={12}
            fontSize={13}
            rounded={'full'}
            color={'gray-60'}
            borderColor={'transparent'}
            backgroundColor={'transparent'}
            _hover={{
              color: 'gray-10',
              backgroundColor: 'gray-90',
            }}
          >
            <Iconify
              width={20}
              icon={'fluent:open-folder-24-regular'}
            />
            Pay
          </Overlay.Trigger>
          <TradePaymentFeature />
        </Overlay>
      ) : null}
    </Flex>
  );
};

export default Header;
