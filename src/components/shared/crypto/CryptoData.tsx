import React from 'react';
import client from 'src/lib/queryClient';
import { getCryptoData } from '@apis/crypto';
import { useQuery } from '@tanstack/react-query';
import useUser from '@hooks/useUser';
import useToken from '@hooks/useToken';

type Props = {
  id: string;
  network: string;
  children?:
    | ((opt: {
        loading: boolean;
        error: Error | null;
        data: any;
      }) => React.ReactNode)
    | React.ReactNode;
};

const CryptoData = React.memo(
  ({ id, network = 'ethereum', children }: Props) => {
    const { user } = useUser();
    const { setToken } = useToken();
    const { isLoading, error, data, isSuccess } = useQuery(
      {
        queryFn: getCryptoData,
        queryKey: [id, network, user?.fiat.name],
      },
      client
    );

    React.useEffect(() => {
      if (isSuccess) {
        setToken({ type: 'SET_TOKEN', payload: { token: data } });
      }
    }, [isSuccess]);

    return typeof children === 'function'
      ? children({ loading: isLoading, error, data })
      : children;
  }
);

export default CryptoData;
