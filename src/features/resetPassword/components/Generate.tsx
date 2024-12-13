import React from 'react';
import Button from '@components/base/button/Button';
import FormField from '@components/formfield/FormField';
import Label from '@components/base/label/Label';
import TextField from '@components/base/textfield/TextField';
import { Form, Formik } from 'formik';
import useStep from '@hooks/useStep';
import * as Yup from 'yup';
import Alert from '@components/alert/Alert';
import useSendOTP from '@hooks/useSendOTP';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address.')
    .required('Email address is required for confirmation.'),
});

const Generate = () => {
  const { data, next, setData } = useStep<any>();
  const [sendOTP, { loading, error }] = useSendOTP({
    onCompleted: (res) => next({ email: res.email, code: '', newPassword: '' }),
  });

  const handleSubmit = async (values: typeof data) => {
    setData({ ...data, ...values });

    await sendOTP(values.email, {
      template: 'otp',
      recipients: values.email,
      subject: 'One time password',
      data: {
        title: 'One Time Password',
        label: 'To reset your password',
      },
    });
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={data}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {() => {
          return (
            <Form>
              <FormField
                mt={24}
                name={'email'}
              >
                <Label>Email address</Label>
                <FormField.Sheet>
                  <TextField placeholder={'e.g abc@abc.com'} />
                </FormField.Sheet>
                <FormField.Message />
              </FormField>

              <Button
                mt={16}
                type={'submit'}
                disabled={loading}
              >
                <Button.Loader visible={loading} />
                Send OTP
              </Button>
            </Form>
          );
        }}
      </Formik>

      <Alert
        mt={12}
        visible={error !== undefined}
      >
        <Alert.Icon />
        <Alert.Message css={{ flex: 1 }}>{error?.message}</Alert.Message>
      </Alert>
    </React.Fragment>
  );
};

export default Generate;
