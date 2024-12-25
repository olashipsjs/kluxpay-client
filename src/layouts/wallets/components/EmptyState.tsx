import Container from '@components/base/container/Container';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';

const EmptyState = () => {
  return (
    <Container
      pt={40}
      maxWidth={'480px'}
    >
      <Flex
        alignItems={'center'}
        flexDirection={'column'}
        justifyContent={'center'}
      >
        <Iconify
          p={8}
          width={48}
          border={1}
          rounded={'full'}
          borderColor={'gray-90'}
          backgroundColor={'white'}
          icon={'fluent:layer-diagonal-sparkle-24-regular'}
          boxShadow={'0px .5px 0px 0px rgba(var(--gray-80))'}
        />
        <Heading
          mt={16}
          fontSize={21}
          textAlign={'center'}
        >
          Choose a wallet
        </Heading>
        <Text
          mt={6}
          as={'p'}
          fontSize={14}
          textAlign={'center'}
        >
          Choose your wallet and access your account instantly.
        </Text>
      </Flex>
    </Container>
  );
};

export default EmptyState;
