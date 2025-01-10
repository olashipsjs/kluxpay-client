import Coin from './components/Coin';
import Data from './components/Data';
import Step from '@components/step/Step';
import Overlay from '@components/overlay/Overlay';
import useWallets from '@hooks/useWallets';
import Header from './components/Header';

const DepositFeature = () => {
  const { token } = useWallets();

  return (
    <Overlay.Panel justifyContent={'end'}>
      <Overlay.Background />
      <Overlay.Content
        height={'80vh'}
        maxWidth={'400px'}
        overflowY={'scroll'}
      >
        <Step
          defaultStep={token ? 1 : 0}
          initialData={{ coin: '' }}
        >
          <Header />
          <Step.Screen
            screens={[<Coin key={'coin'} />, <Data key={'data'} />]}
          />
        </Step>
      </Overlay.Content>
    </Overlay.Panel>
  );
};

export default DepositFeature;
