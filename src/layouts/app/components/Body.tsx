import Container from '@components/base/container/Container';
import useUser from '@hooks/useUser';
import { Outlet } from 'react-router-dom';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import Anchor from '@components/anchor/Anchor';
import Overlay from '@components/overlay/Overlay';
import React from 'react';
import Loader from '@components/base/button/Loader';
import useAuth from '@hooks/useAuth';
import VerifyEmailFeature from '@features/shared/modals/verify-email/Feature';
import Header from './Header';
import Section from '@components/base/section/Section';
import SideBar from './SideBar';

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

const Banner = ({ message }: { message: string }) => {
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
          {message}
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
};

const Loading = () => {
  return (
    <Flex
      minHeight={'screen'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Loader
        visible
        width={'20px'}
        color={'gray-10'}
      />
    </Flex>
  );
};

const Content = () => {
  return (
    <Container
      px={0}
      width={'auto'}
      maxWidth={'full'}
      minHeight={'screen'}
      ms={{ initial: '0px', md: '280px' }}
    >
      <Flex
        pb={32}
        flexDirection={'column'}
        px={{ initial: 16, sm: 24 }}
      >
        <VerificationBanner />
        <Outlet />
      </Flex>
    </Container>
  );
};

const Body = () => {
  const { user } = useUser();
  const { auth } = useAuth();

  if (auth.accessToken === null) {
    return <Banner message={'Session expired. Try signing in again.'} />;
  }

  if (user === null) {
    return <Banner message={'Unable to load resource. Try again later.'} />;
  }

  if (!auth.accessToken && !user) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Header />
      <Section backgroundColor={'gray-95'}>
        <SideBar />
        <Content />;
      </Section>
    </React.Fragment>
  );
};

export default Body;
