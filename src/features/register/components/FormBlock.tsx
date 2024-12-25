import React from 'react';
import { Form, Formik } from 'formik';
import FormField from '@components/formfield/FormField';
import TextField from '@components/base/textfield/TextField';
import useStep from 'src/hooks/useStep';
import * as Yup from 'yup';
import Button from '@components/base/button/Button';
import Label from '@components/base/label/Label';
import Grid from '@components/base/grid/Grid';
import Loader from '@components/base/button/Loader';
import Alert from '@components/alert/Alert';
import useRegister from '../hooks/useRegister';
import useAsync from '@hooks/useAsync';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Tell us your first name'),
  lastName: Yup.string().required('Tell us your last name'),
  dateOfBirth: Yup.string().required('Tell us your date of birth'),
  email: Yup.string()
    .required('Tell us your email address')
    .matches(
      /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim,
      'Invalid email address'
    ),
  password: Yup.string()
    .required('Please enter your password')
    .min(8, 'Must be at least 8 characters long')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Must contain at least one digit')
    .matches(
      /[@$!%*?&#.:()+_-]/,
      'Must contain at least one special character'
    ),
});

const FormBlock = () => {
  const { mutation } = useRegister();
  const { data, next } = useStep<any>();
  const [async, { loading, error }] = useAsync(mutation, {
    onCompleted: (res: typeof data) => next(res),
  });

  const handleSubmit = async (values: typeof data) => {
    await async(values);
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
              <Grid
                gap={8}
                gridTemplateColumns={{ initial: '1fr', sm: '1fr 1fr' }}
              >
                <FormField name={'firstName'}>
                  <Label>First name</Label>
                  <FormField.Sheet>
                    <TextField
                      placeholder={'e.g Mary'}
                      autoComplete={'given-name webauthn'}
                    />
                  </FormField.Sheet>
                  <FormField.Message />
                </FormField>

                <FormField name={'lastName'}>
                  <Label>Last name</Label>
                  <FormField.Sheet>
                    <TextField
                      placeholder={'e.g Hugo'}
                      autoComplete={'family-name webauthn'}
                    />
                  </FormField.Sheet>
                  <FormField.Message />
                </FormField>
              </Grid>

              <FormField
                mt={20}
                name={'dateOfBirth'}
              >
                <Label>Date of birth</Label>
                <FormField.Sheet>
                  <TextField
                    type={'date'}
                    name={'dateOfBirth'}
                    autoComplete={'bday-day webauthn'}
                  />
                </FormField.Sheet>
                <FormField.Message />
              </FormField>

              <FormField
                mt={20}
                name={'email'}
              >
                <Label>Email</Label>
                <FormField.Sheet>
                  <TextField
                    type={'email'}
                    name={'email'}
                    autoComplete={'username webauthn'}
                    placeholder={'e.g abc@abcinc.com'}
                  />
                </FormField.Sheet>
                <FormField.Message />
              </FormField>

              <FormField
                mt={20}
                name={'password'}
              >
                <Label htmlFor='password'>Password</Label>
                <FormField.Sheet>
                  <TextField.Password
                    name={'password'}
                    placeholder={'Use a strong password'}
                    autoComplete={'new-password webauthn'}
                  />
                </FormField.Sheet>
                <FormField.Message />
              </FormField>

              <Button
                mt={20}
                type={'submit'}
                disabled={loading}
              >
                <Loader visible={loading} />
                Register
              </Button>

              <Alert
                mt={12}
                visible={error !== undefined}
              >
                <Alert.Icon />
                <Alert.Message css={{ flex: 1 }}>
                  {error?.message}
                </Alert.Message>
              </Alert>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default FormBlock;
