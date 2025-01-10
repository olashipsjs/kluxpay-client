import Anchor from '@components/anchor/Anchor';
import Flex from '@components/base/flex/Flex';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import Overlay from '@components/overlay/Overlay';
import DepositFeature from '@features/shared/modals/deposit/Feature';
import WithdrawFeature from '@features/shared/modals/withdraw/Feature';
import useUser from '@hooks/useUser';

const Options = () => {
  const { user } = useUser();

  return (
    <Flex
      mt={20}
      gap={20}
      alignItems={'start'}
      justifyContent={'between'}
    >
      <Overlay
        gap={10}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Overlay.Trigger
          py={4}
          px={16}
          rounded={'full'}
          color={'gray-60'}
          borderColor={'transparent'}
          backgroundColor={'gray-95'}
          _hover={{ color: 'gray-10', backgroundColor: 'gray-90' }}
        >
          <Iconify
            width={20}
            icon={'fluent:add-24-filled'}
          />
        </Overlay.Trigger>
        <Text
          fontSize={13}
          lineHeight={'1'}
        >
          Deposit
        </Text>
        <DepositFeature />
      </Overlay>
      <Overlay
        gap={10}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Overlay.Trigger
          py={4}
          px={16}
          rounded={'full'}
          color={'gray-60'}
          borderColor={'transparent'}
          backgroundColor={'gray-95'}
          _hover={{ color: 'gray-10', backgroundColor: 'gray-90' }}
        >
          <Iconify
            width={20}
            icon={'fluent:arrow-forward-24-filled'}
          />
        </Overlay.Trigger>
        <Text
          fontSize={13}
          lineHeight={'1'}
        >
          Withdraw
        </Text>
        <WithdrawFeature />
      </Overlay>
      <Overlay
        gap={10}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Anchor
          py={4}
          px={16}
          border={1}
          rounded={'full'}
          color={'gray-60'}
          to={'/app/market/'}
          borderColor={'transparent'}
          backgroundColor={'gray-95'}
          _hover={{ color: 'gray-10', backgroundColor: 'gray-90' }}
        >
          <Iconify
            width={20}
            icon={'fluent:arrow-swap-24-filled'}
          />
        </Anchor>
        <Text
          fontSize={13}
          lineHeight={'1'}
        >
          Trade
        </Text>
      </Overlay>
      <Overlay
        gap={10}
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Anchor
          py={4}
          px={16}
          border={1}
          rounded={'full'}
          color={'gray-60'}
          borderColor={'transparent'}
          backgroundColor={'gray-95'}
          to={`/app/traders/${user?.username}`}
          _hover={{ color: 'gray-10', backgroundColor: 'gray-90' }}
        >
          <Iconify
            width={20}
            icon={'fluent:globe-24-regular'}
          />
        </Anchor>
        <Text
          fontSize={13}
          lineHeight={'1'}
        >
          Profile
        </Text>
      </Overlay>
    </Flex>
  );
};

export default Options;
