import Overlay from '@components/overlay/Overlay';
import Step from '@components/step/Step';
import Success from './components/Success';
import FormBlock from './components/FormBlock';
import Header from './components/Header';
import Coin from './components/Coin';

const WithdrawFeature = () => {
  const initialData = { to: '', amount: '' };

  return (
    <Overlay.Panel justifyContent={'end'}>
      <Overlay.Background />
      <Overlay.Content
        maxWidth={'400px'}
        overflowY={'scroll'}
      >
        <Step initialData={initialData}>
          <Header />
          <Step.Screen
            height={'80vh'}
            screens={[<Coin />, <FormBlock />, <Success />]}
          />
        </Step>
      </Overlay.Content>
    </Overlay.Panel>
  );
};

export default WithdrawFeature;
