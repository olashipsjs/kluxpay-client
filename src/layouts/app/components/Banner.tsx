import useAuth from '@hooks/useAuth';
import useUser from '@hooks/useUser';
import Text from '@components/base/text/Text';
import Flex from '@components/base/flex/Flex';
import Anchor from '@components/anchor/Anchor';
import Heading from '@components/base/heading/Heading';
import Container from '@components/base/container/Container';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Banner = () => {
  const { auth } = useAuth();
  const { user } = useUser();

  if (auth.accessToken === null || user === null) {
    const message =
      auth.accessToken === null ? 'Session expired.' : 'Server error.';

    return (
      <Container
        py={6}
        px={20}
        maxWidth={'400px'}
      >
        <Flex
          mx={'auto'}
          width={'full'}
          minHeight={'screen'}
          alignItems={'center'}
          flexDirection={'column'}
          justifyContent={'center'}
        >
          <DotLottieReact
            src={
              'https://lottie.host/b9d2119d-0cda-45ba-bcf3-bfc8293ee6a7/qrRbXwxT1F.lottie'
            }
            width={'400px'}
            height={'400px'}
            loop
            autoplay
          />

          <Heading
            mt={12}
            fontSize={21}
            lineHeight={'1.25'}
            textAlign={'center'}
          >
            {message}
          </Heading>

          <Text
            mt={8}
            as={'p'}
            fontSize={16}
            color={'gray-60'}
            lineHeight={'1.4'}
            textAlign={'center'}
          >
            We are unable to load up the dashboard currently. Sign in to restart
            your session.
          </Text>

          <Anchor
            mt={24}
            py={8}
            px={12}
            replace={true}
            color={'white'}
            to={'/auth/login/'}
            fontWeight={'semibold'}
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
