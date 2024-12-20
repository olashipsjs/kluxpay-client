import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import React from 'react';
import Iconify from '@components/base/iconify/Iconify';
import Anchor from '@components/anchor/Anchor';
import Container from '@components/base/container/Container';
import Avatar from '@components/avatar/Avatar';
import Divider from '@components/divider/Divider';
import Heading from '@components/base/heading/Heading';
import Button from '@components/base/button/Button';

const urls = {
  assets: [
    {
      url: '/app/',
      label: 'Dashboard',
      icon: 'ph:house-fill',
    },
    {
      url: '/app/wallets/',
      label: 'Wallets',
      icon: 'ph:cards-three-fill',
    },
    {
      url: '/app/my-offers/',
      label: 'My offers',
      icon: 'ph:seal-percent-fill',
    },
    {
      url: '/app/trades/',
      label: 'Trades',
      icon: 'ph:arrows-counter-clockwise-fill',
    },
  ],

  marketplace: [
    {
      url: '/app/offers/',
      label: 'Marketplace',
      icon: 'ph:arrows-left-right-fill',
    },
    {
      url: '/app/assets/',
      label: 'Assets',
      icon: 'ph:list-heart-fill',
    },
  ],

  earn: [
    {
      url: '/app/campaigns',
      label: 'Campaigns',
      icon: 'ph:calendar-dot-fill',
    },
    {
      url: '/app/referral/',
      label: 'Earn $5',
      icon: 'ph:share-fill',
    },
  ],

  help: [
    {
      url: '/app/settings/',
      label: 'Settings',
      icon: 'ph:gear-fine-fill',
    },
    {
      url: '/app/support/',
      label: 'Support',
      icon: 'ph:chats-circle-fill',
    },
  ],
};

const SideBar = () => {
  return (
    <Container
      mx={0}
      py={20}
      px={20}
      top={'0px'}
      left={'0px'}
      width={'280px'}
      height={'full'}
      position={'fixed'}
      backgroundColor={'white'}
      display={{ initial: 'hidden', md: 'block' }}
    >
      <Flex
        px={8}
        gap={8}
        rounded={12}
        alignItems={'center'}
      >
        <Avatar size={'24px'}>
          <Avatar.Picture
            alt={'logo'}
            src={'/logo.jpg'}
          ></Avatar.Picture>
        </Avatar>
        <Heading
          fontSize={16}
          fontWeight={'regular'}
        >
          KluxPay
        </Heading>
      </Flex>

      <Divider
        my={12}
        backgroundColor={'transparent'}
      />

      <Box>
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
                      color={'gray-60'}
                      fontWeight={'medium'}
                      alignItems={'center'}
                      justifyContent={'start'}
                      backgroundColor={'transparent'}
                      _hover={{}}
                    >
                      {({ isActive }) => {
                        return (
                          <Button
                            py={8}
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
                              width={'18px'}
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
    </Container>
  );
};

export default SideBar;
