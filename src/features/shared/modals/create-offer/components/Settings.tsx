import ButtonField from '@components/button-field/ButtonField';
import Button from '@components/base/button/Button';
import Divider from '@components/divider/Divider';
import Flex from '@components/base/flex/Flex';
import FormField from '@components/formfield/FormField';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import Textarea from '@components/base/textarea/Textarea';
import TextField from '@components/base/textfield/TextField';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import Label from '@components/base/label/Label';
import useStep from '@hooks/useStep';
import SelectCoin from '@components/shared/SelectCoin';
import SelectFiat from '@components/shared/SelectFiat';
import Box from '@components/base/box/Box';
import CoinPrice from '@components/shared/CoinPrice';
import marginPrice from '@utils/marginPrice';
import AssetBalance from '@components/shared/AssetBalance';
import coins from '@constants/coins';
import formatDecimal from '@utils/formatDecimal';
import currencySymbol from '@utils/currencySymbol';

const Settings = () => {
  const { data, next, previous } = useStep<any>();

  const validationSchema = Yup.object().shape({
    amount: Yup.string().required('Enter an amount.'),
    priceMargin: Yup.string().required('Enter price margin.'),
    coinId: Yup.string().required('Select a coin.'),
    fiat: Yup.string().required('Select a fiat currency.'),
    timeout: Yup.number().required('Please select duration.'),
    minLimit: Yup.string().required('Enter minimum limit.'),
    maxLimit: Yup.string().required('Enter maximum limit.'),
    notes: Yup.string()
      .required('Enter trade notes.')
      .max(250, 'Too much words used.'),
  });

  const handleSubmit = (values: any) => {
    next(values);
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={data}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values }) => {
          const selectedCoin = coins.find((coin) => coin.id === values.coinId)!;

          return (
            <Form>
              <Box
                px={20}
                notLastChild={{ mb: 12 }}
              >
                <SelectCoin name={'coinId'} />
                <SelectFiat name={'fiat'} />
              </Box>

              <Divider
                my={20}
                borderTop={1}
                borderTopColor={'gray-90'}
              />

              <Flex
                px={20}
                flexDirection={'column'}
              >
                <Heading
                  fontSize={16}
                  letterSpacing={'xs'}
                  fontWeight={'regular'}
                >
                  Price settings
                </Heading>

                <Text
                  mt={6}
                  as={'p'}
                  fontSize={13}
                  color={'gray-40'}
                  lineHeight={'lg'}
                >
                  Margin adjusts the trade price based on a percentage of the
                  market rate e.g. 2% increases the price above the market rate
                </Text>

                <Flex
                  mt={12}
                  gap={8}
                >
                  <FormField name={'priceMargin'}>
                    <Label>Margin</Label>
                    <FormField.Sheet>
                      <TextField
                        type={'number'}
                        placeholder={'Enter a value'}
                      />
                    </FormField.Sheet>

                    <CoinPrice
                      fiat={values.fiat}
                      coinId={values.coinId}
                    >
                      {({ price }) => {
                        return (
                          <FormField.Message>
                            {`${currencySymbol(values.fiat)} ${marginPrice(
                              price,
                              Number(values.priceMargin)
                            )}`}
                          </FormField.Message>
                        );
                      }}
                    </CoinPrice>
                  </FormField>
                  <FormField name={'amount'}>
                    <Label>Total quantity</Label>
                    <FormField.Sheet>
                      <TextField
                        type={'number'}
                        placeholder={'Enter an amount'}
                      />
                    </FormField.Sheet>
                    <AssetBalance coinId={values.coinId}>
                      {({ balance }) => {
                        return (
                          <FormField.Message>
                            {`Balance: ${formatDecimal(
                              balance
                            )} ${selectedCoin.symbol.toUpperCase()}`}
                          </FormField.Message>
                        );
                      }}
                    </AssetBalance>
                  </FormField>
                </Flex>
              </Flex>

              <Divider
                my={20}
                borderTop={1}
                borderTopColor={'gray-90'}
              />

              <Box px={20}>
                <Heading
                  fontSize={16}
                  fontWeight={'regular'}
                  letterSpacing={'xs'}
                >
                  Duration
                </Heading>
                <Text
                  as={'p'}
                  mt={6}
                  fontSize={13}
                >
                  The trade automatically closes after the chosen duration is
                  exceeded
                </Text>
                <FormField
                  mt={12}
                  name={'timeout'}
                >
                  <Flex gap={8}>
                    <ButtonField value={15}>15 mins</ButtonField>
                    <ButtonField value={30}>30 mins</ButtonField>
                  </Flex>
                </FormField>
              </Box>

              <Divider
                my={20}
                borderTop={1}
                borderTopColor={'gray-90'}
              />

              <Box px={20}>
                <Heading
                  fontSize={16}
                  letterSpacing={'xs'}
                  fontWeight={'regular'}
                >
                  Transaction limits
                </Heading>

                <Flex
                  mt={12}
                  gap={8}
                >
                  <FormField name={'minLimit'}>
                    <Label>Minimum</Label>
                    <FormField.Sheet>
                      <TextField
                        type={'number'}
                        placeholder={'e.g 3,250'}
                      />
                    </FormField.Sheet>
                    <FormField.Message />
                  </FormField>
                  <FormField name={'maxLimit'}>
                    <Label>Maximum</Label>
                    <FormField.Sheet>
                      <TextField
                        type={'number'}
                        placeholder={'e.g 400,520'}
                      />
                    </FormField.Sheet>
                    <FormField.Message />
                  </FormField>
                </Flex>
              </Box>

              <Divider
                my={20}
                borderTop={1}
                borderTopColor={'gray-90'}
              />

              <Box px={20}>
                <Heading
                  fontSize={16}
                  letterSpacing={'xs'}
                  fontWeight={'regular'}
                >
                  Notes
                </Heading>

                <Text
                  as={'p'}
                  mt={6}
                  fontSize={13}
                >
                  Use this as a description to guide users through the process
                </Text>

                <FormField
                  mt={12}
                  name={'notes'}
                >
                  <FormField.Sheet>
                    <Textarea
                      rows={5}
                      placeholder={'Leave trade notes'}
                    />
                  </FormField.Sheet>
                  <FormField.Message />
                </FormField>
              </Box>

              <Divider
                my={20}
                backgroundColor={'gray-90'}
              />

              <Flex
                px={20}
                gap={8}
                left={'0px'}
                bottom={'0px'}
                position={'sticky'}
                backgroundColor={'white'}
              >
                <Button
                  color={'gray-50'}
                  borderColor={'gray-90'}
                  onClick={() => previous(values)}
                  backgroundColor={'transparent'}
                  _hover={{
                    color: 'gray-10',
                    backgroundColor: 'gray-100',
                  }}
                >
                  Type
                </Button>
                <Button type={'submit'}>Payment</Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default Settings;
