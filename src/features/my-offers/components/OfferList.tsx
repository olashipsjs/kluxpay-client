import useOffers from '@hooks/useOffers';
import Item from './Item';
import Grid from '@components/base/grid/Grid';
import { GET_USER_OFFERS } from '@graphql/offer';
import Query from '@components/query/Query';
import Iconify from '@components/base/iconify/Iconify';
import Heading from '@components/base/heading/Heading';
import Flex from '@components/base/flex/Flex';

const OfferList = () => {
  const { offers, setOffers } = useOffers();

  return (
    <Query
      query={GET_USER_OFFERS}
      onCompleted={(data) => {
        if (data && data.getUserOffers) {
          setOffers({
            type: 'SET_OFFERS',
            payload: { offers: data && data.getUserOffers },
          });
        }
      }}
    >
      <Query.Loader />
      <Query.Error
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Iconify
          width={32}
          color={'orange-60'}
          icon={'icon-park-twotone:doc-fail'}
        />
        <Heading
          mt={12}
          fontSize={17}
        >
          We are unable to fetch your offers. Try again later.
        </Heading>
      </Query.Error>
      <Query.Data>
        {offers?.length === 0 ? (
          <Flex>
            <Heading
              fontSize={17}
              fontWeight={'semibold'}
            >
              No offers found
            </Heading>
          </Flex>
        ) : null}
        <Grid
          gap={6}
          gridTemplateColumns={'1fr'}
        >
          {offers?.map((offer: any) => {
            return (
              <Item
                offer={offer}
                key={offer._id}
              />
            );
          })}
        </Grid>
      </Query.Data>
    </Query>
  );
};

export default OfferList;
