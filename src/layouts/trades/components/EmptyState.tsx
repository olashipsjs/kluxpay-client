import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';

const EmptyState = () => {
  return (
    <Flex
      pt={40}
      alignItems={'center'}
      flexDirection={'column'}
      display={{ initial: 'hidden', md: 'flex' }}
    >
      <Iconify
        width={40}
        color={'gray-60'}
        icon={'fluent:chat-sparkle-24-filled'}
      />
      <Heading
        mt={12}
        fontSize={21}
        textAlign={'center'}
      >
        Choose a Trade
      </Heading>
      <Text
        mt={4}
        as={'p'}
        fontSize={14}
      >
        Choose a trade to display the chats.
      </Text>
    </Flex>
  );
};

export default EmptyState;
