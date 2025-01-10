// import Anchor from '@components/anchor/Anchor';
import Avatar from '@components/avatar/Avatar';
import Button from '@components/base/button/Button';
import Container from '@components/base/container/Container';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Image from '@components/base/image/Image';
import Section from '@components/base/section/Section';
import Divider from '@components/divider/Divider';
import useAuth from '@hooks/useAuth';
import useUser from '@hooks/useUser';
// import { useLocation, useMatches } from 'react-router-dom';

// interface RouteConfig {
//   path: string;
//   breadcrumb?: string | ((params: Record<string, string>) => string);
// }

// const routeConfig: RouteConfig[] = [
//   { path: '/app/', breadcrumb: 'Home' },
//   { path: '/app/market/', breadcrumb: 'Market' },
//   { path: '/app/support/', breadcrumb: 'Support' },
//   { path: '/app/wallets/', breadcrumb: 'Wallets' },
//   { path: '/app/settings/', breadcrumb: 'Settings' },
//   { path: '/app/referral/', breadcrumb: 'Referral' },
//   { path: '/app/my-offers/', breadcrumb: 'My Offers' },
//   { path: '/app/transactions/', breadcrumb: 'Transactions' },
//   { path: '/app/trades/', breadcrumb: 'Trades' },
// ];

// const MobileHeader = () => {
//   const { pathname } = useLocation();
//   const matches = useMatches();

//   const breadcrumbs = matches
//     .map((match) => {
//       const route = routeConfig.find((r) => r.path === match.pathname);
//       if (!route || !route.breadcrumb) return null;

//       return { name: route.breadcrumb as string, path: match.pathname };
//     })
//     .filter(Boolean);

//   const breadcrumb = breadcrumbs.find(
//     (breadcrumb) => breadcrumb?.path === pathname
//   );

//   return (
//     <Flex
//       py={16}
//       alignItems={'center'}
//       display={{ sm: 'hidden' }}
//       justifyContent={'between'}
//     >
//       <Button
//         p={0}
//         size={'32px'}
//         rounded={'full'}
//         color={'gray-60'}
//         borderColor={'transparent'}
//         backgroundColor={'transparent'}
//         _hover={{
//           color: 'gray-10',
//           backgroundColor: 'gray-95',
//         }}
//       >
//         <Iconify
//           width={24}
//           icon={'fluent:glance-horizontal-sparkles-24-regular'}
//         />
//       </Button>

//       <Heading
//         fontSize={19}
//         lineHeight={'1'}
//       >
//         {breadcrumb ? breadcrumb.name : 'App'}
//       </Heading>

//       <Anchor
//         p={0}
//         size={'32px'}
//         rounded={'full'}
//         color={'gray-60'}
//         to={'/app/support'}
//         borderColor={'transparent'}
//         backgroundColor={'transparent'}
//         _hover={{
//           color: 'gray-10',
//           backgroundColor: 'gray-95',
//         }}
//       >
//         <Iconify
//           width={24}
//           icon={'fluent:chat-multiple-24-regular'}
//         />
//       </Anchor>
//     </Flex>
//   );
// };

const Header = () => {
  const { user } = useUser();
  const { auth } = useAuth();

  if (!user || !auth.accessToken) return null;

  return (
    <Section
      py={10}
      top={'0px'}
      as={'header'}
      zIndex={'99'}
      borderBottom={1}
      position={'sticky'}
      backgroundColor={'white'}
      borderBottomColor={'gray-80'}
    >
      <Container
        maxWidth={'1280px'}
        px={{ initial: 12, sm: 24 }}
      >
        {/* <MobileHeader /> */}
        <Flex
          alignItems={'center'}
          justifyContent={'between'}
        >
          <Flex
            gap={6}
            alignItems={'center'}
          >
            <Image
              width={'32px'}
              height={'32px'}
              rounded={'full'}
              src={'/logo.jpg'}
            />
            <Heading
              fontSize={21}
              lineHeight={'1'}
              fontWeight={'semibold'}
            >
              kluxpay.
            </Heading>
          </Flex>

          <Flex
            alignItems={'center'}
            gap={{ initial: 4, sm: 12 }}
          >
            <Button
              p={0}
              size={'26px'}
              color={'gray-60'}
              borderColor={'transparent'}
              backgroundColor={'transparent'}
              _hover={{ color: 'gray-10', backgroundColor: 'gray-90' }}
            >
              <Iconify
                width={20}
                icon={'fluent:vote-24-filled'}
              />
            </Button>

            <Button
              p={0}
              size={'26px'}
              color={'gray-60'}
              borderColor={'transparent'}
              backgroundColor={'transparent'}
              _hover={{ color: 'gray-10', backgroundColor: 'gray-90' }}
            >
              <Iconify
                width={20}
                icon={'fluent:cookies-24-filled'}
              />
            </Button>

            <Button
              p={0}
              size={'26px'}
              color={'gray-60'}
              borderColor={'transparent'}
              backgroundColor={'transparent'}
              _hover={{ color: 'gray-10', backgroundColor: 'gray-90' }}
            >
              <Iconify
                width={20}
                icon={'fluent:globe-24-filled'}
              />
            </Button>

            <Divider
              width={'1px'}
              height={'24px'}
              mx={{ initial: 8, sm: 10 }}
              backgroundColor={'gray-80'}
            />

            <Button
              p={0}
              size={'fit'}
              rounded={'full'}
              borderColor={'transparent'}
              backgroundColor={'transparent'}
              _hover={{ borderColor: 'gray-10' }}
            >
              <Avatar>
                <Avatar.Picture
                  src={
                    user?.avatar?.url
                      ? user.avatar.url
                      : '/assets/images/avatar.png'
                  }
                />
              </Avatar>
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
};

export default Header;
