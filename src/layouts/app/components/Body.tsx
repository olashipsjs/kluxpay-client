import Container from '@components/base/container/Container';
import useUser from '@hooks/useUser';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Flex from '@components/base/flex/Flex';
import Iconify from '@components/base/iconify/Iconify';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import useLocalStorage from '@hooks/useLocalStorage';
import { REFRESH_ACCESS_TOKEN } from '@graphql/auth';
import useApolloQuery from '@hooks/useApolloQuery';
import Anchor from '@components/anchor/Anchor';

const Body = () => {
  const { user } = useUser();
  const { item, save } = useLocalStorage('kp_access_token');
  const { error, loading } = useApolloQuery<any>(REFRESH_ACCESS_TOKEN, {
    pollInterval: 60 * 60 * 1000,
    onCompleted: (data) => save(data?.refreshAccessToken?.accessToken),
    variables: { payload: { accessToken: item || '' } },
  });

  const isError = loading && (error !== undefined || !item);

  if (isError) {
    return (
      <Container ms={{ initial: '0px', md: '400px' }}>
        <Flex
          minHeight={'screen'}
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
            mt={12}
            as={'p'}
            fontSize={14}
            textAlign={'center'}
          >
            Your session has expired. Try signing in again to regain access.
          </Text>

          <Anchor
            py={8}
            px={12}
            mt={24}
            to={'/auth/'}
            color={'white'}
            backgroundColor={'indigo-60'}
            _hover={{
              color: 'white',
              backgroundColor: 'indigo-70',
            }}
          >
            Sign in
          </Anchor>
        </Flex>
      </Container>
    );
  }

  if (!user) return null;

  return (
    <Container
      minHeight={'100vh'}
      ps={{ initial: '0px', md: 64 }}
      ms={{ initial: '0px', md: '400px' }}
      maxWidth={{ initial: 'full', md: '720px' }}
    >
      <Header />
      <Outlet />
    </Container>
  );
};

export default Body;
