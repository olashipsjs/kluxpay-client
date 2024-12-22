import Alert from '@components/alert/Alert';
import Button from '@components/base/button/Button';
import Loader from '@components/base/button/Loader';
import Label from '@components/base/label/Label';
import TextField from '@components/base/textfield/TextField';
import Divider from '@components/divider/Divider';
import FormField from '@components/formfield/FormField';
import { UPDATE_USER } from '@graphql/user';
import useApolloMutation from '@hooks/useApolloMutation';
import useUser from '@hooks/useUser';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Enter your first name'),
  lastName: Yup.string().required('Enter your Last name'),
});

const Names = () => {
  const { user, setUser } = useUser();
  const [updateUser, { loading, error }] = useApolloMutation(UPDATE_USER, {
    onCompleted: (data) => {
      if (data?.updateUser) {
        setUser({ type: 'UPDATE_USER', payload: { user: data.updateUser } });
      }
    },
  });

  const handleSubmit = async (values: typeof initialValues) => {
    await updateUser({ variables: { payload: values } });
  };

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
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
            <FormField name={'firstName'}>
              <FormField.Sheet
                ps={12}
                alignItems={'center'}
              >
                <Label>First Name</Label>
                <TextField
                  css={{ flex: 1 }}
                  placeholder={'e.g John'}
                />
              </FormField.Sheet>
              <FormField.Message />
            </FormField>

            <Divider my={4} />

            <FormField name={'lastName'}>
              <FormField.Sheet
                ps={12}
                alignItems={'center'}
              >
                <Label>Last Name</Label>
                <TextField
                  css={{ flex: 1 }}
                  placeholder={'e.g John'}
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
              disabled={
                (values.firstName === user?.firstName &&
                  values.lastName === user?.lastName) ||
                loading
              }
            >
              <Loader visible={loading} />
              Change
            </Button>

            <Alert
              mt={12}
              visible={error !== undefined}
            >
              <Alert.Icon />
              <Alert.Message css={{ flex: 1 }}>{error?.message}</Alert.Message>
            </Alert>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Names;
