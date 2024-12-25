import Overlay from '@components/overlay/Overlay';
import Step from '@components/step/Step';
import useUser from '@hooks/useUser';
import Network from './components/Network';
import Start from './components/Start';
import Success from './components/Success';

const CreateWalletFeature = () => {
  const { user } = useUser();

  const initialData = {
    email: user?.email,
    networks: 'ethereum',
  };

  return (
    <Overlay.Panel justifyContent={{ initial: 'end', sm: 'center' }}>
      <Overlay.Background />
      <Overlay.Content maxWidth={'400px'}>
        <Step initialData={initialData}>
          <Step.Screen
            p={12}
            screens={[<Start />, <Network />, <Success />]}
          />
        </Step>
      </Overlay.Content>
    </Overlay.Panel>
  );
};

export default CreateWalletFeature;
