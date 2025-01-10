import Box from '@components/base/box/Box';
import Container from '@components/base/container/Container';
import Heading from '@components/base/heading/Heading';
import Query from '@components/query/Query';
import { GET_TRADE_BY_ID } from '@graphql/trade';
import { useParams } from 'react-router-dom';

const TradeChatFeature = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container>
      <Box>
        <Heading fontWeight={'semibold'}></Heading>
      </Box>

      <Query
        query={GET_TRADE_BY_ID}
        keys={{ tradeId: id }}
      >
        <Query.Loader />
        <Query.Error></Query.Error>
        <Query.Data></Query.Data>
      </Query>
    </Container>
  );
};

export default TradeChatFeature;
