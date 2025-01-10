import useStep from '@hooks/useStep';
import { Form, Formik } from 'formik';
import useAsync from '@hooks/useAsync';
import Alert from '@components/alert/Alert';
import useRegister from '../hooks/useRegister';
import Label from '@components/base/label/Label';
import Button from '@components/base/button/Button';
import FormField from '@components/formfield/FormField';
import TextField from '@components/base/textfield/TextField';
import Box from '@components/base/box/Box';
import { usernameValidationSchema } from '../schemas/validationSchema';

const Username = () => {
  const { data, next, previous } = useStep<any>();
  const { mutation } = useRegister();
  const [async, { loading, error }] = useAsync(mutation, {
    onCompleted: (data) => {
      next(data);
    },
  });

  const handleSubmit = async (values: typeof data) => {
    await async(values);
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={usernameValidationSchema}
    >
      {({ values }) => {
        return (
          <Form>
            <Box notLastChild={{ mb: 16 }}>
              <FormField name='username'>
                <Label>Username</Label>
                <FormField.Sheet>
                  <TextField
                    placeholder={'Enter a username'}
                    autoComplete={'username'}
                  />
                </FormField.Sheet>
                <FormField.Message>
                  Choose a unique username 3-15 characters long
                </FormField.Message>
              </FormField>

              <Box notLastChild={{ mb: 6 }}>
                <Button
                  type={'submit'}
                  disabled={loading}
                >
                  <Button.Loader visible={loading} />
                  Create account
                </Button>
                <Button
                  color={'gray-60'}
                  borderColor={'gray-90'}
                  backgroundColor={'white'}
                  onClick={() => previous({ ...data, ...values })}
                  _hover={{
                    color: 'gray-10',
                    backgroundColor: 'gray-100',
                  }}
                >
                  Change data
                </Button>
              </Box>

              <Alert visible={error !== undefined}>
                <Alert.Message>{error?.message}</Alert.Message>
              </Alert>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Username;
