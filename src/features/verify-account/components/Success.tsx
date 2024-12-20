import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';

const Success = () => {
  return (
    <Flex
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Iconify
        width={'3em'}
        color={'indigo-50'}
        icon={'ph:seal-check-fill'}
      />
      <Heading
        mt={20}
        fontSize={19}
        textAlign={'center'}
        letterSpacing={'md'}
      >
        Account verified
      </Heading>
      <Text
        as={'p'}
        mt={8}
        fontSize={14}
        color={'gray-50'}
        lineHeight={'lg'}
        textAlign={'center'}
      >
        You have successfully verified your account. Click the link below to
        sign in to your account.
      </Text>

      <Button mt={20}>Start Trading</Button>
    </Flex>
  );
};

export default Success;
