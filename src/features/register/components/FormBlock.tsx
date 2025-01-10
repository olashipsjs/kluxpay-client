import React from 'react';
import { Form, Formik } from 'formik';
import FormField from '@components/formfield/FormField';
import TextField from '@components/base/textfield/TextField';
import useStep from 'src/hooks/useStep';
import Button from '@components/base/button/Button';
import Label from '@components/base/label/Label';
import Grid from '@components/base/grid/Grid';
import { otherValidationSchema } from '../schemas/validationSchema';
import Box from '@components/base/box/Box';

const FormBlock = () => {
  const { data, next } = useStep<any>();

  const handleSubmit = (values: typeof data) => {
    next({ ...data, ...values });
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={data}
        onSubmit={handleSubmit}
        validationSchema={otherValidationSchema}
      >
        {() => {
          return (
            <Form>
              <Box
                notLastChild={{
                  mb: 16,
                }}
              >
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

                <FormField name={'email'}>
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

                <FormField name={'password'}>
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

                <Button type={'submit'}>Proceed</Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default FormBlock;
