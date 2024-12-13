import client from 'src/lib/apolloClient';
import { GET_ASSET_BALANCE } from 'src/graphql/wallet';
import { useQuery } from '@apollo/client/react/hooks/useQuery';

type Props = {
  platform: string;
  contractAddress?: string;
};
const useGetAssetBalance = ({ platform, contractAddress }: Props) => {
  const payload = {
    platform,
    tokenAddress: contractAddress,
  };

  const { data, loading, error } = useQuery(GET_ASSET_BALANCE, {
    client,
    variables: { payload: payload },
    onError: (error) => console.log({ error }),
  });

  const balance = data?.getAssetBalance;

  return { balance, loading, error };
};

export default useGetAssetBalance;
