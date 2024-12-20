import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Anchor from '@components/anchor/Anchor';
import Flex from '@components/base/flex/Flex';
import Text from '@components/base/text/Text';

const Success = () => {
  return (
    <Flex
      mt={32}
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Iconify
        width={'56px'}
        color={'green-60'}
        icon={'material-symbols-light:check-circle-rounded'}
      />
      <Heading
        mt={12}
        fontSize={21}
        lineHeight={'lg'}
        textAlign={'center'}
      >
        Password changed
      </Heading>

      <Text
        mt={8}
        as={'p'}
        fontSize={17}
      >
        Ready to get back in? Log in now.
      </Text>

      <Anchor
        mt={16}
        to={'/auth/'}
        display={'block'}
        color={'orange-60'}
        _hover={{
          color: 'orange-40',
        }}
      >
        Sign in
      </Anchor>
    </Flex>
  );
};

export default Success;
