import * as Yup from 'yup';
import Header from './Header';
import { Form, Formik } from 'formik';
import useStep from '@hooks/useStep';
import toNumber from '@utils/toNumber';
import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Text from '@components/base/text/Text';
import formatDecimal from '@utils/formatDecimal';
import Button from '@components/base/button/Button';
import Heading from '@components/base/heading/Heading';
import FormField from '@components/formfield/FormField';
import TextField from '@components/base/textfield/TextField';

const validationSchema = Yup.object().shape({
  margin: Yup.string()
    .required('Enter margin price')
    .test('isNumber', 'Margin value must between 0 and 100', (value) => {
      const cleanedValue = toNumber(value);

      return cleanedValue >= 0 && cleanedValue <= 100;
    }),
});

const Margin = () => {
  const { data, next } = useStep<any>();

  const handleSubmit = (values: typeof data) => {
    next({ ...data, ...values });
  };

  const PRICE = data.coin.quote[data.fiat.symbol]?.price;
  const FORMATTED_PRICE = formatDecimal(PRICE || 0);

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values }) => {
        const PERCENTAGE = toNumber(values.margin || '0') / 100;
        const PERCENTAGE_AMOUNT = toNumber(values.minLimit) * PERCENTAGE;

        const MARGIN_PRICE =
          values.type === 'buy'
            ? toNumber(values.minLimit) - PERCENTAGE_AMOUNT
            : toNumber(values.minLimit) + PERCENTAGE_AMOUNT;

        return (
          <Form>
            <Flex
              minHeight={'60vh'}
              flexDirection={'column'}
            >
              <Header data={values} />

              <Box
                p={16}
                css={{ flex: 1 }}
                notLastChild={{ mb: 24 }}
              >
                <Heading fontSize={21}>Price margin</Heading>

                <FormField name={'margin'}>
                  <FormField.Sheet>
                    <TextField
                      type={'number'}
                      placeholder={'e.g 10%'}
                    />
                  </FormField.Sheet>
                  <FormField.Message>
                    Enter a percentage value e.g 0 - 100
                  </FormField.Message>
                </FormField>
              </Box>

              <Box
                p={16}
                notLastChild={{ mb: 12 }}
              >
                <Box
                  p={10}
                  rounded={8}
                  backgroundColor={'orange-100'}
                >
                  <Heading
                    fontSize={14}
                    color={'orange-20'}
                  >
                    What is price margin?
                  </Heading>

                  <Heading
                    mt={4}
                    as={'h4'}
                    fontSize={12}
                    fontWeight={'semibold'}
                    color={'orange-40'}
                  >
                    1 {data.coin.name} = {FORMATTED_PRICE} {data.fiat.symbol}
                  </Heading>

                  <Text
                    mt={6}
                    as={'p'}
                    fontSize={13}
                    color={'orange-30'}
                    lineHeight={'1.36'}
                  >
                    So for every{' '}
                    <Text
                      as={'b'}
                      fontWeight={'semibold'}
                    >
                      {data.minLimit}
                      {data.fiat.symbol}
                    </Text>
                    . You will {data.type === 'sell' ? 'receive' : 'pay'}{' '}
                    <Text
                      as={'b'}
                      fontWeight={'semibold'}
                    >
                      {formatDecimal(MARGIN_PRICE, {
                        maxFraction: 6,
                        minFraction: 2,
                      })}
                      {data.fiat.symbol}
                    </Text>{' '}
                    of <Text fontWeight={'semibold'}>{data.coin.name}</Text> in
                    return.
                    <Text
                      as={'b'}
                      fontSize={13}
                    ></Text>
                  </Text>
                </Box>

                <Button type={'submit'}>Next</Button>
              </Box>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Margin;
