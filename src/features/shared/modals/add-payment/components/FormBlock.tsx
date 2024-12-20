import React from 'react';
import Button from '@components/base/button/Button';
import FormField from '@components/formfield/FormField';
import Label from '@components/base/label/Label';
import Select from '@components/select/Select';
import TextField from '@components/base/textfield/TextField';
import { Form, Formik } from 'formik';
import paymentMethods from 'src/constants/paymentMethods';
import Textarea from '@components/base/textarea/Textarea';
import * as Yup from 'yup';
import Alert from '@components/alert/Alert';
import useStep from 'src/hooks/useStep';
import Heading from '@components/base/heading/Heading';
import useApolloMutation from '@hooks/useApolloMutation';
import { CREATE_PAYMENT } from '@graphql/payment';
import usePayments from '@hooks/usePayments';
import Grid from '@components/base/grid/Grid';

const validationSchema = Yup.object().shape({
  method: Yup.string().required('Select an option'),
  details: Yup.string().max(200, 'Too much characters'),
  bankName: Yup.string().required('Bank name'),
  bankAccountName: Yup.string().required('Account name'),
  bankAccountNumber: Yup.string().required('Account number'),
});

const FormBlock = () => {
  const { setPayments } = usePayments();
  const { data, next } = useStep<any>();
  const [createPayment, { loading, error }] = useApolloMutation(
    CREATE_PAYMENT,
    {
      onCompleted: (res: any) => {
        setPayments({
          type: 'ADD_PAYMENT',
          payload: { payment: res?.createPayment },
        });
        next(data);
      },
    }
  );

  const handleSubmit = async (values: typeof data) => {
    await createPayment({
      variables: {
        payload: {
          method: values.method,
          details: values.details,
          bankName: values.bankName,
          bankAccountName: values.bankAccountName,
          bankAccountNumber: values.bankAccountNumber,
        },
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
        <Form>
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
            mt={20}
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

          <FormField
            mt={20}
            name={'details'}
          >
            <Label>Details</Label>
            <FormField.Sheet>
              <Textarea
                rows={4}
                placeholder={'Enter payment details'}
              />
            </FormField.Sheet>
            <FormField.Message />
          </FormField>

          <Alert
            mt={20}
            visible={error !== undefined}
          >
            <Alert.Icon />
            <Alert.Message css={{ flex: 1 }}>{error?.message}</Alert.Message>
          </Alert>

          <Button
            mt={24}
            type={'submit'}
            disabled={loading}
          >
            <Button.Loader visible={loading} />
            Create Payment
          </Button>
        </Form>
      </Formik>
    </React.Fragment>
  );
};

export default FormBlock;
