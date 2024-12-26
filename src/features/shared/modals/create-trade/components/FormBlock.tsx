import * as Yup from 'yup';
import useStep from '@hooks/useStep';
import { Form, Formik } from 'formik';
import Alert from '@components/alert/Alert';
import { CREATE_TRADE } from '@graphql/trade';
import Label from '@components/base/label/Label';
import Button from '@components/base/button/Button';
import FormField from '@components/formfield/FormField';
import useApolloMutation from '@hooks/useApolloMutation';
import TextField from '@components/base/textfield/TextField';
import toNumber from '@utils/toNumber';
import Box from '@components/base/box/Box';
import Text from '@components/base/text/Text';
import useTrades from '@hooks/useTrades';
import useWallet from '@hooks/useWallet';

const validationSchema = Yup.object().shape({
  amount: Yup.string().required('Enter an amount'),
});

const FormBlock = () => {
  const { wallet } = useWallet();
  const { setTrades } = useTrades();
  const { data, next } = useStep<any>();
  const [createTrade, { loading, error }] = useApolloMutation(CREATE_TRADE, {
    onCompleted: (data) => {
      console.log({ data });
      if (data && data.createTrade) {
        setTrades({ type: 'ADD_TRADE', payload: { trade: data.createTrade } });
        next(data?.createTrade);
      }
    },
  });

  const handleSubmit = async (values: typeof data) => {
    await createTrade({
      variables: {
        payload: {
          ...values,
          amount: toNumber(values.amount),
        },
      },
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
