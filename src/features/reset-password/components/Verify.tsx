import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import useStep from 'src/hooks/useStep';
import Alert from '@components/alert/Alert';
import Label from '@components/base/label/Label';
import Button from '@components/base/button/Button';
import FormField from '@components/formfield/FormField';
import TextField from '@components/base/textfield/TextField';
import useVerifyOtp from '../hooks/useVerifyOtp';
import useAsync from '@hooks/useAsync';

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .required('Code is required')
    .matches(/^[0-9]{6}$/, 'Invalid code')
    .label('Code'),
});

const Verify = () => {
  const { verify } = useVerifyOtp();
  const { data, previous, next } = useStep<any>();
  const [async, { loading, error }] = useAsync(verify, {
    onCompleted: (res: any) => next({ ...data, ...res }),
  });

  const handleSubmit = async (values: typeof data) => {
    await async({ email: data.email, code: values.code });
  };

  return (
    <React.Fragment>
      <Formik
        onSubmit={handleSubmit}
        initialValues={data}
        validationSchema={validationSchema}
      >
        {() => {
          return (
            <Form>
              <FormField
                mt={20}
                name={'code'}
              >
                <Label>Code</Label>
                <FormField.Sheet>
                  <TextField
                    autoComplete={'one-time-code webauthn'}
                    placeholder={'Enter the six digit code'}
                  />
                </FormField.Sheet>
                <FormField.Message />
              </FormField>

              <Button
                mt={16}
                type={'submit'}
                disabled={loading}
              >
                <Button.Loader visible={loading} />
                Verify Code
              </Button>

              <Button
                mt={8}
                type={'submit'}
                color={'gray-40'}
                disabled={loading}
                borderColor={'gray-90'}
                onClick={() => previous(data)}
                backgroundColor={'transparent'}
                _hover={{
                  color: 'gray-10',
                  backgroundColor: 'gray-100',
                }}
              >
                Retry
              </Button>
            </Form>
          );
        }}
      </Formik>

      <Alert
        mt={20}
        visible={error !== undefined}
      >
        <Alert.Icon />
        <Alert.Message css={{ flex: 1 }}>{error?.message}</Alert.Message>
      </Alert>
    </React.Fragment>
  );
};

export default Verify;
