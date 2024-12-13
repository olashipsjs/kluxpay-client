import client from 'src/lib/apolloClient';
import { GET_USER_OFFERS } from '@graphql/offer';
import { useQuery } from '@apollo/client/react/hooks/useQuery';

const useGetUserOffers = () => {
  const { loading, error, data } = useQuery(GET_USER_OFFERS, {
    client,
    onError: (error) => console.log({ error }),
  });

  return { loading, error, offers: data?.getUserOffers };
};

export default useGetUserOffers;
