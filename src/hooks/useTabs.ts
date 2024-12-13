import React from 'react';
import { TabsContext } from 'src/providers/TabsProvider';

const useTabs = () => {
  const context = React.useContext(TabsContext);

  if (!context) {
    throw new Error('useTabs hook requires the context - TabsProvider');
  }

  return context;
};

export default useTabs;
