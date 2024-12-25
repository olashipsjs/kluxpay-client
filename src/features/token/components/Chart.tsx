import Box from '@components/base/box/Box';
import { useParams } from 'react-router-dom';
import CoinChart from '@components/shared/CoinChart';
import BigLineChart from '@components/charts/BigLineChart';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Tabs from '@components/tabs/Tabs';
import React from 'react';

const Chart = () => {
  const { token } = useParams<{ token: string }>();

  const tabs = [
    { label: 'Daily', value: '1' },
    { label: 'Weekly', value: '7' },
    { label: 'Monthly', value: '30' },
    { label: 'Quarter', value: '90' },
  ];

  return (
    <Box
      border={1}
      rounded={12}
      height={'400px'}
      overflow={'clip'}
      borderColor={'gray-90'}
      backgroundColor={'white'}
      boxShadow={'0px .5px 0px 0px rgba(var(--gray-80))'}
    >
      <Box>
        <Tabs
          flexDirection={'column'}
          defaultTab={tabs[0].value}
        >
          {({ tab: currentTab }) => {
            return (
              <React.Fragment>
                <Flex
                  px={12}
                  py={12}
                  alignItems={'center'}
                  justifyContent={'between'}
                >
                  <Heading fontSize={16}>Chart</Heading>
                  <Tabs.List
                    p={2}
                    gap={2}
                    width={'fit'}
                    rounded={'full'}
                    backgroundColor={'gray-95'}
                  >
                    {tabs.map((tab) => {
                      const isActive = tab.value === currentTab;

                      return (
                        <Tabs.Trigger
                          py={6}
                          gap={4}
                          fontSize={12}
                          key={tab.value}
                          rounded={'full'}
                          value={tab.value}
                          color={isActive ? 'gray-10' : 'gray-60'}
                          boxShadow={
                            isActive
                              ? '0px .75px 0px 0px rgba(var(--gray-80))'
                              : ''
                          }
                          borderColor={isActive ? 'gray-90' : 'transparent'}
                          backgroundColor={isActive ? 'white' : 'transparent'}
                          _hover={{
                            color: 'gray-10',
                            backgroundColor: isActive ? 'white' : 'gray-90',
                          }}
                        >
                          {tab.label}
                        </Tabs.Trigger>
                      );
                    })}
                  </Tabs.List>
                </Flex>
                <Tabs.Panel value={currentTab}>
                  <CoinChart
                    days={Number(currentTab)}
                    coinId={token || ''}
                  >
                    {({ prices }) => {
                      const formattedPrices = prices?.map((arr: any) => {
                        const [timestamp, value] = arr;

                        const date = new Date(timestamp);

                        const month = date.toLocaleDateString('default', {
                          month: 'short',
                        });

                        const day = date.toLocaleDateString('default', {
                          day: '2-digit',
                        });

                        switch (currentTab) {
                          case '1':
                            return {
                              timestamp: `${day}`,
                              value,
                            };

                          case '90':
                            return {
                              timestamp: `${month}`,
                              value,
                            };

                          default:
                            return {
                              timestamp: `${month} ${day}`,
                              value,
                            };
                        }
                      });

                      return <BigLineChart data={formattedPrices} />;
                    }}
                  </CoinChart>
                </Tabs.Panel>
              </React.Fragment>
            );
          }}
        </Tabs>
      </Box>
    </Box>
  );
};

export default Chart;
