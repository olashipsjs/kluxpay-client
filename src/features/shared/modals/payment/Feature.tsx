import Box from '@components/base/box/Box';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import Divider from '@components/divider/Divider';
import Overlay from '@components/overlay/Overlay';
import Payment from '@ts_types/paayment';

type ItemProps = {
  label: string;
  value: string;
};

const Item = ({ label, value }: ItemProps) => {
  return (
    <Box>
      <Text fontSize={13}>{label}</Text>
      <Heading fontSize={14}>{value}</Heading>
    </Box>
  );
};

const PaymentFeature = ({ payment }: { payment: Payment.Type }) => {
  return (
    <Overlay.Panel justifyContent={'end'}>
      <Overlay.Background />
      <Overlay.Content
        p={12}
        maxWidth={'400px'}
      >
        <Heading fontSize={19}>Payment Information</Heading>

        <Divider my={12} />

        <Box
          notLastChild={{
            mb: 12,
          }}
        >
          <Item
            label={'Bank name'}
            value={payment?.bankName}
          />

          <Item
            label={'Account Name'}
            value={payment?.bankAccountName}
          />

          <Item
            label={'Account Number'}
            value={payment?.bankAccountNumber}
          />

          <Item
            label={'Method'}
            value={payment?.method}
          />

          <Item
            label={'Details'}
            value={payment?.details}
          />
        </Box>

        <Overlay.Trigger
          py={10}
          mt={24}
          color={'gray-60'}
          borderColor={'gray-90'}
          backgroundColor={'transparent'}
          _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
        >
          Cancel
        </Overlay.Trigger>
      </Overlay.Content>
    </Overlay.Panel>
  );
};

export default PaymentFeature;
