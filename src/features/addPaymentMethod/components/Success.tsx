import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Overlay from '@components/overlay/Overlay';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';

const Success = () => {
  return (
    <Flex
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Iconify
        width={'48px'}
        color={'green-60'}
        icon={'material-symbols-light:check-circle-rounded'}
      />
      <Heading
        mt={20}
        lineHeight={'md'}
        textAlign={'center'}
        fontSize={{ initial: 19, sm: 21 }}
      >
        Payment option added
      </Heading>

      <Text
        mt={8}
        as={'p'}
        fontSize={16}
        lineHeight={'lg'}
        textAlign={'center'}
      >
        Your payment method has been successfully added. You can now link it to
        your offers to accept payments.
      </Text>

      <Overlay.Trigger
        mt={24}
        width={'fit'}
      >
        Okay! Proceed
      </Overlay.Trigger>
    </Flex>
  );
};

export default Success;
