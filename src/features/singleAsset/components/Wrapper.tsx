import Box from '@components/base/box/Box';
import useFetchCoinsById from 'src/hooks/useGetCoinById';
import Actions from './Actions';
import CoinChart from './CoinChart';
import Header from './Header';
import params from 'src/utils/params';
import Alert from '@components/alert/Alert';

type Props = {
  id: string;
  days: string;
};

const Wrapper = ({ id, days }: Props) => {
  const network = params.queryValue('network');
  const { coin, error } = useFetchCoinsById(id);
  const platform = coin?.detail_platforms[network || ''];

  return (
    <Box>
      <Alert
        mb={32}
        timeout={0}
        alignItems={'center'}
        visible={error !== null}
      >
        <Alert.Icon />
        <Alert.Message css={{ flex: 1 }}>
          {error?.message || 'Failed to load coin details.'}
        </Alert.Message>
        <Alert.Action>Try again</Alert.Action>
      </Alert>

      <Header
        id={id}
        platform={platform}
        symbol={coin?.symbol}
        image={coin?.image?.large}
        price={coin?.market_data?.current_price?.usd}
      />

      <Actions id={id} />

      <CoinChart id={id} />
    </Box>
  );
};

export default Wrapper;
