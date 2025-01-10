import Box from '@components/base/box/Box';
import Container from '@components/base/container/Container';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import Overlay from '@components/overlay/Overlay';
import Query from '@components/query/Query';
import TradeChatFeature from '@features/shared/modals/trade-chat/Feature';
import { GET_TRADE_BY_ID } from '@graphql/trade';
import useTrades from '@hooks/useTrades';
import useUser from '@hooks/useUser';
import formatDecimal from '@utils/formatDecimal';
import { useParams } from 'react-router-dom';

const SingleTradeFeature = () => {
  const { trade, setTrades } = useTrades();
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();

  return (
    <Container>
      <Box>
        <Heading fontWeight={'semibold'}></Heading>
      </Box>

      <Query
        query={GET_TRADE_BY_ID}
        keys={{ tradeId: id }}
        onCompleted={(data) => {
          if (data && data.getTradeById) {
            setTrades({
              type: 'SET_CURRENT_TRADE',
              payload: { trade: data.getTradeById },
            });
          }
        }}
      >
        <Query.Loader />
        <Query.Error></Query.Error>
        <Query.Data>
          <Container
            maxWidth={'400px'}
            notLastChild={{ mb: 16 }}
          >
            <Box>
              <Heading
                textTransform={'capitalize'}
              >{`${trade?.offer.type} ${trade?.offer.fiat.sign}${trade?.amount}`}</Heading>
            </Box>

            <Box>
              <Heading fontSize={13}>Terms</Heading>
              <Text fontSize={14}>{`${trade?.offer.notes}`}</Text>
            </Box>

            <Box>
              <Heading fontSize={13}>Rate</Heading>
              <Text fontSize={14}>{`${trade?.offer.fiat.sign}${formatDecimal(
                trade?.rate || 0
              )}`}</Text>
            </Box>

            <Box>
              <Heading fontSize={13}>Minimum Limit</Heading>
              <Text fontSize={14}>{`${trade?.offer.fiat.sign}${formatDecimal(
                trade?.offer.minLimit || 0
              )}`}</Text>
            </Box>

            <Box>
              <Heading fontSize={13}>Maximum Limit</Heading>
              <Text fontSize={14}>{`${trade?.offer.fiat.sign}${formatDecimal(
                trade?.offer.maxLimit || 0
              )}`}</Text>
            </Box>

            <Box>
              <Heading fontSize={13}>Coin</Heading>
              <Text fontSize={14}>{`${trade?.offer.coin.name}`}</Text>
            </Box>

            <Box>
              <Heading fontSize={13}>Status</Heading>
              <Text
                fontSize={14}
                textTransform={'capitalize'}
              >{`${trade?.status}`}</Text>
            </Box>

            <Box>
              <Heading fontSize={13}>Trade partner</Heading>
              <Text
                fontSize={14}
                textTransform={'capitalize'}
              >{`${
                trade?.createdBy._id === user?._id
                  ? trade?.offer.createdBy.username
                  : trade?.createdBy.username
              }`}</Text>
            </Box>

            <Box>
              <Heading fontSize={13}>Trader</Heading>
              <Text
                fontSize={14}
                textTransform={'capitalize'}
              >{`${trade?.offer.createdBy.username}`}</Text>
            </Box>

            <Overlay>
              <Overlay.Trigger>Chat</Overlay.Trigger>
              <TradeChatFeature />
            </Overlay>
          </Container>
        </Query.Data>
      </Query>
    </Container>
  );
};

export default SingleTradeFeature;
