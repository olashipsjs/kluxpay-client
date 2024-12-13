import React from 'react';
import { OverlayContext } from 'src/providers/OverlayProvider';

const useOverlay = () => {
  const context = React.useContext(OverlayContext);

  if (context === undefined) {
    throw new Error('useOverlay must be used within an OverlayProvider');
  }

  return context;
};

export default useOverlay;
