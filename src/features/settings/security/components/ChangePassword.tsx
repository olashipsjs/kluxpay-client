import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import useAuth from '@hooks/useAuth';
import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Grid from '@components/base/grid/Grid';
import { CHANGE_PASSWORD } from '@graphql/auth';
import Button from '@components/base/button/Button';
import useLocalStorage from '@hooks/useLocalStorage';
import FormField from '@components/formfield/FormField';
import useApolloMutation from '@hooks/useApolloMutation';
import Password from '@components/base/textfield/Password';
import Heading from '@components/base/heading/Heading';
import Toast from '@components/toast/Toast';

const validationSchema = Yup.object().shape({
  newPassword: Yup.string().required('Enter your new password'),
  oldPassword: Yup.string().required('Enter your current password'),
});

const ChangePassword = () => {
  const { setAuth } = useAuth();
  const { clear } = useLocalStorage('kp_access_token');

  const [changeEmail, { loading, error, data }] = useApolloMutation(
    CHANGE_PASSWORD,
    {
      onCompleted: () => {
        clear();
        setAuth({ type: 'SET_LOGGED_OUT' });
      },
    }
  );

  const initialValues = { oldPassword: '', newPassword: '' };

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
          <Box>
            <Heading
              fontSize={14}
              fontWeight={'semibold'}
            >
              Change Password
            </Heading>
          </Box>

          <Box notLastChild={{ mb: 6 }}>
            <FormField name={'oldPassword'}>
              <FormField.Sheet>
                <Password
                  autoComplete={'old-password'}
                  placeholder={'Previous password'}
                />
              </FormField.Sheet>
              <FormField.Message />
            </FormField>
            <FormField name={'newPassword'}>
              <FormField.Sheet>
                <Password
                  autoComplete={'new-password'}
                  placeholder={'New password'}
                />
              </FormField.Sheet>
              <FormField.Message />
            </FormField>
          </Box>

          <Flex
            flexDirection={'column'}
            alignItems={{ sm: 'end' }}
          >
            <Button
              py={6}
              px={10}
              fontSize={13}
              width={'fit'}
              type={'submit'}
              color={'gray-40'}
              disabled={loading}
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

          {/* error toast */}
          <Toast visible={error !== undefined}>
            <Toast.Panel>
              <Toast.TextContext>{error?.message}</Toast.TextContext>
            </Toast.Panel>
          </Toast>

          {/* success toast */}
          <Toast visible={data && data.changePassword}>
            <Toast.Panel backgroundColor={'green-60'}>
              <Toast.TextContext>
                Password changed successfully
              </Toast.TextContext>
            </Toast.Panel>
          </Toast>
        </Grid>
      </Form>
    </Formik>
  );
};

export default ChangePassword;
