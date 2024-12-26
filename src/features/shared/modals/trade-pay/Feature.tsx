import Step from '@components/step/Step';
import Success from './components/Success';
import ReleaseCoin from './components/ReleaseCoin';
import Overlay from '@components/overlay/Overlay';

const TradePaymentFeature = () => {
  return (
    <Overlay.Panel justifyContent={'end'}>
      <Overlay.Background />
      <Overlay.Content
        p={12}
        maxWidth={'400px'}
      >
        <Step initialData={{}}>
          <Step.Screen screens={[<ReleaseCoin />, <Success />]} />
        </Step>
      </Overlay.Content>
    </Overlay.Panel>
  );
};

export default TradePaymentFeature;
