import Heading from '@components/base/heading/Heading';
import Overlay from '@components/overlay/Overlay';

const OpenTradeFeature = () => {
  return (
    <Overlay.Panel>
      <Overlay.Background />
      <Overlay.Content>
        <Heading>Hello world</Heading>
      </Overlay.Content>
    </Overlay.Panel>
  );
};

export default OpenTradeFeature;
