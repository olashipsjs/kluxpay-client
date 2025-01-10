import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Overlay from '@components/overlay/Overlay';
import useStep from '@hooks/useStep';

const Header = ({ data }: { data: any }) => {
  const { previous, step } = useStep();

  return (
    <Flex
      py={10}
      px={16}
      gap={8}
      top={'0px'}
      zIndex={2}
      borderBottom={1}
      position={'sticky'}
      alignItems={'center'}
      backgroundColor={'white'}
      justifyContent={'between'}
      borderBottomColor={'gray-90'}
    >
      {step > 0 ? (
        <Button
          p={0}
          width={'fit'}
          color={'gray-70'}
          borderColor={'transparent'}
          onClick={() => previous(data)}
          _hover={{ color: 'gray-10' }}
          backgroundColor={'transparent'}
        >
          <Iconify
            width={20}
            icon={'fluent:chevron-left-24-filled'}
          />
        </Button>
      ) : null}

      <Heading
        as={'h2'}
        fontSize={16}
        lineHeight={'md'}
        textAlign={'center'}
        fontWeight={'semibold'}
      >
        Create an offer
      </Heading>

      <Overlay.Trigger
        p={0}
        width={'fit'}
        color={'indigo-60'}
        borderColor={'transparent'}
        _hover={{ color: 'indigo-40' }}
        backgroundColor={'transparent'}
      >
        Cancel
      </Overlay.Trigger>
    </Flex>
  );
};

export default Header;
