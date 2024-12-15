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
import Alert from '@components/alert/Alert';
import React from 'react';
import VerifyAccount from './VerifyAccount';
import Loader from '@components/base/button/Loader';
import useApolloQuery from '@hooks/useApolloQuery';
import { GET_USER } from '@graphql/user';
import useAuth from '@hooks/useAuth';
import Button from '@components/base/button/Button';

const VerificationBanner = React.memo(() => {
  const { user } = useUser();

  if (user?.isEmailVerified) return null;

  return (
    <Overlay
      p={8}
      justifyContent={'center'}
    >
      {({ setIsOpen }) => {
        return (
          <React.Fragment>
            <Alert
              px={12}
              py={6}
              gap={6}
              visible
              timeout={0}
              alignItems={'center'}
              justifyContent={'between'}
              backgroundColor={'indigo-60'}
            >
              <Heading
                fontSize={13}
                color={'white'}
                css={{ flex: 1 }}
              >
                Unlock full access
                <Iconify
                  mx={8}
                  width={'4px'}
                  css={{ verticalAlign: 'middle' }}
                  icon={'material-symbols-light:circle'}
                />
                <Anchor
                  to={''}
                  color={'white'}
                  fontSize={'inherit'}
                  fontWeight={'regular'}
                  _hover={{
                    opacity: 90,
                    color: 'white',
                    textDecoration: 'underline',
                  }}
                  onClick={() => setIsOpen(true)}
                >
                  Verify your account
                  <Iconify
                    ms={6}
                    width={'24px'}
                    icon={'material-symbols-light:line-end-arrow-notch'}
                  />
                </Anchor>
              </Heading>
              <Alert.Dismiss
                p={0}
                width={'fit'}
              >
                <Iconify
                  width={'16px'}
                  icon={'material-symbols-light:close'}
                />
              </Alert.Dismiss>
            </Alert>
            <VerifyAccount />
          </React.Fragment>
        );
      }}
    </Overlay>
  );
});

const Content = React.memo(() => {
  const { user, setUser } = useUser();
  const { auth } = useAuth();

  const { error, loading, refetch } = useApolloQuery(GET_USER, {
    onCompleted: (data: any) => {
      if (data?.getUser) {
        setUser({ type: 'SET_USER', payload: { user: data.getUser } });
      }
    },
  });

  switch (true) {
    case !auth.isLoggedIn:
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
            mt={12}
            fontSize={21}
          >
            Session expired
          </Heading>
          <Text
            as={'p'}
            mt={8}
            fontSize={16}
            lineHeight={'lg'}
            textAlign={'center'}
          >
            Your session has expired. Try signing in again to regain access.
          </Text>
          <Anchor
            py={12}
            px={16}
            mt={24}
            width={'full'}
            to={'/auth/'}
            color={'white'}
            backgroundColor={'indigo-60'}
            _hover={{
              color: 'white',
              backgroundColor: 'indigo-70',
            }}
          >
            Login
          </Anchor>
        </Flex>
      );

    case error !== undefined:
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
            {error?.message}
          </Text>

          <Button
            py={12}
            px={16}
            mt={24}
            width={'full'}
            color={'white'}
            onClick={() => refetch()}
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

    case loading:
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

    case !user:
      return null;

    default:
      return (
        <React.Fragment>
          <VerificationBanner />
          <Header />
          <Outlet />
        </React.Fragment>
      );
  }
});

const Body = () => {
  return (
    <Container
      px={0}
      width={'auto'}
      minHeight={'screen'}
      ms={{ initial: '0px', md: '400px' }}
    >
      <Content />
    </Container>
  );
};

export default Body;
