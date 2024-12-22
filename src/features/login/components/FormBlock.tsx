import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import Label from '@components/base/label/Label';
import Button from '@components/base/button/Button';
import FormField from '@components/formfield/FormField';
import TextField from '@components/base/textfield/TextField';
import Alert from '@components/alert/Alert';
import { useNavigate } from 'react-router-dom';
import Anchor from '@components/anchor/Anchor';
import Text from '@components/base/text/Text';
import useLogin from '../hooks/useLogin';
import useAsync from '@hooks/useAsync';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address format'),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Must contain at least one digit')
    .matches(
      /[@$!%*?&#.:()+_-]/,
      'Must contain at least one special character'
    ),
});

const initialValues = { email: '', password: '' };

const FormBlock = () => {
  const navigate = useNavigate();
  const { login } = useLogin();
  const [async, { loading, error }] = useAsync(login, {
    onCompleted: () => navigate('/app/'),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    await async(values);
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
            <FormField
              mt={32}
              name={'email'}
            >
              <Label htmlFor='email'>Email address</Label>
              <FormField.Sheet>
                <TextField
                  type={'email'}
                  autoComplete={'username'}
                  placeholder='example@example.com'
                  name={'email'}
                />
              </FormField.Sheet>
              <FormField.Message />
            </FormField>

            <FormField
              mt={20}
              name={'password'}
              css={{
                gridColumn: 'span 2/span 2',
              }}
            >
              <Label htmlFor='password'>Password</Label>
              <FormField.Sheet>
                <TextField.Password
                  name={'password'}
                  placeholder={'Minimum of 8 unique characters'}
                />
              </FormField.Sheet>
              <FormField.Message />
            </FormField>

            <Text
              mt={16}
              as={'p'}
              fontSize={14}
            >
              Forgot password?
              <Anchor
                ms={4}
                color={'orange-60'}
                fontSize={'inherit'}
                to={'/auth/reset-password/'}
              >
                Reset it
              </Anchor>
            </Text>

            <Button
              mt={24}
              type={'submit'}
              disabled={loading}
            >
              <Button.Loader visible={loading}></Button.Loader>
              Login
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

export default FormBlock;
