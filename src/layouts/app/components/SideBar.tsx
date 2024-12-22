import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import React from 'react';
import Iconify from '@components/base/iconify/Iconify';
import Anchor from '@components/anchor/Anchor';
import Container from '@components/base/container/Container';
import Divider from '@components/divider/Divider';
import Button from '@components/base/button/Button';
import useUser from '@hooks/useUser';

const urls = {
  assets: [
    {
      url: '/app/',
      label: 'Dashboard',
      icon: 'fluent:building-retail-more-24-regular',
    },
    {
      url: '/app/wallets/',
      label: 'Wallets',
      icon: 'fluent:layer-diagonal-24-regular',
    },
    {
      url: '/app/my-offers/',
      label: 'My offers',
      icon: 'fluent:layer-diagonal-person-24-regular',
    },
    {
      url: '/app/trades/',
      label: 'Trades',
      icon: 'fluent:arrow-repeat-1-24-regular',
    },
  ],

  marketplace: [
    {
      url: '/app/offers/',
      label: 'Marketplace',
      icon: 'fluent:collections-add-24-regular',
    },
  ],

  earn: [
    {
      url: '/app/campaigns',
      label: 'Campaigns',
      icon: 'fluent:calendar-date-24-regular',
    },
    {
      url: '/app/referral/',
      label: 'Earn $5',
      icon: 'fluent:people-community-24-regular',
    },
  ],

  help: [
    {
      label: 'Settings',
      url: '/app/settings/general/',
      icon: 'fluent:settings-24-regular',
    },
    {
      url: '/app/support/',
      label: 'Support',
      icon: 'fluent:chat-multiple-24-regular',
    },
  ],
};

const SideBar = () => {
  const { user } = useUser();

  if (user === null) return null;

  return (
    <Container
      p={0}
      mx={0}
      zIndex={1}
      top={'57px'}
      left={'0px'}
      width={'280px'}
      height={'full'}
      position={'fixed'}
      backgroundColor={'white'}
      display={{ initial: 'hidden', md: 'block' }}
    >
      <Flex>
        <Box
          py={12}
          px={20}
          css={{ flex: 1 }}
        >
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
                        end
                        p={0}
                        rounded={8}
                        to={url.url}
                        fontSize={13}
                        width={'full'}
                        border={'0px'}
                        height={'auto'}
                        key={url.label}
                        fontWeight={'medium'}
                        alignItems={'center'}
                        justifyContent={'start'}
                        backgroundColor={'transparent'}
                        _hover={{}}
                      >
                        {({ isActive }) => {
                          return (
                            <Button
                              py={6}
                              px={8}
                              gap={12}
                              justifyContent={'start'}
                              borderColor={'transparent'}
                              backgroundColor={
                                isActive ? 'gray-90' : 'transparent'
                              }
                              color={isActive ? 'gray-10' : 'gray-60'}
                              _hover={{
                                backgroundColor: 'gray-95',
                              }}
                            >
                              <Iconify
                                width={'20px'}
                                icon={url.icon}
                              />

                              {url.label}
                            </Button>
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

        <Divider
          width={'1px'}
          height={'100vh'}
          backgroundColor={'gray-90'}
        />
      </Flex>
    </Container>
  );
};

export default SideBar;
