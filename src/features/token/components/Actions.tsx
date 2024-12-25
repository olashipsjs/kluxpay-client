import Button from '@components/base/button/Button';
import Grid from '@components/base/grid/Grid';
import Iconify from '@components/base/iconify/Iconify';
import Overlay from '@components/overlay/Overlay';
import DepositFeature from '@features/shared/modals/deposit/Feature';

const Actions = () => {
  return (
    <Grid
      gap={8}
      gridTemplateColumns={'1fr 1fr'}
    >
      <Overlay>
        <Overlay.Trigger
          py={8}
          color={'gray-60'}
          borderColor={'gray-90'}
          backgroundColor={'white'}
          boxShadow={'0px .5px 0px 0px rgba(var(--gray-80))'}
          _hover={{
            color: 'gray-10',
            backgroundColor: 'gray-100',
          }}
        >
          <Iconify
            width={'20px'}
            icon={'fluent:arrow-download-24-regular'}
          />
          Deposit
        </Overlay.Trigger>
        <DepositFeature />
      </Overlay>
      <Button
        py={8}
        color={'gray-60'}
        borderColor={'gray-90'}
        backgroundColor={'white'}
        boxShadow={'0px .5px 0px 0px rgba(var(--gray-80))'}
        _hover={{
          color: 'gray-10',
          backgroundColor: 'gray-100',
        }}
      >
        <Iconify
          width={'20px'}
          icon={'fluent:arrow-upload-24-regular'}
        />
        Withdraw
      </Button>
    </Grid>
  );
};

export default Actions;
