import Anchor from '@components/anchor/Anchor';
import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Container from '@components/base/container/Container';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import Query from '@components/query/Query';
import { GET_USER_TRADES } from '@graphql/trade';
import useTrades from '@hooks/useTrades';
import useUser from '@hooks/useUser';
import formatDecimal from '@utils/formatDecimal';
import { formatDistanceToNowStrict } from 'date-fns';

const TradeFeature = () => {
  const { user } = useUser();
  const { trades, setTrades } = useTrades();

  return (
    <Container maxWidth={'480px'}>
      <Box notLastChild={{ mb: 32 }}>
        <Heading fontWeight={'semibold'}>Trades</Heading>

        <Query
          query={GET_USER_TRADES}
          onCompleted={(data) => {
            if (data && data.getUserTrades) {
              setTrades({
                type: 'SET_TRADES',
                payload: { trades: data.getUserTrades },
              });
            }
          }}
        >
          <Query.Loader />
          <Query.Error></Query.Error>
          <Query.Data>
            <Box
              notLastChild={{
                borderBottom: 1,
                borderBottomColor: 'gray-90',
              }}
            >
              {trades?.map((trade: any, index: number) => {
                const createdBy =
                  user?._id === trade.createdBy._id
                    ? trade.offer.createdBy
                    : trade.createdBy;

                return (
                  <Anchor
                    py={8}
                    gap={12}
                    key={index}
                    width={'full'}
                    rounded={'none'}
                    textAlign={'left'}
                    to={`/app/trades/${trade._id}`}
                    _hover={{ color: 'gray-10' }}
                  >
                    <Avatar size={'40px'}>
                      <Avatar.Picture
                        src={
                          createdBy?.avatar?.url || '/assets/images/avatar.png'
                        }
                      />
                    </Avatar>

                    <Box css={{ flex: 1 }}>
                      <Heading
                        fontSize={16}
                        lineHeight={'1'}
                        fontWeight={'semibold'}
                        textTransform={'capitalize'}
                      >
                        {trade.offer.createdBy?.username}
                      </Heading>
                      <Text
                        mt={6}
                        as={'p'}
                        fontSize={13}
                        lineHeight={'1'}
                      >
                        <Text textTransform={'capitalize'}>
                          {trade.offer.type}
                        </Text>
                        {` ${trade.offer.fiat.sign}${formatDecimal(
                          trade.amount
                        )} `}
                        <Text>{trade.offer.coin.name}</Text>
                      </Text>
                    </Box>

                    <Box>
                      <Text
                        fontSize={12}
                        textAlign={'right'}
                      >
                        {`${formatDistanceToNowStrict(
                          new Date(trade.createdAt)
                        )} ago`}
                      </Text>
                      <Text
                        mt={8}
                        as={'p'}
                        fontSize={13}
                        textAlign={'right'}
                        textTransform={'capitalize'}
                      >
                        {`${trade.status}`}
                      </Text>
                    </Box>
                  </Anchor>
                );
              })}
            </Box>
          </Query.Data>
        </Query>
      </Box>
    </Container>
  );
};

export default TradeFeature;
