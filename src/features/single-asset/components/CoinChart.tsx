import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Iconify from '@components/base/iconify/Iconify';
import Anchor from '@components/anchor/Anchor';
import Tabs from '@components/tabs/Tabs';
import React from 'react';
import BigChart from 'src/templates/BigChart';
import params from 'src/utils/params';

const tabs = {
  duration: [
    { name: '1d', value: '1' },
    { name: '7d', value: '7' },
    { name: '1m', value: '30' },
    { name: '6m', value: '120' },
    { name: '1yr', value: '365' },
  ],
};

type Props = {
  id: string;
};

const CoinChart = ({ id }: Props) => {
  const network = params.queryValue('network');
  const days = params.queryValue('days');

  return (
    <Box my={32}>
      <Tabs
        defaultTab={
          tabs.duration.find((tab) => tab.value === days)?.value || ''
        }
      >
        {({ tab }) => {
          return (
            <React.Fragment>
              <Flex justifyContent={'between'}>
                <Tabs.List
                  gap={6}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  {tabs.duration.map((tab) => {
                    const isCurrentTab = days === tab.value;

                    return (
                      <Anchor
                        to={`http://localhost:4321/app/assets/${id}/?days=${tab.value}&network=${network}`}
                      >
                        <Tabs.Trigger
                          py={4}
                          fontSize={12}
                          key={tab.name}
                          height={'auto'}
                          value={tab.value}
                          fontWeight={'medium'}
                          borderColor={'transparent'}
                          textTransform={'uppercase'}
                          px={12}
                          color={isCurrentTab ? 'white' : 'gray-30'}
                          backgroundColor={
                            isCurrentTab ? 'indigo-60' : 'gray-95'
                          }
                          _hover={{
                            color: isCurrentTab ? '' : 'gray-10',
                            backgroundColor: isCurrentTab ? '' : 'gray-90',
                          }}
                        >
                          {tab.name}
                        </Tabs.Trigger>
                      </Anchor>
                    );
                  })}
                </Tabs.List>
                <Button
                  p={0}
                  size={'28px'}
                  rounded={'full'}
                >
                  <Iconify
                    width={'1.2em'}
                    icon={'mdi:share'}
                  />
                </Button>
              </Flex>

              <Tabs.Panel
                mt={24}
                gap={24}
                value={tab}
                width={'full'}
                alignItems={'center'}
                justifyContent={'center'}
                minHeight={'360px'}
                flexDirection={{ initial: 'column', md: 'row' }}
              >
                <BigChart id={id} />
              </Tabs.Panel>
            </React.Fragment>
          );
        }}
      </Tabs>
    </Box>
  );
};

export default CoinChart;
