import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';

const Success = () => {
  return (
    <Flex flexDirection={'column'}>
      <Iconify
        width={'40px'}
        color={'green-60'}
        icon={'material-symbols-light:check-circle-rounded'}
      />
      <Heading
        mt={20}
        fontSize={19}
        lineHeight={'md'}
      >
        Payment option added
      </Heading>

      <Text
        mt={6}
        as={'p'}
        fontSize={14}
        lineHeight={'lg'}
      >
        Your payment method has been successfully added. You can now link it to
        your offers to accept payments.
      </Text>
    </Flex>
  );
};

export default Success;
