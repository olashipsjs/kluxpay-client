import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';

const EmptyState = () => {
  return (
    <Flex
      pt={32}
      alignItems={'center'}
      flexDirection={'column'}
      display={{ initial: 'hidden', md: 'flex' }}
    >
      <Iconify
        width={40}
        color={'gray-60'}
        icon={'fluent:book-star-24-filled'}
      />
      <Heading
        mt={12}
        fontSize={21}
        textAlign={'center'}
      >
        Select an offer
      </Heading>

      <Text
        mt={4}
        as={'p'}
        fontSize={14}
        textAlign={'center'}
      >
        You have not selected an offer yet. Once you choose, all the relevant
        details will be displayed here, helping you trade quickly and easily.
      </Text>
    </Flex>
  );
};

export default EmptyState;
