import Box from '@components/base/box/Box';
import Iconify from '@components/base/iconify/Iconify';
import Anchor from '@components/anchor/Anchor';
import Container from '@components/base/container/Container';
import Button from '@components/base/button/Button';
import useUser from '@hooks/useUser';
import useAuth from '@hooks/useAuth';
import Heading from '@components/base/heading/Heading';

const routes = {
  a: [
    {
      path: undefined,
      label: 'Dashboard',
      icon: 'fluent:building-retail-more-24-regular',
    },
    {
      path: 'market',
      label: 'Market',
      icon: 'fluent:cart-24-regular',
    },
    {
      path: 'wallets',
      label: 'Wallets',
      icon: 'fluent:layer-diagonal-24-regular',
    },
  ],

  Activity: [
    {
      path: 'my-offers',
      label: 'My Offers',
      icon: 'fluent:fire-24-regular',
    },
    {
      path: 'trades',
      label: 'Trades',
      icon: 'fluent:coin-stack-24-regular',
    },
  ],

  Others: [
    {
      label: 'Referral',
      path: 'referral',
      icon: 'fluent:people-community-24-regular',
    },
    {
      label: 'Settings',
      path: 'settings',
      icon: 'fluent:settings-24-regular',
    },
    {
      label: 'Support',
      path: 'support',
      icon: 'fluent:chat-multiple-24-regular',
    },
  ],
};

const SideBar = () => {
  const { user } = useUser();
  const { auth } = useAuth();

  if (user && auth.accessToken) {
    return (
      <Container
        p={0}
        mx={0}
        zIndex={1}
        width={'240px'}
        height={'full'}
        borderRight={1}
        position={'fixed'}
        borderRightColor={'gray-90'}
        display={{ initial: 'hidden', md: 'block' }}
      >
        <Box
          p={16}
          css={{ flex: 1 }}
          notLastChild={{ mb: 32 }}
        >
          {Object.keys(routes).map((key) => {
            const groups = routes[key as keyof typeof routes];

            return (
              <Box
                key={key}
                notLastChild={{ mb: 8 }}
              >
                {key !== 'a' ? <Heading fontSize={12}>{key}</Heading> : null}

                <Box notLastChild={{ mb: 2 }}>
                  {groups.map((group) => {
                    return (
                      <Anchor
                        end
                        p={0}
                        rounded={8}
                        width={'full'}
                        border={'0px'}
                        height={'auto'}
                        key={group.label}
                        fontWeight={'medium'}
                        alignItems={'center'}
                        justifyContent={'start'}
                        backgroundColor={'transparent'}
                        to={
                          group.path === undefined
                            ? '/app/'
                            : `/app/${group.path}/`
                        }
                        _hover={{}}
                      >
                        {({ isActive }) => {
                          return (
                            <Button
                              py={6}
                              px={8}
                              gap={12}
                              fontSize={13}
                              justifyContent={'start'}
                              borderColor={'transparent'}
                              color={isActive ? 'gray-10' : 'gray-60'}
                              backgroundColor={
                                isActive ? 'gray-95' : 'transparent'
                              }
                              _hover={{
                                backgroundColor: isActive ? '' : 'gray-100',
                              }}
                            >
                              <Iconify
                                width={'20px'}
                                icon={group.icon}
                              />

                              {group.label}
                            </Button>
                          );
                        }}
                      </Anchor>
                    );
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    );
  }

  return null;
};

export default SideBar;
