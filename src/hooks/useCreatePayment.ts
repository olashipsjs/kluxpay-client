import { useMutation } from '@apollo/client/react/hooks/useMutation';
import { CREATE_PAYMENT } from 'src/graphql/payment';
import client from 'src/lib/apolloClient';
import { ApolloError } from '@apollo/client';

type State = {
  loading: boolean;
  payment: any;
  error?: ApolloError;
};

const useCreatePayment = (): [createPayment: any, state: State] => {
  const [createPayment, { loading, error, data }] = useMutation(
    CREATE_PAYMENT,
    { client, onError: (error) => console.log({ error }) }
  );

  return [
    createPayment,
    {
      loading,
      error,
      payment: data?.createPayment,
    },
  ];
};

export default useCreatePayment;
