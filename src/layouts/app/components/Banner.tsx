import Anchor from '@components/anchor/Anchor';
import Container from '@components/base/container/Container';
import Flex from '@components/base/flex/Flex';
import Text from '@components/base/text/Text';
import useAuth from '@hooks/useAuth';
import useUser from '@hooks/useUser';

const Banner = () => {
  const { auth } = useAuth();
  const { user } = useUser();
  if (auth.accessToken === null || user === null) {
    const message =
      auth.accessToken === null
        ? 'Session expired. Sign in again.'
        : 'Unable to load resource. Sign in to refresh data.';

    return (
      <Container
        py={6}
        px={20}
        zIndex={'999'}
        width={'full'}
        maxWidth={'full'}
        position={'fixed'}
        backgroundColor={'gray-10'}
      >
        <Flex
          gap={8}
          mx={'auto'}
          width={'full'}
          alignItems={'center'}
        >
          <Text
            fontSize={13}
            color={'white'}
            lineHeight={'lg'}
            css={{ flex: 1 }}
          >
            {message}
          </Text>
          <Anchor
            py={6}
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
  }

  return null;
};

export default Banner;
