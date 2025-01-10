import useStep from '@hooks/useStep';
import useSendOtp from '../hooks/useSendOtp';
import useAsync from '@hooks/useAsync';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import FormField from '@components/formfield/FormField';
import Label from '@components/base/label/Label';
import TextField from '@components/base/textfield/TextField';
import Button from '@components/base/button/Button';
import Loader from '@components/loader/Loader';
import Alert from '@components/alert/Alert';
import Box from '@components/base/box/Box';

const Generate = () => {
  const { data, next } = useStep<any>();
  const { sendOtp } = useSendOtp();
  const [async, { loading, error }] = useAsync(sendOtp, {
    onCompleted: (res: any) => next({ ...data, ...res }),
  });

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Please enter a valid email address'),
  });

  const handleSubmit = async (values: any) => {
    await async({ email: values.email });
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Box notLastChild={{ mb: 16 }}>
          <FormField name={'email'}>
            <Label>Email</Label>
            <FormField.Sheet>
              <TextField
                disabled
                autoComplete={'email'}
                placeholder={'e.g johndoe@mail.com'}
              />
            </FormField.Sheet>
            <FormField.Message>
              Generate new One Time Password
            </FormField.Message>
          </FormField>

          <Button
            type={'submit'}
            disabled={loading}
          >
            <Loader visible={loading} />
            Generate OTP
          </Button>

          <Alert visible={error !== undefined}>
            <Alert.Icon />
            <Alert.Message css={{ flex: 1 }}>{error?.message}</Alert.Message>
          </Alert>
        </Box>
      </Form>
    </Formik>
  );
};

export default Generate;
