import React from 'react';
import { useQuery } from '@apollo/client/react/hooks/useQuery';
import { GET_USER_WALLETS } from 'src/graphql/wallet';
import client from 'src/lib/apolloClient';
import { useStore } from '@nanostores/react';
import { setUserWallets, userWalletsStore } from 'src/stores/userWalletsStore';

const useUserWallets = () => {
  const { data, loading, error } = useQuery(GET_USER_WALLETS, { client });

  setUserWallets(data?.userWallets);

  const { userWallets } = useStore(userWalletsStore);

  return { userWallets, error, loading };
};

export default useUserWallets;
