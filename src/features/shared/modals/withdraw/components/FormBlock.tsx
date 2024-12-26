import Alert from '@components/alert/Alert';
import Button from '@components/base/button/Button';
import Label from '@components/base/label/Label';
import TextField from '@components/base/textfield/TextField';
import FormField from '@components/formfield/FormField';
import { SEND_TOKEN } from '@graphql/wallet';
import useApolloMutation from '@hooks/useApolloMutation';
import useStep from '@hooks/useStep';
import toNumber from '@utils/toNumber';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  to: Yup.string().required('Recipient address is required'),
  amount: Yup.number().required('Amount is required'),
});

const FormBlock = () => {
  const { data, next } = useStep<any>();
  const [sendToken, { loading, error }] = useApolloMutation(SEND_TOKEN, {
    onCompleted: (data) => {
      next(data);
    },
  });

  const handleSubmit = async (values: any) => {
    await sendToken({
      variables: { payload: { ...values, amount: toNumber(values.amount) } },
    });
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {() => {
        return (
          <Form>
            <FormField name={'to'}>
              <FormField.Sheet
                ps={12}
                alignItems={'center'}
              >
                <Label>To</Label>
                <TextField
                  textAlign={'right'}
                  placeholder='Recipient wallet address'
                />
              </FormField.Sheet>
              <FormField.Message />
            </FormField>

            <FormField
              mt={16}
              name={'amount'}
            >
              <FormField.Sheet
                ps={12}
                alignItems={'center'}
              >
                <Label>Amount</Label>
                <TextField
                  type={'number'}
                  textAlign={'right'}
                  placeholder={'The amount of token you want to send'}
                />
              </FormField.Sheet>
              <FormField.Message />
            </FormField>

            <Button
              mt={24}
              type={'submit'}
              disabled={loading}
            >
              <Button.Loader visible={loading} />
              Send
            </Button>

            <Alert
              mt={12}
              visible={error !== undefined}
            >
              <Alert.Message>{error?.message}</Alert.Message>
            </Alert>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormBlock;
