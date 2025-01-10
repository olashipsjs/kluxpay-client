import Button from '@components/base/button/Button';
import Iconify from '@components/base/iconify/Iconify';
import Toast from '@components/toast/Toast';
import { ACTIVATE_OFFER } from '@graphql/offer';
import useApolloMutation from '@hooks/useApolloMutation';
import useOffers from '@hooks/useOffers';
import useOverlay from '@hooks/useOverlay';
import { Form, Formik } from 'formik';

const Activate = () => {
  const { setIsOpen } = useOverlay();
  const { setOffers, offer } = useOffers();

  const [activateOffer, { loading, error, data }] = useApolloMutation(
    ACTIVATE_OFFER,
    {
      onCompleted: (data) => {
        if (data && data.activateOffer) {
          setOffers({
            type: 'ACTIVATE_OFFER',
            payload: { offerId: offer?._id! },
          });
          setIsOpen(false);
        }
      },
    }
  );

  if (!offer || offer?.isActive) return null;

  const PERCENTAGE = offer.margin / 100;
  const rate = offer.coin.quote[offer?.fiat.symbol].price * PERCENTAGE;

  const handleSubmit = async () => {
    await activateOffer({
      variables: { offerId: offer?._id, rate: parseFloat(String(rate || '0')) },
    });
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={handleSubmit}
    >
      <Form>
        <Button
          py={6}
          px={8}
          gap={10}
          rounded={8}
          fontSize={13}
          type={'submit'}
          color={'gray-10'}
          disabled={loading}
          fontWeight={'semibold'}
          justifyContent={'start'}
          borderColor={'transparent'}
          backgroundColor={'transparent'}
          _hover={{ backgroundColor: 'gray-95' }}
        >
          <Iconify
            width={16}
            icon={'fluent:flash-on-24-filled'}
          />
          <Button.Loader
            color={'gray-10'}
            visible={loading}
          />
          Activate
        </Button>

        <Toast visible={error !== undefined}>
          <Toast.Panel>
            <Toast.TextContext>{error?.message}</Toast.TextContext>
          </Toast.Panel>
        </Toast>
        <Toast visible={data && data.activateOffer}>
          <Toast.Panel backgroundColor={'green-60'}>
            <Toast.TextContext>Offer activated</Toast.TextContext>
          </Toast.Panel>
        </Toast>
      </Form>
    </Formik>
  );
};

export default Activate;
