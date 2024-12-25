import Alert from '@components/alert/Alert';
import Button from '@components/base/button/Button';
import Loader from '@components/base/button/Loader';
import Label from '@components/base/label/Label';
import TextField from '@components/base/textfield/TextField';
import FormField from '@components/formfield/FormField';
import { UPDATE_WALLET } from '@graphql/wallet';
import useApolloMutation from '@hooks/useApolloMutation';
import useStep from '@hooks/useStep';
import useWallet from '@hooks/useWallet';
import { Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Enter your wallet name')
    .max(24, 'Maximum characters limit exceeded'),
});

const FormBlock = () => {
  const navigate = useNavigate();
  const { setWallets } = useWallet();
  const { data, next } = useStep<any>();
  const { id } = useParams<{ id: string }>();

  const [updateWallet, { loading, error }] = useApolloMutation(UPDATE_WALLET, {
    onCompleted: (data) => {
      if (data?.updateWallet) {
        const URL = `/app/wallets/${id}/?name=${data?.updateWallet.name}&network=${data?.updateWallet.network}&address=${data?.updateWallet.publicKey}`;

        setWallets({
          type: 'UPDATE_WALLET',
          payload: { wallet: data.updateWallet },
        });

        navigate(URL);

        next(data);
      }
    },
  });

  const handleSubmit = async (values: typeof data) => {
    await updateWallet({ variables: { id, payload: { ...values } } });
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values }) => {
        return (
          <Form>
            <FormField name={'name'}>
              <Label>Wallet name</Label>
              <FormField.Sheet>
                <TextField placeholder={'Moons team'} />
              </FormField.Sheet>
              <FormField.Message />
            </FormField>

            <Button
              mt={12}
              type={'submit'}
              disabled={loading || values.name === data.name}
            >
              <Loader
                color={'white'}
                visible={loading}
              />
              Update wallet
            </Button>

            <Alert
              mt={12}
              visible={error !== undefined}
            >
              <Alert.Message>{error?.message}</Alert.Message>
            </Alert>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormBlock;
