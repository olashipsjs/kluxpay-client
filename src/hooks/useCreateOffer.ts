import { useMutation } from '@apollo/client/react/hooks/useMutation';
import { CREATE_OFFER } from '@graphql/offer';
import client from 'src/lib/apolloClient';

const useCreateOffer = (
  onCompleted?: any
): [typeof createOffer, typeof state] => {
  const [createOffer, { loading, error, data }] = useMutation(CREATE_OFFER, {
    client,
    onError: (error) => console.log({ error }),
    onCompleted: onCompleted,
  });

  const state = { loading, error, offer: data?.createOffer };

  return [createOffer, state];
};

export default useCreateOffer;
