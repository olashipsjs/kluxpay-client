import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Overlay from '@components/overlay/Overlay';

const Header = () => {
  return (
    <Flex
      gap={8}
      py={12}
      px={20}
      alignItems={'center'}
    >
      <Heading
        as={'h2'}
        fontSize={21}
        lineHeight={'md'}
        css={{ flex: 1 }}
      >
        Post offer
      </Heading>

      <Overlay.Trigger
        py={2}
        px={12}
        width={'fit'}
        color={'gray-60'}
        borderColor={'transparent'}
        backgroundColor={'gray-90'}
        _hover={{ color: 'gray-10', backgroundColor: 'gray-80' }}
      >
        <Iconify
          width={16}
          icon={'fluent:arrow-minimize-24-regular'}
        />
      </Overlay.Trigger>
    </Flex>
  );
};

export default Header;
