import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';

const Success = () => {
  return (
    <Flex gap={12}>
      <Iconify
        width={32}
        color={'green-60'}
        icon={'fluent:checkmark-underline-circle-24-regular'}
      />
      <Box>
        <Heading fontSize={19}>Update Successful!</Heading>
        <Text
          mt={4}
          as={'p'}
          fontSize={14}
        >
          Your wallet is ready for your next transaction or action.
        </Text>
      </Box>
    </Flex>
  );
};

export default Success;
