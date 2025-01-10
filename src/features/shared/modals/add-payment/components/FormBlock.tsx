import React from 'react';
import Button from '@components/base/button/Button';
import FormField from '@components/formfield/FormField';
import Label from '@components/base/label/Label';
import Select from '@components/select/Select';
import TextField from '@components/base/textfield/TextField';
import { Form, Formik } from 'formik';
import paymentMethods from 'src/constants/paymentMethods';
import Textarea from '@components/base/textarea/Textarea';
import Alert from '@components/alert/Alert';
import useStep from 'src/hooks/useStep';
import Heading from '@components/base/heading/Heading';
import useApolloMutation from '@hooks/useApolloMutation';
import { CREATE_PAYMENT, UPDATE_PAYMENT } from '@graphql/payment';
import usePayments from '@hooks/usePayments';
import Grid from '@components/base/grid/Grid';
import { validationSchema } from '../schema/validationSchema';
import Box from '@components/base/box/Box';

const FormBlock = ({ id }: { id?: string }) => {
  const { setPayments } = usePayments();
  const { data, next } = useStep<any>();
  const [mutation, { loading, error }] = useApolloMutation(
    id ? UPDATE_PAYMENT : CREATE_PAYMENT,
    {
      onCompleted: (res: any) => {
        if (id) {
          setPayments({
            type: 'UPDATE_PAYMENT',
            payload: { payment: res?.updatePayment },
          });
        } else {
          setPayments({
            type: 'ADD_PAYMENT',
            payload: { payment: res?.createPayment },
          });
        }
        next(data);
      },
    }
  );

  const handleSubmit = async (values: typeof data) => {
    const variables = id
      ? {
          paymentId: id,
          method: values.method,
          details: values.details,
          bankName: values.bankName,
          bankAccountName: values.bankAccountName,
          bankAccountNumber: values.bankAccountNumber,
        }
      : {
          method: values.method,
          details: values.details,
          bankName: values.bankName,
          bankAccountName: values.bankAccountName,
          bankAccountNumber: values.bankAccountNumber,
        };

    await mutation({
      variables,
    });
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={data}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <Box notLastChild={{ mb: 16 }}>
            <FormField name={'method'}>
              <Label>Method</Label>
              <FormField.Sheet>
                <Select defaultValue={paymentMethods[0].name}>
                  <Select.Trigger>
                    <Select.Value />
                  </Select.Trigger>
                  <Select.Content height={'200px'}>
                    {paymentMethods.map((method) => {
                      return (
                        <Select.Option
                          key={method.name}
                          value={method.name}
                        >
                          {method.name}
                        </Select.Option>
                      );
                    })}
                  </Select.Content>
                </Select>
              </FormField.Sheet>
              <FormField.Message />
            </FormField>

            <Grid
              gap={8}
              gridTemplateColumns={'1fr 1fr 1fr'}
            >
              <Heading fontSize={14}>Bank Details</Heading>
              <FormField
                gridColumn={3}
                name={'bankName'}
              >
                <FormField.Sheet>
                  <TextField placeholder={'Ecobank'} />
                </FormField.Sheet>
                <FormField.Message />
              </FormField>
              <FormField
                gridColumn={2}
                name={'bankAccountName'}
              >
                <FormField.Sheet>
                  <TextField placeholder={'Mark'} />
                </FormField.Sheet>
                <FormField.Message />
              </FormField>
              <FormField name={'bankAccountNumber'}>
                <FormField.Sheet>
                  <TextField placeholder={'***567'} />
                </FormField.Sheet>
                <FormField.Message />
              </FormField>
            </Grid>

            <FormField name={'details'}>
              <Label>Details</Label>
              <FormField.Sheet>
                <Textarea
                  rows={4}
                  placeholder={'Enter payment details'}
                />
              </FormField.Sheet>
              <FormField.Message />
            </FormField>

            <Button
              type={'submit'}
              disabled={loading}
            >
              <Button.Loader visible={loading} />
              {id ? 'Update' : 'Create'} Payment
            </Button>

            <Alert visible={error !== undefined}>
              <Alert.Icon />
              <Alert.Message css={{ flex: 1 }}>{error?.message}</Alert.Message>
            </Alert>
          </Box>
        </Form>
      </Formik>
    </React.Fragment>
  );
};

export default FormBlock;
