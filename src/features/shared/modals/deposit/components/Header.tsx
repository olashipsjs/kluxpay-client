import useStep from '@hooks/useStep';
import Flex from '@components/base/flex/Flex';
import Overlay from '@components/overlay/Overlay';
import Button from '@components/base/button/Button';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import useWallets from '@hooks/useWallets';

const Header = () => {
  const { token } = useWallets();

  const { step, previous } = useStep();

  return (
    <Flex
      py={12}
      px={16}
      top={'0'}
      zIndex={2}
      borderBottom={1}
      position={'sticky'}
      alignItems={'center'}
      backgroundColor={'white'}
      justifyContent={'between'}
      borderBottomColor={'gray-90'}
    >
      <Heading
        fontSize={17}
        lineHeight={'1'}
        fontWeight={'semibold'}
      >
        Deposit
      </Heading>

      {step === 1 ? (
        <Button
          p={0}
          size={'24px'}
          rounded={'full'}
          color={'gray-60'}
          borderColor={'transparent'}
          onClick={() => previous(token)}
          backgroundColor={'transparent'}
          _hover={{ color: 'gray-10', backgroundColor: 'gray-95' }}
        >
          <Iconify
            width={20}
            icon={'fluent:chevron-left-24-filled'}
          />
        </Button>
      ) : (
        <Overlay.Trigger
          p={0}
          size={'24px'}
          rounded={'full'}
          color={'gray-60'}
          borderColor={'transparent'}
          backgroundColor={'transparent'}
          _hover={{ color: 'gray-10', backgroundColor: 'gray-95' }}
        >
          <Iconify
            width={20}
            icon={'fluent:dismiss-24-filled'}
          />
        </Overlay.Trigger>
      )}
    </Flex>
  );
};

export default Header;
