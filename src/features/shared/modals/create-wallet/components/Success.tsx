import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Image from '@components/base/image/Image';
import Text from '@components/base/text/Text';
import Overlay from '@components/overlay/Overlay';

const Success = () => {
  return (
    <Flex
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Image
        alt={''}
        width={'140px'}
        src={'https://cdn-icons-png.flaticon.com/256/4727/4727716.png'}
      />

      <Heading fontSize={19}>Wallet created</Heading>
      <Text
        mt={8}
        as={'p'}
        fontSize={14}
        textAlign={'center'}
      >
        Your wallet has been created successfully. You can now use it to send
        and receive funds.
      </Text>

      <Overlay.Trigger mt={20}>Start Trading</Overlay.Trigger>
    </Flex>
  );
};

export default Success;
