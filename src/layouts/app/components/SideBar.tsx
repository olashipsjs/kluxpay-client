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
      label: 'Tasks',
      icon: 'material-symbols-light:supervised-user-circle',
    },
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
};

const SideBar = () => {
  return (
    <Container
      p={0}
      mx={0}
      top={'0px'}
      left={'0px'}
      width={'400px'}
      height={'full'}
      position={'fixed'}
      display={{ initial: 'hidden', md: 'block' }}
    >
      <Flex
        width={'full'}
        height={'full'}
        style={{ flex: 1 }}
      >
        <Flex
          py={16}
          width={'100%'}
          alignItems={'end'}
          flexDirection={'column'}
        >
          <Box width={'60%'}>
            <Flex
              py={6}
              px={8}
              mx={16}
              rounded={12}
              boxShadow={'ringGray90'}
              backgroundColor={'white'}
            >
              <Avatar size={'24px'}>
                <Avatar.Picture
                  alt={'logo'}
                  src={'https://alignui.com/images/logo/phoenix.svg'}
                ></Avatar.Picture>
              </Avatar>
            </Flex>

            <Divider
              my={12}
              backgroundColor={'gray-90'}
            />

            {Object.keys(urls).map((key, index) => {
              const groups = urls[key as keyof typeof urls];

              return (
                <React.Fragment key={key}>
                  <Flex
                    px={8}
                    gap={'2px'}
                    flexDirection={'column'}
                  >
                    {groups.map((url) => {
                      return (
                        <Anchor
                          px={8}
                          py={6}
                          end
                          gap={10}
                          rounded={8}
                          to={url.url}
                          fontSize={16}
                          width={'full'}
                          border={'0px'}
                          height={'auto'}
                          key={url.label}
                          color={'gray-50'}
                          alignItems={'center'}
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
                                  color={isActive ? 'indigo-60' : 'inherit'}
                                  backgroundColor={
                                    isActive ? 'gray-10' : 'inherit'
                                  }
                                >
                                  <Iconify
                                    width={'20px'}
                                    height={'20px'}
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
                    <Divider
                      my={8}
                      backgroundColor={'gray-90'}
                    />
                  ) : null}
                </React.Fragment>
              );
            })}
          </Box>
        </Flex>

        <Divider
          width={'1px'}
          height={'100%'}
          backgroundColor={'gray-90'}
        />
      </Flex>
    </Container>
  );
};

export default SideBar;
