import Alert from '@components/alert/Alert';
import Button from '@components/base/button/Button';
import Loader from '@components/base/button/Loader';
import Label from '@components/base/label/Label';
import TextField from '@components/base/textfield/TextField';
import FormField from '@components/formfield/FormField';
import { UPDATE_USER } from '@graphql/user';
import useApolloMutation from '@hooks/useApolloMutation';
import useUser from '@hooks/useUser';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  dateOfBirth: Yup.string().required('Enter your date of birth'),
});

const DateOfBirth = () => {
  const { user, setUser } = useUser();
  const [updateUser, { loading, error }] = useApolloMutation(UPDATE_USER, {
    onCompleted: (data) => {
      if (data?.updateUser) {
        setUser({ type: 'UPDATE_USER', payload: { user: data.updateUser } });
      }
    },
  });

  const initialValues = {
    dateOfBirth: user?.dateOfBirth || '',
  };

  const handleSubmit = async (values: typeof initialValues) => {
    await updateUser({
      variables: { payload: values },
    });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ values }) => {
        return (
          <Form>
            <FormField name={'dateOfBirth'}>
              <FormField.Sheet
                ps={12}
                alignItems={'center'}
              >
                <Label>Date of Birth</Label>
                <TextField
                  css={{ flex: 1 }}
                  type={'date'}
                />
              </FormField.Sheet>
              <FormField.Message />
            </FormField>

            <Button
              py={6}
              mt={12}
              fontSize={13}
              width={'fit'}
              type={'submit'}
              disabled={values.dateOfBirth === user?.dateOfBirth || loading}
            >
              <Loader visible={loading} />
              Change
            </Button>

            <Alert visible={error !== undefined}>
              <Alert.Icon />
              <Alert.Message css={{ flex: 1 }}>{error?.message}</Alert.Message>
            </Alert>
          </Form>
        );
      }}
    </Formik>
  );
};

export default DateOfBirth;
