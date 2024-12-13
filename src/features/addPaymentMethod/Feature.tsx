import FormBlock from './components/FormBlock';
import Success from './components/Success';
import Step from '@components/step/Step';
import paymentMethods from 'src/constants/paymentMethods';
import Overlay from '@components/overlay/Overlay';

const initialData = {
  method: paymentMethods[0].name,
  bankName: '',
  bankAccountNumber: '',
  bankAccountName: '',
  details: '',
};

const AddPaymentMethodFeature = () => {
  return (
    <Overlay.Panel justifyContent={{ initial: 'end', sm: 'center' }}>
      <Overlay.Background />
      <Overlay.Content
        maxWidth={'400px'}
        p={12}
      >
        <Step initialData={initialData}>
          <Step.Screen screens={[<FormBlock />, <Success />]} />
        </Step>
      </Overlay.Content>
    </Overlay.Panel>
  );
};

export default AddPaymentMethodFeature;
