import { useMutation } from '@apollo/client/react/hooks/useMutation';
import React, { useEffect } from 'react';
import { VERIFY_EMAIL } from 'src/graphql/auth';
import client from 'src/lib/apolloClient';

const useVerifyAccount = (payload: { email: string }) => {
  const [verifyEmail, { loading, error, data }] = useMutation(VERIFY_EMAIL, {
    client,
  });

  useEffect(() => {
    if (data) return;

    const verify = async () => {
      await verifyEmail({
        variables: {
          payload: {
            email: payload.email,
          },
        },
      });
    };

    verify();
  }, [data]);

  React.useEffect(() => {});

  return { loading, error, data };
};

export default useVerifyAccount;
