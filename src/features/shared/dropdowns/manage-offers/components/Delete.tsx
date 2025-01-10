import Button from '@components/base/button/Button';
import Iconify from '@components/base/iconify/Iconify';
import { DELETE_OFFER } from '@graphql/offer';
import useApolloMutation from '@hooks/useApolloMutation';
import useOffers from '@hooks/useOffers';
import { Form, Formik } from 'formik';
import Toast from '@components/toast/Toast';

const Delete = () => {
  const { setOffers, offer } = useOffers();

  const [deleteOffer, { loading, error, data }] = useApolloMutation(
    DELETE_OFFER,
    {
      onCompleted: (data) => {
        if (data && data.deleteOffer) {
          setOffers({
            type: 'DELETE_OFFER',
            payload: { offerId: offer?._id || '' },
          });
        }
      },
    }
  );

  if (!offer) return null;

  const handleSubmit = async () => {
    await deleteOffer({ variables: { offerId: offer._id } });
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={handleSubmit}
    >
      <Form css={{ width: '100%', display: 'block' }}>
        <Button
          py={6}
          px={8}
          gap={10}
          rounded={8}
          fontSize={13}
          type={'submit'}
          color={'red-60'}
          disabled={loading}
          fontWeight={'semibold'}
          justifyContent={'start'}
          borderColor={'transparent'}
          backgroundColor={'transparent'}
          _hover={{ backgroundColor: 'red-100' }}
        >
          <Iconify
            width={16}
            icon={'fluent:delete-24-filled'}
          />
          <Button.Loader
            color={'gray-10'}
            visible={loading}
          />
          Delete
        </Button>

        <Toast visible={error !== undefined}>
          <Toast.Panel>
            <Toast.TextContext>{error?.message}</Toast.TextContext>
          </Toast.Panel>
        </Toast>
        <Toast visible={data && data.deleteOffer}>
          <Toast.Panel>
            <Toast.TextContext>Offer deleted</Toast.TextContext>
          </Toast.Panel>
        </Toast>
      </Form>
    </Formik>
  );
};

export default Delete;
