import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Link from '@components/anchor/Link';
import Text from '@components/base/text/Text';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Failed = () => {
  useGSAP(() => {
    gsap.fromTo(
      '#warning-icon',
      {
        x: 0,
        rotate: 4,
      },
      {
        x: 4,
        rotate: 0,
        repeat: 4,
        yoyo: true,
        duration: 0.15,
      }
    );

    gsap.set('#fadeIn', {
      opacity: 0,
    });

    gsap.to('#fadeIn', {
      opacity: 1,
      duration: 1,
      delay: 0.2,
    });
  }, []);

  return (
    <Flex
      py={32}
      px={12}
      mx={'auto'}
      width={'full'}
      maxWidth={'500px'}
      minHeight={'100vh'}
      alignItems={'center'}
      flexDirection={'column'}
      justifyContent={{ initial: 'between', sm: 'center' }}
    >
      <Flex
        width={'full'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Box id={'warning-icon'}>
          <Iconify
            width={'4.5em'}
            color={'red-50'}
            icon={'material-symbols-light:warning-rounded'}
          />
        </Box>
        <Heading
          mt={16}
          id={'fadeIn'}
          lineHeight={'sm'}
          textAlign={'center'}
        >
          Something went wrong
        </Heading>
        <Text
          mt={6}
          as={'p'}
          id={'fadeIn'}
          fontSize={17}
          lineHeight={'lg'}
          textAlign={'center'}
          letterSpacing={'xs'}
        >
          Unable to connect to the server. Try signing in again or contact
          support for help
        </Text>
      </Flex>

      <Flex
        mt={24}
        gap={8}
        id={'fadeIn'}
        width={'full'}
      >
        <Link
          width={'full'}
          href={'/app/'}
        >
          <Button
            color={'gray-30'}
            borderColor={'gray-95'}
            backgroundColor={'gray-95'}
            _hover={{
              color: 'gray-10',
              borderColor: 'gray-90',
              backgroundColor: 'gray-90',
            }}
          >
            Try again
          </Button>
        </Link>
        <Link
          width={'full'}
          href={'/auth/login/'}
        >
          <Button>Sign in</Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Failed;
