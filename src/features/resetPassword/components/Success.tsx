import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Anchor from '@components/anchor/Anchor';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';

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
        Your password has been reset
      </Heading>

      <Anchor
        mt={16}
        to={'/auth/'}
        display={'block'}
      >
        <Button>Sign in</Button>
      </Anchor>
    </Flex>
  );
};

export default Success;
