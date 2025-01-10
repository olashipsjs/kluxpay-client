import * as Yup from 'yup';
import useStep from '@hooks/useStep';
import { Form, Formik } from 'formik';
import toNumber from '@utils/toNumber';
import useWallets from '@hooks/useWallets';
import Box from '@components/base/box/Box';
import Alert from '@components/alert/Alert';
import { SEND_TOKEN } from '@graphql/token';
import Label from '@components/base/label/Label';
import Button from '@components/base/button/Button';
import FormField from '@components/formfield/FormField';
import useApolloMutation from '@hooks/useApolloMutation';
import TextField from '@components/base/textfield/TextField';
import GasEstimate from '@components/shared/crypto/GasEstimate';
import Text from '@components/base/text/Text';
import Flex from '@components/base/flex/Flex';
import Iconify from '@components/base/iconify/Iconify';
import formatDecimal from '@utils/formatDecimal';
import useUser from '@hooks/useUser';
import CryptoPrice from '@components/shared/crypto/CryptoPrice';
import Heading from '@components/base/heading/Heading';

const validationSchema = Yup.object().shape({
  to: Yup.string().required('Recipient address is required'),
  amount: Yup.string().required('Amount is required'),
});

const FormBlock = () => {
  const { user } = useUser();
  const { wallet, token } = useWallets();

  const { data, next } = useStep<any>();
  const [sendToken, { loading, error }] = useApolloMutation(SEND_TOKEN, {
    onCompleted: (data) => {
      if (data && data.sendToken) {
        next(data);
      }
    },
  });

  const handleSubmit = async (values: any) => {
    await sendToken({
      variables: {
        ...values,
        walletId: wallet?._id || '',
        amount: toNumber(values.amount),
        contractAddress: token.platform?.token_address,
      },
    });
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values }) => {
        return (
          <Form
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box p={16}>
              <FormField name={'to'}>
                <Label>Recipient address</Label>
                <FormField.Sheet>
                  <TextField placeholder='Recipient wallet address' />
                </FormField.Sheet>
                <FormField.Message />
              </FormField>

              <FormField
                mt={12}
                name={'amount'}
              >
                <Label>Amount</Label>
                <FormField.Sheet>
                  <TextField
                    type={'number'}
                    placeholder={`${token.symbol} amount`}
                  />
                </FormField.Sheet>
                <FormField.Message />
              </FormField>
            </Box>

            <Box p={16}>
              <Alert
                mb={12}
                visible={error !== undefined}
              >
                <Alert.Message>{error?.message}</Alert.Message>
              </Alert>

              <Box
                py={8}
                px={12}
                mb={12}
                rounded={8}
                backgroundColor={'indigo-100'}
              >
                <GasEstimate
                  to={values.to}
                  value={String(toNumber(values.amount || '0'))}
                >
                  {({ gas }) => {
                    return (
                      <Flex
                        gap={8}
                        alignItems={'center'}
                      >
                        <Iconify
                          width={20}
                          icon={'fluent:gas-pump-24-regular'}
                        />
                        <Box>
                          <Heading fontSize={13}>Gas fee</Heading>
                          <CryptoPrice coinId={1027}>
                            {({ data }) => {
                              const PRICE =
                                data.quote[user?.fiat.symbol || 'USD'].price ||
                                0;

                              return (
                                <Text
                                  fontSize={13}
                                  lineHeight={'1'}
                                >{`${formatDecimal(gas.cost, {
                                  minFraction: 2,
                                  maxFraction: 5,
                                })} ETH = ${user?.fiat.sign}${formatDecimal(
                                  PRICE * gas.cost
                                )}`}</Text>
                              );
                            }}
                          </CryptoPrice>
                        </Box>
                      </Flex>
                    );
                  }}
                </GasEstimate>
              </Box>

              <Button
                type={'submit'}
                disabled={loading}
              >
                <Button.Loader visible={loading} />
                Send
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormBlock;
