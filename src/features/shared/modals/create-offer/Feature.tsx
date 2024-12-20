import React from 'react';
import Type from './components/Type';
import Step from '@components/step/Step';
import Settings from './components/Settings';
import Payment from './components/Payment';
import Summary from './components/Summary';
import Success from './components/Success';
import Overlay from '@components/overlay/Overlay';
import useApolloQuery from '@hooks/useApolloQuery';
import { GET_OFFER } from '@graphql/offer';
import coins from 'src/constants/coins';
import Divider from '@components/divider/Divider';
import Header from './components/Header';

const CreateOfferFeature = ({ offerId }: { offerId?: string }) => {
  const { data } = useApolloQuery(GET_OFFER, {
    variables: { id: offerId },
  });

  const offer = data?.getOffer;

  const initialData = {
    type: offer ? offer.type : '',
    fiat: offer ? offer.fiat : 'ngn',
    notes: offer ? offer.notes : '',
    coinId: offer ? offer.coinId : coins[0].id,
    amount: offer ? offer.amount : '',
    timeout: offer ? offer.timeout : 15,
    maxLimit: offer ? offer.maxLimit : '',
    minLimit: offer ? offer.minLimit : '',
    payment: offer ? offer.payment._id : '',
    priceMargin: offer ? offer.priceMargin : '',
  };

  return (
    <React.Fragment>
      <Overlay.Panel justifyContent={{ initial: 'end', sm: 'center' }}>
        <Overlay.Background />
        <Overlay.Content
          maxWidth={'400px'}
          maxHeight={'88vh'}
          overflow={'scroll'}
        >
          <Step
            overflow={'clip'}
            initialData={initialData}
          >
            <Header />
            <Divider backgroundColor={'gray-90'} />
            <Step.Screen
              pt={20}
              screens={[
                <Type />,
                <Settings />,
                <Payment />,
                <Summary offerId={offerId} />,
                <Success />,
              ]}
            />
          </Step>
        </Overlay.Content>
      </Overlay.Panel>
    </React.Fragment>
  );
};

export default CreateOfferFeature;
