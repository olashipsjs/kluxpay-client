import Anchor from '@components/anchor/Anchor';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Overlay from '@components/overlay/Overlay';
import useStep from '@hooks/useStep';

const Success = () => {
  const { data } = useStep<any>();

  return (
    <Flex
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Iconify
        width={32}
        color={'gray-10'}
        backgroundColor={'white'}
        icon={'fluent:checkmark-circle-24-regular'}
      />

      <Heading
        mt={12}
        fontSize={17}
        textAlign={'center'}
      >
        You just sent {data.amount} to {data.recipient}
      </Heading>

      <Anchor
        py={4}
        mt={8}
        to={``}
        px={12}
        gap={4}
        color={'gray-60'}
        backgroundColor={'gray-95'}
        _hover={{
          color: 'gray-10',
        }}
      >
        <Iconify
          width={20}
          icon={'fluent:link-24-regular'}
        />
        Trx Hash
      </Anchor>

      <Overlay.Trigger mt={64}>Proceed</Overlay.Trigger>
    </Flex>
  );
};

export default Success;
