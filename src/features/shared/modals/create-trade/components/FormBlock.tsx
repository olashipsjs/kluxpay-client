import * as Yup from 'yup';
import useStep from '@hooks/useStep';
import { Form, Formik } from 'formik';
import Alert from '@components/alert/Alert';
import Label from '@components/base/label/Label';
import Button from '@components/base/button/Button';
import FormField from '@components/formfield/FormField';
import TextField from '@components/base/textfield/TextField';
import Box from '@components/base/box/Box';
import Text from '@components/base/text/Text';
import useTrades from '@hooks/useTrades';
import useWallets from '@hooks/useWallets';
import useAsync from '@hooks/useAsync';
import useCreateTrade from '../hooks/useCreateTrade';
import toNumber from '@utils/toNumber';

const validationSchema = Yup.object().shape({
  amount: Yup.string().required('Enter an amount'),
});

const FormBlock = () => {
  const { wallet } = useWallets();
  const { setTrades } = useTrades();
  const { data, next } = useStep<any>();
  const { createTrade } = useCreateTrade();
  const [async, { loading, error }] = useAsync(createTrade, {
    onCompleted: (data: any) => {
      setTrades({ type: 'ADD_TRADE', payload: { trade: data.createTrade } });
      next(data?.createTrade);
    },
  });

  const handleSubmit = async (values: typeof data) => {
    await async({
      ...values,
      amount: parseFloat(toNumber(values.amount || '0').toString()),
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
            <FormField name={'amount'}>
              <Label textAlign={'center'}> Amount</Label>
              <TextField
                fontSize={24}
                type={'number'}
                textAlign={'center'}
                placeholder={'Enter an amount'}
              />
              <FormField.Message textAlign={'center'} />
            </FormField>

            <Box
              py={6}
              mt={24}
              px={12}
              rounded={8}
              backgroundColor={'indigo-95'}
            >
              <Text
                as={'p'}
                fontSize={13}
                color={'gray-10'}
                textAlign={'center'}
                fontWeight={'semibold'}
              >
                {wallet?.publicKey}
              </Text>
            </Box>

            <Box mt={4}>
              <Text
                as={'p'}
                fontSize={13}
                textAlign={'center'}
              >
                The wallet will be used for transactions to update this close
                the modal and change your current wallet.
              </Text>
            </Box>

            <Button
              mt={24}
              type={'submit'}
              disabled={loading}
            >
              <Button.Loader visible={loading} />
              Confirm
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
