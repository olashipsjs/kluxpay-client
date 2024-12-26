import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import Overlay from '@components/overlay/Overlay';

const Success = () => {
  return (
    <Flex flexDirection={'column'}>
      <Iconify
        width={32}
        icon={'fluent:box-checkmark-24-regular'}
      />
      <Heading
        mt={20}
        fontSize={21}
      >
        Coin released
      </Heading>
      <Text fontSize={14}>
        Your trade was successful, and the coin has been released securely to
        the specified wallet. We’re here if you need any assistance!
      </Text>

      <Overlay.Trigger mt={20}>Proceed</Overlay.Trigger>
    </Flex>
  );
};

export default Success;
