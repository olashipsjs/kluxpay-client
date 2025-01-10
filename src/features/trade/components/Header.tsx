import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Overlay from '@components/overlay/Overlay';
import PaymentFeature from '@features/shared/modals/payment/Feature';
import TradePaymentFeature from '@features/shared/modals/trade-pay/Feature';
import useTrades from '@hooks/useTrades';
import useUser from '@hooks/useUser';
import findCoin from '@utils/findCoin';

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
      gap={8}
      top={'0px'}
      borderBottom={1}
      position={'sticky'}
      backdropBlur={'lg'}
      alignItems={'center'}
      borderBottomColor={'gray-95'}
      backgroundColor={'white/50'}
    >
      <Avatar size={'24px'}>
        <Avatar.Picture src={'/assets/images/avatar.png'} />
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
        >
          {`${trade?.createdBy?.firstName} ${trade?.createdBy?.lastName}`}
        </Heading>
      </Box>

      <Button
        px={12}
        py={6}
        width={'fit'}
        borderColor={'transparent'}
        backgroundColor={'red-60'}
        _hover={{ opacity: 80 }}
      >
        Cancel
      </Button>

      {IS_SELLER ? (
        <Overlay>
          <Overlay.Trigger
            py={6}
            px={12}
          >
            Send {trade.amount}{' '}
            {findCoin(trade.offer.coinId)?.symbol.toUpperCase()}
          </Overlay.Trigger>
          <TradePaymentFeature />
        </Overlay>
      ) : (
        <Overlay ms={4}>
          <Overlay.Trigger
            py={6}
            px={12}
          >
            Payment
          </Overlay.Trigger>
          <PaymentFeature payment={trade?.offer?.payment} />
        </Overlay>
      )}
    </Flex>
  );
};

export default Header;
