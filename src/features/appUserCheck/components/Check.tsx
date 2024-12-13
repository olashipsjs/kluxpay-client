import React from 'react';

import Failed from './Failed';
import Loading from './Loading';
import useUser from '@hooks/useUser';
import EmailVerificationFeature from '@features/emailVerification/Feature';
import useLocalStorage from 'src/hooks/useLocalStorage';
import AccessTokenError from './AccessTokenError';

const Check = ({ children }: React.PropsWithChildren) => {
  const { user, loading, error } = useUser();
  const { value } = useLocalStorage('kp_access_token');

  switch (true) {
    case loading:
      return <Loading />;

    case value === null:
      return <AccessTokenError />;

    case error !== undefined:
      return <Failed />;

    case user?.isEmailVerified === false:
      return <EmailVerificationFeature />;

    default:
      return children;
  }
};

export default Check;
