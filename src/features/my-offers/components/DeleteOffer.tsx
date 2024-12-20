import Box from '@components/base/box/Box';
import Dropdown from '@components/dropdown/Dropdown';
import Iconify from '@components/base/iconify/Iconify';

type Props = {
  offerId: string;
};

const DeleteOffer = ({  }: Props) => {
  return (
    <Box>
      <Dropdown.Item>
        <Iconify
          width={'1.6em'}
          icon={'material-symbols-light:delete-rounded'}
        />
        Delete
      </Dropdown.Item>
    </Box>
  );
};

export default DeleteOffer;
