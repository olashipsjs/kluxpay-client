import React from 'react';
import { AvatarContext } from 'src/providers/AvatarProvider';

const useAvatar = () => {
  const context = React.useContext(AvatarContext);

  if (context === undefined) {
    throw new Error('AvatarProvider not found');
  }

  return context;
};

export default useAvatar;
