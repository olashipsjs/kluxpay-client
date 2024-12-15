import React from 'react';
import { UserContext } from 'src/providers/UserProvider';

const useUser = () => {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  const { setUser, user } = context;

  const setter = React.useCallback(setUser, [user]);

  return { setUser: setter, user };
};

export default useUser;
