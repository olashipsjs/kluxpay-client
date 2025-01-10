import FormBlock from './components/FormBlock';
import Success from './components/Success';
import Step from '@components/step/Step';
import paymentMethods from 'src/constants/paymentMethods';
import Overlay from '@components/overlay/Overlay';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Divider from '@components/divider/Divider';
import usePayments from '@hooks/usePayments';

const AddPaymentFeature = ({ id }: { id?: string }) => {
  const { payments } = usePayments();
  const index = payments.findIndex((p) => p._id === id);

  const payment = payments[index];

  const initialData = {
    method: paymentMethods[0].name,
    bankName: payment?.bankName || '',
    bankAccountNumber: payment?.bankAccountNumber || '',
    bankAccountName: payment?.bankAccountName || '',
    details: payment?.details || '',
  };

  return (
    <Overlay.Panel justifyContent={{ initial: 'end', sm: 'center' }}>
      <Overlay.Background />
      <Overlay.Content maxWidth={'400px'}>
        <Flex
          px={20}
          py={12}
          alignItems={'center'}
          justifyContent={'between'}
        >
          <Heading
            as={'h2'}
            fontSize={19}
          >
            Payment method
          </Heading>

          <Overlay.Trigger
            py={6}
            px={12}
            width={'fit'}
            rounded={'full'}
            color={'gray-40'}
            borderColor={'gray-80'}
            backgroundColor={'transparent'}
            _hover={{
              color: 'red-30',
              borderColor: 'red-100',
              backgroundColor: 'red-100',
            }}
          >
            Cancel
          </Overlay.Trigger>
        </Flex>

        <Divider backgroundColor={'gray-90'} />

        <Step
          p={20}
          initialData={initialData}
        >
          <Step.Screen screens={[<FormBlock id={id} />, <Success />]} />
        </Step>
      </Overlay.Content>
    </Overlay.Panel>
  );
};

export default AddPaymentFeature;
