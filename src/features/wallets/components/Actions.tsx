import Flex from '@components/base/flex/Flex';
import Iconify from '@components/base/iconify/Iconify';
import Overlay from '@components/overlay/Overlay';
import DepositFeature from '@features/shared/modals/deposit/Feature';
import WithdrawFeature from '@features/shared/modals/withdraw/Feature';

const Actions = () => {
  return (
    <Flex gap={12}>
      <Overlay width={'full'}>
        <Overlay.Trigger
          color={'gray-60'}
          borderColor={'gray-90'}
          backgroundColor={'white'}
          boxShadow={'0px .5px 0px rgba(var(--gray-80))'}
          _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
        >
          <Iconify
            width={16}
            icon={'fluent:arrow-download-24-regular'}
          />
          Deposit
        </Overlay.Trigger>
        <DepositFeature />
      </Overlay>
      <Overlay width={'full'}>
        <Overlay.Trigger
          color={'gray-60'}
          borderColor={'gray-90'}
          backgroundColor={'white'}
          boxShadow={'0px .5px 0px rgba(var(--gray-80))'}
          _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
        >
          <Iconify
            width={16}
            icon={'fluent:arrow-export-up-24-regular'}
          />
          Withdraw
        </Overlay.Trigger>
        <WithdrawFeature />
      </Overlay>
    </Flex>
  );
};

export default Actions;
