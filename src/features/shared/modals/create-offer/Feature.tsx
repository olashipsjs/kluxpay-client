import Coin from './components/Coin';
import Type from './components/Type';
import useUser from '@hooks/useUser';
import Notes from './components/Notes';
import Step from '@components/step/Step';
import useOffers from '@hooks/useOffers';
import Margin from './components/Margin';
import Limits from './components/Limits';
import Success from './components/Success';
import Payment from './components/Payment';
import Duration from './components/Duration';
import Overlay from '@components/overlay/Overlay';
import Fiat from './components/Fiat';

const CreateOfferFeature = () => {
  const { offer } = useOffers();
  const { user } = useUser();

  const initialData = {
    coin: offer ? offer.coin : '',
    notes: offer ? offer.notes : '',
    maxLimit: offer ? offer.maxLimit : '',
    minLimit: offer ? offer.minLimit : '',
    payment: offer ? offer.payment : '',
    margin: offer ? offer.margin : '',
    type: offer ? offer.type : 'sell',
    timeout: offer ? offer.timeout : 15,
    fiat: offer ? offer.fiat : user?.fiat.symbol,
  };

  const getScreens = (data: typeof initialData) => {
    if (data.type === 'sell') {
      return [
        <Fiat key={'fiat'} />,
        <Coin key='coin' />,
        <Type key='type' />,
        <Payment key='payment' />,
        <Limits key='limits' />,
        <Margin key='margin' />,
        <Duration key='duration' />,
        <Notes key='notes' />,
        <Success key='success' />,
      ];
    }
    return [
      <Fiat key={'fiat'} />,
      <Coin key='coin' />,
      <Type key='type' />,
      <Limits key='limits' />,
      <Margin key='margin' />,
      <Duration key='duration' />,
      <Notes key='notes' />,
      <Success key='success' />,
    ];
  };

  return (
    <Overlay.Panel justifyContent={'end'}>
      <Overlay.Background />
      <Overlay.Content
        maxWidth={'400px'}
        maxHeight={'88vh'}
        overflowY={'scroll'}
      >
        <Step
          overflow={'clip'}
          initialData={initialData}
        >
          {({ data }) => {
            return <Step.Screen screens={getScreens(data)} />;
          }}
        </Step>
      </Overlay.Content>
    </Overlay.Panel>
  );
};

export default CreateOfferFeature;
