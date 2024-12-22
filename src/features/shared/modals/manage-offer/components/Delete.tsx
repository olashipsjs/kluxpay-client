import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Loader from '@components/base/button/Loader';
import { DELETE_OFFER } from '@graphql/offer';
import useApolloMutation from '@hooks/useApolloMutation';
import useOffers from '@hooks/useOffers';
import useOverlay from '@hooks/useOverlay';
import { Form, Formik } from 'formik';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Delete = () => {
  const navigate = useNavigate();
  const { setIsOpen } = useOverlay();
  const { setOffers } = useOffers();
  const [searchParams] = useSearchParams();
  const ID = searchParams.get('id');

  if (!ID) return null;

  const [deleteOffer, { loading, error }] = useApolloMutation(DELETE_OFFER, {
    onCompleted: () => {
      if (ID) {
        setOffers({ type: 'DELETE_OFFER', payload: { offerId: ID! } });
        navigate('/app/my-offers/', { replace: true });
        setIsOpen(false);
      }
    },
  });

  const handleSubmit = async () => {
    try {
      await deleteOffer({ variables: { id: ID } });
    } catch (err) {
      console.error('Error deleting offer:', err);
    }
  };

  return (
    <Box width={'full'}>
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
      >
        <Form>
          <Button
            color={'white'}
            type={'submit'}
            disabled={loading}
            borderColor={'red-60'}
            backgroundColor={'red-60'}
            _hover={{
              backgroundColor: 'red-50',
            }}
          >
            <Loader
              color={'white'}
              visible={loading}
            />
            {`${error ? 'Error' : 'Delete'}`}
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default Delete;
