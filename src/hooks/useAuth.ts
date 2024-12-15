import React from 'react';
import { AuthContext } from 'src/providers/AuthProvider';

const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('Auth provider not available');
  }

  const { setAuth, ...restProps } = context;

  const setter = React.useCallback(setAuth, []);

  return { setAuth: setter, ...restProps };
};

export default useAuth;
