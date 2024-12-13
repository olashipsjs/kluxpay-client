import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import React from 'react';
import Iconify from '@components/base/iconify/Iconify';
import Anchor from '@components/anchor/Anchor';
import Container from '@components/base/container/Container';
import Avatar from '@components/avatar/Avatar';
import Divider from '@components/divider/Divider';

const urls = {
  assets: [
    {
      url: '/app/',
      label: 'Home',
      icon: 'material-symbols-light:home',
    },
    {
      url: '/app/wallets/',
      label: 'Wallets',
      icon: 'material-symbols-light:wallet',
    },
    {
      url: '/app/my-offers/',
      label: 'My offers',
      icon: 'material-symbols-light:book-4-spark-rounded',
    },
    {
      url: '/app/trades/',
      label: 'Trades',
      icon: 'material-symbols-light:all-inbox-rounded',
    },
  ],

  marketplace: [
    {
      url: '/app/offers/',
      label: 'Marketplace',
      icon: 'material-symbols-light:cards-star-rounded',
    },
    {
      url: '/app/assets/',
      label: 'Assets',
      icon: 'material-symbols-light:bar-chart-rounded',
    },
    {
      url: '/app/history/',
      label: 'Transactions',
      icon: 'material-symbols-light:deployed-code-history-sharp',
    },
  ],

  notifications: [
    {
      url: '/app/referral/',
      label: 'Earn $5',
      icon: 'material-symbols-light:supervised-user-circle',
    },
  ],

  settings: [
    {
      url: '/app/profile/',
      label: 'Profile',
      icon: 'material-symbols-light:person',
    },
    {
      url: '/app/payments/',
      label: 'Payments',
      icon: 'material-symbols-light:credit-card',
    },
  ],
  help: [
    {
      url: '/app/support/',
      label: 'Support',
      icon: 'raphael:chat',
    },
    {
      url: '/app/changelog/',
      label: 'Changelog',
      icon: 'clarity:cog-solid-badged',
    },
  ],
  action: [
    {
      url: '/',
      label: 'Log out',
      icon: 'material-symbols-light:power-settings-circle',
    },
  ],
};

const SideBar = () => {
  return (
    <Container
      mx={'0px'}
      top={'0px'}
      left={'0px'}
      height={'full'}
      position={'fixed'}
      maxWidth={'400px'}
      backgroundColor={'gray-100'}
      display={{ initial: 'hidden', md: 'block' }}
    >
      <Flex
        px={4}
        gap={2}
        mt={24}
        width={'full'}
        height={'full'}
        style={{ flex: 1 }}
        alignItems={'end'}
        flexDirection={'column'}
      >
        <Box width={'60%'}>
          <Avatar>
            <Avatar.Picture
              alt={'logo'}
              src={'https://alignui.com/images/logo/phoenix.svg'}
            ></Avatar.Picture>
          </Avatar>
          <Divider my={12} />

          {Object.keys(urls).map((key, index) => {
            const groups = urls[key as keyof typeof urls];

            return (
              <React.Fragment key={key}>
                <Flex
                  gap={'2px'}
                  flexDirection={'column'}
                >
                  {groups.map((url) => {
                    return (
                      <Anchor
                        px={8}
                        py={6}
                        gap={10}
                        rounded={8}
                        to={url.url}
                        fontSize={13}
                        width={'full'}
                        border={'0px'}
                        height={'auto'}
                        key={url.label}
                        color={'gray-50'}
                        alignItems={'center'}
                        fontWeight={'medium'}
                        justifyContent={'start'}
                        backgroundColor={'transparent'}
                        _hover={{
                          color: 'gray-10',
                          backgroundColor: 'gray-95',
                        }}
                      >
                        {({ isActive }) => {
                          return (
                            <React.Fragment>
                              <Box
                                display={'contents'}
                                color={isActive ? 'gray-10' : 'inherit'}
                                backgroundColor={
                                  isActive ? 'gray-10' : 'inherit'
                                }
                              >
                                <Iconify
                                  width={'20px'}
                                  icon={url.icon}
                                />

                                {url.label}
                              </Box>
                            </React.Fragment>
                          );
                        }}
                      </Anchor>
                    );
                  })}
                </Flex>
                {index + 1 < Object.keys(urls).length ? (
                  <Box
                    my={6}
                    height={'1px'}
                    width={'full'}
                    borderBottom={1}
                    borderColor={'gray-95'}
                  />
                ) : null}
              </React.Fragment>
            );
          })}
        </Box>
      </Flex>
    </Container>
  );
};

export default SideBar;
