import Alert from '@components/alert/Alert';
import Button from '@components/base/button/Button';
import Loader from '@components/base/button/Loader';
import Label from '@components/base/label/Label';
import Text from '@components/base/text/Text';
import TextField from '@components/base/textfield/TextField';
import FormField from '@components/formfield/FormField';
import { CHANGE_EMAIL } from '@graphql/auth';
import useApolloMutation from '@hooks/useApolloMutation';
import useAuth from '@hooks/useAuth';
import useLocalStorage from '@hooks/useLocalStorage';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  newEmail: Yup.string()
    .email('Invalid email address')
    .required('Enter a valid email address'),
});

const ChangeEmail = () => {
  const { setAuth } = useAuth();
  const { clear } = useLocalStorage('kp_access_token');

  const [changeEmail, { loading, error }] = useApolloMutation(CHANGE_EMAIL, {
    onCompleted: () => {
      clear();
      setAuth({ type: 'SET_LOGGED_OUT' });
    },
  });

  const initialValues = { newEmail: '' };

  const handleSubmit = async (values: typeof initialValues) => {
    await changeEmail({ variables: { payload: values } });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <Form>
        <FormField name={'newEmail'}>
          <FormField.Sheet
            ps={12}
            alignItems={'center'}
          >
            <Label>New email</Label>
            <TextField
              type={'email'}
              css={{ flex: 1 }}
              placeholder={'name@domain.com'}
            />
          </FormField.Sheet>
        </FormField>

        <Button
          py={6}
          mt={12}
          width={'fit'}
          type={'submit'}
          disabled={loading}
        >
          <Loader visible={loading} />
          Change
        </Button>

        <Text
          as={'p'}
          mt={8}
          fontSize={12}
        >
          Upon completion you will be logged out of your account. You can sign
          in again using your new credentials.
        </Text>

        <Alert
          mt={12}
          visible={error !== undefined}
        >
          <Alert.Icon />
          <Alert.Message css={{ flex: 1 }}>{error?.message}</Alert.Message>
        </Alert>
      </Form>
    </Formik>
  );
};

export default ChangeEmail;
