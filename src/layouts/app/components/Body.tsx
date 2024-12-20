import Container from '@components/base/container/Container';
import useUser from '@hooks/useUser';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Flex from '@components/base/flex/Flex';
import Iconify from '@components/base/iconify/Iconify';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import Anchor from '@components/anchor/Anchor';
import Overlay from '@components/overlay/Overlay';
import React from 'react';
import Loader from '@components/base/button/Loader';
import useAuth from '@hooks/useAuth';
import Button from '@components/base/button/Button';
import VerifyEmailFeature from '@features/shared/modals/verify-email/Feature';

const VerificationBanner = React.memo(() => {
  const { user } = useUser();

  if (user?.isEmailVerified) return null;

  return (
    <Container maxWidth={'fit'}>
      <Overlay
        py={8}
        px={12}
        rounded={12}
        alignItems={'center'}
        justifyContent={'center'}
        backgroundColor={'orange-60'}
      >
        <Heading
          fontSize={14}
          color={'white'}
        >
          Unlock full access by verifying your email address.
          <Overlay.Trigger
            px={8}
            py={4}
            ms={6}
            rounded={12}
            width={'fit'}
            color={'orange-60'}
            borderColor={'transparent'}
            backgroundColor={'white'}
            _hover={{
              opacity: 90,
              color: 'orange-70',
              backgroundColor: 'white',
            }}
          >
            Verify now
          </Overlay.Trigger>
        </Heading>

        <VerifyEmailFeature />
      </Overlay>
    </Container>
  );
});

const Content = React.memo(() => {
  const { user } = useUser();
  const { auth } = useAuth();

  switch (true) {
    case auth.accessToken === null:
      return (
        <Container
          py={8}
          px={20}
          width={'full'}
          maxWidth={'full'}
          backgroundColor={'gray-10'}
        >
          <Flex
            gap={8}
            mx={'auto'}
            width={'full'}
            alignItems={'center'}
          >
            <Text
              color={'white'}
              lineHeight={'lg'}
              css={{ flex: 1 }}
              fontSize={{ initial: 13, sm: 14 }}
            >
              Session expired. Try signing in again to regain access.
            </Text>
            <Anchor
              py={4}
              px={16}
              replace={true}
              color={'white'}
              to={'/auth/login/'}
              backgroundColor={'indigo-60'}
              _hover={{
                color: 'white',
                backgroundColor: 'indigo-70',
              }}
            >
              Login
            </Anchor>
          </Flex>
        </Container>
      );

    case user === null:
      return (
        <Flex
          mx={'auto'}
          height={'100vh'}
          maxWidth={'400px'}
          alignItems={'center'}
          flexDirection={'column'}
          justifyContent={'center'}
        >
          <Iconify
            width={'40px'}
            color={'orange-60'}
            icon={'material-symbols-light:warning-rounded'}
          />
          <Heading
            mt={20}
            fontSize={21}
          >
            Server error
          </Heading>
          <Text
            mt={8}
            as={'p'}
            fontSize={16}
            lineHeight={'lg'}
            textAlign={'center'}
          >
            Server error. Please try again later.
          </Text>

          <Button
            py={12}
            px={16}
            mt={24}
            width={'full'}
            color={'white'}
            backgroundColor={'indigo-60'}
            _hover={{
              color: 'white',
              backgroundColor: 'indigo-70',
            }}
          >
            Login
          </Button>
        </Flex>
      );

    case !!auth.accessToken || !!user:
      return (
        <Flex
          pb={32}
          px={{ initial: 16, sm: 32 }}
          flexDirection={'column'}
        >
          <Header />
          <VerificationBanner />
          <Outlet />
        </Flex>
      );

    default:
      return (
        <Flex
          height={'100vh'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Loader
            visible
            width={'20px'}
            color={'indigo-60'}
          />
        </Flex>
      );
  }
});

const Body = () => {
  return (
    <Container
      px={0}
      width={'auto'}
      maxWidth={'full'}
      minHeight={'screen'}
      ms={{ initial: '0px', md: '320px' }}
    >
      <Content />
    </Container>
  );
};

export default Body;
