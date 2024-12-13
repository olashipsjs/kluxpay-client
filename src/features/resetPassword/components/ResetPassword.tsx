import * as Yup from 'yup';
import React from 'react';
import { Form, Formik } from 'formik';
import useStep from 'src/hooks/useStep';
import Label from '@components/base/label/Label';
import Button from '@components/base/button/Button';
import { RESET_PASSWORD } from 'src/graphql/auth';
import FormField from '@components/formfield/FormField';
import TextField from '@components/base/textfield/TextField';
import Alert from '@components/alert/Alert';
import useApolloMutation from '@hooks/useApolloMutation';

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
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

const ResetPassword = () => {
  const { setData, next, data } = useStep<any>();
  const [resetPassword, { loading, error }] = useApolloMutation(
    RESET_PASSWORD,
    { onCompleted: () => next(data) }
  );

  const handleSubmit = async (values: typeof data) => {
    setData(values);

    await resetPassword({
      variables: {
        payload: {
          email: values.email,
          newPassword: values.newPassword,
        },
      },
    });
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
                mt={24}
                name={'newPassword'}
              >
                <Label>New password</Label>
                <FormField.Sheet>
                  <TextField.Password
                    placeholder='Enter new password'
                    autoComplete={'new-password webauthn'}
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
                Reset Password
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

export default ResetPassword;
