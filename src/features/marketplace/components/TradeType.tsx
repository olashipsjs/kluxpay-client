import React from 'react';
import Tabs from '@components/tabs/Tabs';
import Iconify from '@components/base/iconify/Iconify';
import Link from '@components/anchor/Link';
import Box from '@components/base/box/Box';

const tabs = [
  {
    label: 'Buy',
    value: 'buy',
    icon: 'material-symbols-light:bar-chart-rounded',
  },
  {
    label: 'Sell',
    value: 'sell',
    icon: 'material-symbols-light:stacked-bar-chart-rounded',
  },
];

const TradeType = () => {
  return (
    <Tabs defaultTab={tabs[0].value}>
      {({ compareTab }) => {
        return (
          <Tabs.List
            gap={2}
            width={'fit'}
          >
            {tabs.map((tab) => {
              const isCurrentTab = compareTab(tab.value);

              return (
                <Box key={tab.label}>
                  <Tabs.Trigger
                    py={6}
                    width={'fit'}
                    value={tab.value}
                    color={'gray-30'}
                    fontWeight={'medium'}
                    borderColor={'transparent'}
                    backgroundColor={isCurrentTab ? 'gray-95' : 'transparent'}
                    _hover={{
                      backgroundColor: 'gray-95',
                    }}
                  >
                    <Iconify
                      width={'1.25em'}
                      icon={tab.icon}
                    />
                    {tab.label}
                  </Tabs.Trigger>
                </Box>
              );
            })}
          </Tabs.List>
        );
      }}
    </Tabs>
  );
};

export default TradeType;
