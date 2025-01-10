import Overlay from '@components/overlay/Overlay';
import CreateOfferFeature from '../../../modals/create-offer/Feature';
import Iconify from '@components/base/iconify/Iconify';

const Edit = () => {
  return (
    <Overlay>
      <Overlay.Trigger
        py={6}
        px={8}
        gap={10}
        rounded={8}
        fontSize={13}
        color={'gray-10'}
        fontWeight={'semibold'}
        justifyContent={'start'}
        borderColor={'transparent'}
        backgroundColor={'transparent'}
        _hover={{ backgroundColor: 'gray-95' }}
      >
        <Iconify
          width={16}
          color={'indigo-60'}
          icon={'fluent:edit-24-filled'}
        />
        Edit
      </Overlay.Trigger>
      <CreateOfferFeature />
    </Overlay>
  );
};

export default Edit;
