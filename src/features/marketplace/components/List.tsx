import Box from '@components/base/box/Box';
import Ad from './Ad';
import useApolloQuery from '@hooks/useApolloQuery';
import { GET_OFFERS } from '@graphql/offer';

const List = () => {
  const { loading, error, data } = useApolloQuery(GET_OFFERS, {
    variables: { payload: { type: 'all', limit: 12, assets: 'all', page: 1 } },
  });

  const offers = data?.getOffers?.offers;

  console.log({ offers });

  return (
    <Box
      mt={16}
      notLastChild={{ mb: 8 }}
    >
      {offers && offers.length > 0
        ? offers.map((offer: any, index: number) => {
            return (
              <Ad
                key={index}
                offer={offer}
              />
            );
          })
        : null}
    </Box>
  );
};

export default List;
