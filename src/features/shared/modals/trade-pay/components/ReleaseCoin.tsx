import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import coins from '@constants/coins';
import useTrades from '@hooks/useTrades';
import currencySymbol from '@utils/currencySymbol';
import formatDecimal from '@utils/formatDecimal';
import React from 'react';
import useReleaseCoin from '../hooks/useReleaseCoin';
import useAsync from '@hooks/useAsync';
import Alert from '@components/alert/Alert';
import toNumber from '@utils/toNumber';
import useWallets from '@hooks/useWallets';
import Overlay from '@components/overlay/Overlay';

const ReleaseCoin = () => {
  const { wallet } = useWallets();
  const { trade } = useTrades();

  if (!trade) return null;

  const AMOUNT = trade ? trade.amount : 0;

  const FEE = toNumber(AMOUNT as any) * (2 / 100);
  const TOTAL = toNumber(AMOUNT as any) + FEE;

  const COIN = coins.find((c) => c.id === trade.offer.coinId)!;

  const { releaseCoin } = useReleaseCoin();
  const [mutation, { loading, error }] = useAsync(releaseCoin);

  return (
    <React.Fragment>
      <Heading fontSize={21}>
        You're about to pay{' '}
        {`${formatDecimal(TOTAL)} ${COIN.symbol.toUpperCase()}`}
      </Heading>

      <Box
        py={6}
        px={12}
        mt={12}
        rounded={12}
        backgroundColor={'indigo-100'}
      >
        <Text fontSize={13}>
          Ensure you've received the funds payment of{' '}
          {`${currencySymbol(trade.offer.fiat)}${formatDecimal(
            AMOUNT * trade.rate
          )}`}{' '}
          before releasing your coins, once the coin is released it is
          un-refundable.
        </Text>
      </Box>

      <Text
        mt={12}
        as={'p'}
        fontSize={14}
      >
        Recipient:
      </Text>

      <Box
        mt={4}
        py={4}
        px={12}
        rounded={8}
        backgroundColor={'gray-95'}
      >
        <Text
          fontSize={13}
          fontWeight={'semibold'}
        >
          {trade?.wallet?.publicKey}
        </Text>
      </Box>

      <Button
        mt={20}
        disabled={loading}
        onClick={() =>
          mutation({
            to: trade.wallet?._id,
            walletId: wallet?._id,
            fee: toNumber(String(FEE)),
            amount: toNumber(String(AMOUNT)),
            contractAddress: COIN.contractAddress,
          })
        }
      >
        <Button.Loader visible={loading} />
        Release coin
      </Button>

      <Overlay.Trigger
        py={8}
        mt={4}
        color={'gray-60'}
        borderColor={'transparent'}
        backgroundColor={'gray-100'}
        _hover={{
          backgroundColor: 'gray-95',
        }}
      >
        Cancel
      </Overlay.Trigger>

      <Alert
        mt={12}
        visible={error !== undefined}
      >
        <Alert.Message>{error?.message}</Alert.Message>
      </Alert>
    </React.Fragment>
  );
};

export default ReleaseCoin;
