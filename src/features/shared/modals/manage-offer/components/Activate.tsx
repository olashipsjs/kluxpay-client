import Alert from '@components/alert/Alert';
import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Loader from '@components/base/button/Loader';
import { ACTIVATE_OFFER } from '@graphql/offer';
import useApolloMutation from '@hooks/useApolloMutation';
import useOffers from '@hooks/useOffers';
import useOverlay from '@hooks/useOverlay';
import { Form, Formik } from 'formik';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Activate = ({}) => {
  const navigate = useNavigate();
  const { setIsOpen } = useOverlay();
  const { setOffers } = useOffers();
  const [searchParams] = useSearchParams();

  const ID = searchParams.get('id');

  if (!ID) return null;

  const [activateOffer, { loading, error }] = useApolloMutation(
    ACTIVATE_OFFER,
    {
      onCompleted: () => {
        setOffers({ type: 'ACTIVATE_OFFER', payload: { offerId: ID! } });
        navigate('/app/my-offers/', { replace: true });
        setIsOpen(false);
      },
    }
  );

  const handleSubmit = async () => {
    try {
      await activateOffer({ variables: { id: ID } });
    } catch (error) {
      console.log('Error activating offer', error);
    }
  };

  return (
    <Box>
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
      >
        <Form>
          <Button
            mt={6}
            type={'submit'}
            disabled={loading}
          >
            <Loader
              color={'white'}
              visible={loading}
            />
            Activate
          </Button>
        </Form>
      </Formik>

      <Alert
        mt={12}
        visible={error !== undefined}
      >
        <Alert.Message>{error?.message}</Alert.Message>
      </Alert>
    </Box>
  );
};

export default Activate;
