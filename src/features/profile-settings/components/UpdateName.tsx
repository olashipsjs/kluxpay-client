import Alert from '@components/alert/Alert';
import Button from '@components/base/button/Button';
import Loader from '@components/base/button/Loader';
import Flex from '@components/base/flex/Flex';
import Label from '@components/base/label/Label';
import TextField from '@components/base/textfield/TextField';
import FormField from '@components/formfield/FormField';
import { UPDATE_USER } from '@graphql/user';
import useApolloMutation from '@hooks/useApolloMutation';
import useOverlay from '@hooks/useOverlay';
import useUser from '@hooks/useUser';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Enter value'),
  lastName: Yup.string().required('Enter value'),
});

const UpdateName = () => {
  const { setIsOpen } = useOverlay();
  const { user, setUser } = useUser();
  const [updateUser, { loading, error }] = useApolloMutation(UPDATE_USER, {
    onCompleted: (data) => {
      setUser({ type: 'UPDATE_USER', payload: { user: data?.updateUser } });
      setIsOpen(false);
    },
  });

  const initialValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
  };

  const handleSubmit = async (values: typeof initialValues) => {
    await updateUser({
      variables: {
        payload: values,
      },
    });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {() => {
        return (
          <Form>
            <Flex
              gap={12}
              flexDirection={{ initial: 'column', sm: 'row' }}
            >
              <FormField name={'firstName'}>
                <Label>First name</Label>
                <FormField.Sheet>
                  <TextField placeholder='e.g John' />
                </FormField.Sheet>
                <FormField.Message />
              </FormField>
              <FormField name={'lastName'}>
                <Label>Last name</Label>
                <FormField.Sheet>
                  <TextField placeholder='e.g John' />
                </FormField.Sheet>
                <FormField.Message />
              </FormField>
            </Flex>

            <Button
              mt={20}
              type={'submit'}
              disabled={loading}
            >
              <Loader visible={loading} />
              Update
            </Button>

            <Alert
              mt={20}
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

export default UpdateName;
