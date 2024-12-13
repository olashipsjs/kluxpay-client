import React from 'react';

type Context = {
  tab: string;
  setTab: (value: string) => void;
  compareTab: (value: string) => boolean;
};

export const TabsContext = React.createContext<Context | undefined>(undefined);

type Props = {
  defaultTab?: string;
  children: ((context: Context) => React.ReactNode) | React.ReactNode;
};

const TabsProvider = ({ defaultTab = '', children }: Props) => {
  const [tab, setTab] = React.useState(defaultTab);

  const value = {
    tab,
    setTab,
    compareTab: (value: string) => value === tab,
  };

  return (
    <TabsContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </TabsContext.Provider>
  );
};

export default TabsProvider;
