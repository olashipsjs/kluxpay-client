import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import Overlay from '@components/overlay/Overlay';
import useWallets from '@hooks/useWallets';

const Success = () => {
  const { setWallets } = useWallets();

  return (
    <Flex
      css={{ flex: 1 }}
      alignItems={'center'}
      flexDirection={'column'}
      justifyContent={'between'}
    >
      <Flex
        p={16}
        mt={24}
        width={'90%'}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Iconify
          width={32}
          color={'indigo-60'}
          backgroundColor={'white'}
          icon={'fluent:checkmark-circle-24-regular'}
        />

        <Heading
          mt={12}
          fontSize={21}
          textAlign={'center'}
          fontWeight={'semibold'}
        >
          You coin is on it's way
        </Heading>

        <Text
          mt={6}
          as={'p'}
          fontSize={14}
          textAlign={'center'}
        >
          Your transaction is complete. Check your wallet or view the details on
          Blockchain Explorer Link
        </Text>
      </Flex>

      <Box
        p={16}
        width={'full'}
      >
        <Overlay.Trigger
          mt={24}
          color={'gray-40'}
          borderColor={'gray-90'}
          onClick={() =>
            setWallets({
              type: 'SET_CURRENT_TOKEN',
              payload: { token: undefined },
            })
          }
          backgroundColor={'transparent'}
          _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
        >
          Done
        </Overlay.Trigger>
      </Box>
    </Flex>
  );
};

export default Success;
