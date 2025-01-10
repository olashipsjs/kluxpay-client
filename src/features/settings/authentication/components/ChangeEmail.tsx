import * as Yup from 'yup';
import useAuth from '@hooks/useAuth';
import { Form, Formik } from 'formik';
import Toast from '@components/toast/Toast';
import { CHANGE_EMAIL } from '@graphql/auth';
import Grid from '@components/base/grid/Grid';
import Flex from '@components/base/flex/Flex';
import Button from '@components/base/button/Button';
import useLocalStorage from '@hooks/useLocalStorage';
import Heading from '@components/base/heading/Heading';
import FormField from '@components/formfield/FormField';
import useApolloMutation from '@hooks/useApolloMutation';
import TextField from '@components/base/textfield/TextField';

const validationSchema = Yup.object().shape({
  newEmail: Yup.string()
    .email('Invalid email address')
    .required('Enter a valid email address'),
});

const ChangeEmail = () => {
  const { setAuth } = useAuth();
  const { clear } = useLocalStorage('kp_access_token');

  const [changeEmail, { loading, error, data }] = useApolloMutation(
    CHANGE_EMAIL,
    {
      onCompleted: () => {
        clear();
        setAuth({ type: 'SET_LOGGED_OUT' });
      },
    }
  );

  const initialValues = { newEmail: '' };

  const handleSubmit = async (values: typeof initialValues) => {
    await changeEmail({ variables: values });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <Form>
        <Grid
          alignItems={'start'}
          gridTemplateColumns={{ sm: '1fr 1fr 1fr' }}
        >
          <Heading
            fontSize={14}
            fontWeight={'semibold'}
          >
            Change email
          </Heading>

          <FormField name={'newEmail'}>
            <FormField.Sheet alignItems={'center'}>
              <TextField
                type={'email'}
                css={{ flex: 1 }}
                placeholder={'name@domain.com'}
              />
            </FormField.Sheet>
          </FormField>

          <Flex
            flexDirection={'column'}
            alignItems={{ sm: 'end' }}
          >
            <Button
              py={6}
              px={10}
              width={'fit'}
              fontSize={13}
              type={'submit'}
              color={'gray-40'}
              disabled={loading}
              fontWeight={'semibold'}
              borderColor={'gray-80'}
              backgroundColor={'white'}
              _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
            >
              <Button.Loader
                color={'gray-10'}
                visible={loading}
              />
              Change
            </Button>
          </Flex>
        </Grid>

        {/* error toast */}
        <Toast visible={error !== undefined}>
          <Toast.Panel>
            <Toast.TextContext>{error?.message}</Toast.TextContext>
          </Toast.Panel>
        </Toast>

        {/* success toast */}
        <Toast visible={data && data.changeEmail}>
          <Toast.Panel backgroundColor={'green-60'}>
            <Toast.TextContext>
              Legal names updated successfully
            </Toast.TextContext>
          </Toast.Panel>
        </Toast>
      </Form>
    </Formik>
  );
};

export default ChangeEmail;
