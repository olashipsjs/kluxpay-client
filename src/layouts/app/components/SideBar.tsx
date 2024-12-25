import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Iconify from '@components/base/iconify/Iconify';
import Anchor from '@components/anchor/Anchor';
import Container from '@components/base/container/Container';
import Divider from '@components/divider/Divider';
import Button from '@components/base/button/Button';
import useUser from '@hooks/useUser';
import Avatar from '@components/avatar/Avatar';
import Heading from '@components/base/heading/Heading';
import useAuth from '@hooks/useAuth';

const routes = [
  {
    path: undefined,
    label: 'Market',
    icon: 'fluent:building-retail-more-24-regular',
  },
  {
    path: 'my-offers',
    label: 'My Offers',
    icon: 'fluent:layer-diagonal-person-24-regular',
  },
  {
    path: 'trades',
    label: 'Trades',
    icon: 'fluent:arrow-repeat-1-24-regular',
  },
  {
    path: 'wallets',
    label: 'Wallets',
    icon: 'fluent:layer-diagonal-24-regular',
  },
  {
    label: 'Settings',
    path: 'settings/general',
    icon: 'fluent:settings-24-regular',
  },
];

// const urls = {
//   assets: [
//     {
//       url: '/app/',

//       label: 'Dashboard',
//       icon: 'fluent:building-retail-more-24-regular',
//     },
//     {
//       url: '/app/wallets/',
//       label: 'Wallets',
//       icon: 'fluent:layer-diagonal-24-regular',
//     },
//     {
//       url: '/app/my-offers/',
//       label: 'My offers',
//       icon: 'fluent:layer-diagonal-person-24-regular',
//     },
//     {
//       url: '/app/trades/',
//       label: 'Trades',
//       icon: 'fluent:arrow-repeat-1-24-regular',
//     },
//   ],

//   marketplace: [
//     {
//       url: '/app/offers/',
//       label: 'Marketplace',
//       icon: 'fluent:collections-add-24-regular',
//     },
//   ],

//   earn: [
//     {
//       url: '/app/campaigns',
//       label: 'Campaigns',
//       icon: 'fluent:calendar-date-24-regular',
//     },
//     {
//       url: '/app/referral/',
//       label: 'Earn $5',
//       icon: 'fluent:people-community-24-regular',
//     },
//   ],

//   help: [
//     {
//       label: 'Settings',
//       url: '/app/settings/general/',
//       icon: 'fluent:settings-24-regular',
//     },
//     {
//       url: '/app/support/',
//       label: 'Support',
//       icon: 'fluent:chat-multiple-24-regular',
//     },
//   ],
// };

const SideBar = () => {
  const { user } = useUser();
  const { auth } = useAuth();

  if (user && auth.accessToken) {
    return (
      <Container
        p={0}
        mx={0}
        zIndex={1}
        left={'0px'}
        width={'280px'}
        height={'full'}
        position={'fixed'}
        backgroundColor={'white'}
        display={{ initial: 'hidden', md: 'block' }}
      >
        <Flex>
          <Box>
            <Flex
              px={12}
              pt={16}
              gap={8}
            >
              <Avatar backgroundColor={'gray-95'}>
                <Avatar.Picture
                  src={
                    'https://finance-template.alignui.com/images/avatar/illustration/arthur.png'
                  }
                  alt={user.firstName}
                />
              </Avatar>

              <Heading
                fontSize={16}
                textTransform={'capitalize'}
              >{`${user.firstName} ${user.lastName}`}</Heading>
            </Flex>

            <Box
              px={8}
              py={12}
              css={{ flex: 1 }}
              notLastChild={{
                mb: 2,
              }}
            >
              {routes.map((route) => {
                return (
                  <Anchor
                    end
                    p={0}
                    rounded={8}
                    fontSize={13}
                    width={'full'}
                    border={'0px'}
                    height={'auto'}
                    key={route.label}
                    fontWeight={'medium'}
                    alignItems={'center'}
                    justifyContent={'start'}
                    backgroundColor={'transparent'}
                    to={
                      route.path === undefined ? '/app/' : `/app/${route.path}/`
                    }
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
                          backgroundColor={isActive ? 'gray-95' : 'transparent'}
                          color={isActive ? 'gray-10' : 'gray-60'}
                          _hover={{
                            backgroundColor: 'gray-95',
                          }}
                        >
                          <Iconify
                            width={'20px'}
                            icon={route.icon}
                          />

                          {route.label}
                        </Button>
                      );
                    }}
                  </Anchor>
                );
              })}
            </Box>
          </Box>

          <Divider
            width={'1px'}
            height={'100vh'}
            backgroundColor={'gray-90'}
          />
        </Flex>
      </Container>
    );
  }

  return null;
};

export default SideBar;
