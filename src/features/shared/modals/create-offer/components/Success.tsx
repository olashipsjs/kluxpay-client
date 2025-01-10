import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import Overlay from '@components/overlay/Overlay';

const Success = () => {
  return (
    <Flex
      p={16}
      minHeight={'60vh'}
      alignItems={'center'}
      flexDirection={'column'}
      justifyContent={'center'}
    >
      <Iconify
        width={96}
        css={{ flex: 1 }}
        color={'indigo-60'}
        icon={'uim:circle-layer'}
      />
      <Box maxWidth={'320px'}>
        <Heading
          fontSize={21}
          textAlign={'center'}
        >
          Offer posted
        </Heading>
        <Text
          mt={8}
          as={'p'}
          fontSize={14}
          textAlign={'center'}
        >
          Activate your offer to make it available to other trades on kluxpay
          Market.
        </Text>
      </Box>

      <Overlay.Trigger
        mt={12}
        width={'fit'}
        color={'gray-40'}
        fontWeight={'semibold'}
        borderColor={'gray-80'}
        backgroundColor={'transparent'}
        _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
      >
        Manage offer
      </Overlay.Trigger>
    </Flex>
  );
};

export default Success;
