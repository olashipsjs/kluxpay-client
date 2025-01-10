import useUser from '@hooks/useUser';
import useTrades from '@hooks/useTrades';
import Flex from '@components/base/flex/Flex';
import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import { formatDistanceToNowStrict } from 'date-fns';
import useCountDown from '@hooks/useCountDown';
import Button from '@components/base/button/Button';
import Overlay from '@components/overlay/Overlay';
import useCancelTrade from '../hooks/useCancelTrade';
import useAsync from '@hooks/useAsync';
import Toast from '@components/toast/Toast';
import useCompleteTrade from '../hooks/useCompleteTrade';

const CancelTradeButton = () => {
  const { user } = useUser();
  const { trade, setTrades } = useTrades();
  const { cancelTrade } = useCancelTrade();
  const [async, { loading, error }] = useAsync(cancelTrade, {
    onCompleted: (data: any) => {
      if (data) {
        setTrades({
          type: 'SET_TRADE_STATUS',
          payload: { tradeId: data.trade._id, status: data.trade.status },
        });
      }
    },
  });

  const canCanCelTrade = user?._id === trade?.createdBy._id;
  if (!canCanCelTrade) return null;

  return (
    <Button
      py={8}
      px={10}
      fontSize={13}
      width={'fit'}
      color={'gray-40'}
      disabled={loading}
      fontWeight={'semibold'}
      borderColor={'gray-90'}
      backgroundColor={'white'}
      onClick={() => async({ tradeId: trade?._id || '' })}
      _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
    >
      <Button.Loader
        color={'gray-10'}
        visible={loading}
      />
      End Trade
      <Toast visible={error !== undefined}>
        <Toast.Panel>
          <Toast.TextContext>{error?.message}</Toast.TextContext>
        </Toast.Panel>
      </Toast>
    </Button>
  );
};

const CompleteTradeButton = () => {
  const { user } = useUser();
  const { trade, setTrades } = useTrades();
  const { completeTrade } = useCompleteTrade();
  const [async, { loading, error }] = useAsync(completeTrade, {
    onCompleted: (data: any) => {
      if (data) {
        setTrades({
          type: 'SET_TRADE_STATUS',
          payload: { tradeId: data.trade._id, status: data.trade.status },
        });
      }
    },
  });

  const whoIsReleasingCoin =
    trade?.offer.type === 'buy' ? trade.createdBy : trade?.offer.createdBy;

  if (user?._id !== whoIsReleasingCoin?._id) return null;

  return (
    <Button
      py={8}
      px={10}
      fontSize={13}
      width={'fit'}
      color={'gray-40'}
      fontWeight={'semibold'}
      borderColor={'gray-90'}
      backgroundColor={'white'}
      disabled={loading || trade?.status === 'completed'}
      onClick={() => async({ tradeId: trade?._id || '' })}
      _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
    >
      <Button.Loader
        color={'gray-10'}
        visible={loading}
      />
      Pay
      <Toast visible={error !== undefined}>
        <Toast.Panel>
          <Toast.TextContext>{error?.message}</Toast.TextContext>
        </Toast.Panel>
      </Toast>
    </Button>
  );
};

const Header = () => {
  const { user } = useUser();
  const { trade } = useTrades();
  const { minute, seconds } = useCountDown(trade?.offer.timeout || 0);

  const partner =
    user?._id === trade?.createdBy._id
      ? trade?.offer.createdBy
      : trade?.createdBy;

  return (
    <Box>
      <Flex
        py={8}
        px={16}
        gap={12}
        borderBottom={1}
        alignItems={'start'}
        backgroundColor={'white'}
        borderBottomColor={'gray-90'}
      >
        <Avatar size={'40px'}>
          <Avatar.Picture
            src={partner?.avatar?.url || '/assets/images/avatar.png'}
          />
        </Avatar>

        <Box
          py={4}
          css={{ flex: 1 }}
        >
          <Heading
            fontSize={16}
            lineHeight={'1'}
            fontWeight={'semibold'}
            textTransform={'capitalize'}
          >{`${partner?.firstName} ${partner?.lastName}`}</Heading>
          <Text
            mt={4}
            as={'p'}
            fontSize={12}
            lineHeight={'1'}
          >
            {partner
              ? `Active ${formatDistanceToNowStrict(
                  new Date(partner.lastActive)
                )} ago`
              : ''}
          </Text>
        </Box>

        <Box>
          <Overlay.Trigger
            py={6}
            width={'fit'}
            color={'gray-40'}
            borderColor={'gray-80'}
            fontWeight={'semibold'}
            backgroundColor={'transparent'}
            _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
          >
            Cancel
          </Overlay.Trigger>
        </Box>
      </Flex>

      <Flex
        py={6}
        px={16}
        gap={6}
        position={'sticky'}
        alignItems={'center'}
        justifyContent={'between'}
        backgroundColor={'gray-95'}
      >
        <Box css={{ flex: 1 }}>
          <Text fontSize={12}>Expires in</Text>
          <Text
            as={'p'}
            fontSize={12}
            fontWeight={'semibold'}
          >{`${minute > 1 ? minute + 'm' : ''}:${
            seconds < 10 ? '0' + seconds + 's' : seconds + 's'
          }`}</Text>
        </Box>
        <CancelTradeButton />
        <CompleteTradeButton />
      </Flex>
    </Box>
  );
};

export default Header;
