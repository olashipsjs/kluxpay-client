import Anchor from '@components/anchor/Anchor';
import Container from '@components/base/container/Container';
import Iconify from '@components/base/iconify/Iconify';
import Divider from '@components/divider/Divider';
import Tabs from '@components/tabs/Tabs';
import React from 'react';
import { Outlet } from 'react-router-dom';

const items = [
  {
    label: 'Profile',
    value: 'profile',
    url: '/app/settings/profile/',
    icon: 'material-symbols-light:account-box',
  },
  {
    label: 'Payments',
    value: 'payments',
    url: '/app/settings/payments/',
    icon: 'material-symbols-light:credit-card',
  },
  {
    label: 'Security',
    value: 'security',
    url: '/app/settings/securitys/',
    icon: 'material-symbols-light:vpn-lock',
  },
];

const TabsBlock = () => {
  return (
    <Container>
      <Tabs
        flexDirection={'column'}
        defaultTab={items[0].value}
      >
        {({ tab, setTab }) => {
          return (
            <React.Fragment>
              <Tabs.List width={'full'}>
                {items.map((item) => {
                  const isActive = tab === item.value;

                  return (
                    <Anchor
                      py={8}
                      px={16}
                      gap={6}
                      to={item.url}
                      fontSize={13}
                      width={'fit'}
                      borderBottom={2}
                      rounded={'none'}
                      key={item.value}
                      alignItems={'center'}
                      fontWeight={'medium'}
                      color={isActive ? 'indigo-50' : 'gray-50'}
                      borderBottomColor={isActive ? 'indigo-60' : 'transparent'}
                      _hover={{
                        color: 'gray-10',
                        backgroundColor: 'gray-95',
                      }}
                      onClick={() => setTab(item.value)}
                    >
                      <Iconify
                        width={'20px'}
                        icon={item.icon}
                      />
                      {item.label}
                    </Anchor>
                  );
                })}
              </Tabs.List>

              <Divider backgroundColor={'gray-90'} />

              <Tabs.Panel
                py={32}
                px={12}
                value={tab}
                css={{ flex: 1 }}
                flexDirection={'column'}
              >
                <Outlet />
              </Tabs.Panel>
            </React.Fragment>
          );
        }}
      </Tabs>
    </Container>
  );
};

export default TabsBlock;
