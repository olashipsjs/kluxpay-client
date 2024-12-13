import React from 'react';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
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
import Divider from '@components/divider/Divider';
import useApolloMutation from '@hooks/useApolloMutation';
import { CREATE_PAYMENT } from '@graphql/payment';
import usePayments from '@hooks/usePayments';

const validationSchema = Yup.object().shape({
  method: Yup.string().required('Select an option'),
  details: Yup.string().max(200, 'Too much characters'),
  bankName: Yup.string().required('Enter a bank name'),
  bankAccountName: Yup.string().required('Enter account name'),
  bankAccountNumber: Yup.string().required('Enter account number'),
});

const FormBlock = () => {
  const { setPayments } = usePayments();
  const { data, next, setData } = useStep<any>();
  const [createPayment, { loading, error }] = useApolloMutation(
    CREATE_PAYMENT,
    {
      onCompleted: (data) => {
        setPayments({
          type: 'UPDATE_PAYMENT',
          payload: { payment: data?.createPayment },
        });
        next(data);
      },
    }
  );

  const handleSubmit = async (values: typeof data) => {
    setData(values);

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
      <Heading
        mb={32}
        as={'h2'}
      >
        Payment method
      </Heading>

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

          <FormField
            mt={20}
            name={'bankName'}
          >
            <Label>Bank Name</Label>
            <FormField.Sheet>
              <TextField placeholder={'Name e.g Ecobank'} />
            </FormField.Sheet>
            <FormField.Message />
          </FormField>

          <Divider
            my={20}
            height={'1px'}
            backgroundColor={'gray-90'}
          />

          <Heading
            fontSize={14}
            letterSpacing={'xs'}
          >
            Bank Information
          </Heading>
          <Flex
            mt={8}
            gap={8}
          >
            <FormField name={'bankAccountName'}>
              <FormField.Sheet>
                <TextField placeholder={'Name e.g Mark'} />
              </FormField.Sheet>
              <FormField.Message />
            </FormField>
            <FormField name={'bankAccountNumber'}>
              <FormField.Sheet>
                <TextField placeholder={'Number e.g ***567'} />
              </FormField.Sheet>
              <FormField.Message />
            </FormField>
          </Flex>

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
