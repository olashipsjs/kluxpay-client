import Alert from '@components/alert/Alert';
import Badge from '@components/badge/Badge';
import ButtonField from '@components/button-field/ButtonField';
import Button from '@components/base/button/Button';
import Loader from '@components/base/button/Loader';
import Divider from '@components/divider/Divider';
import Flex from '@components/base/flex/Flex';
import FormField from '@components/formfield/FormField';
import Heading from '@components/base/heading/Heading';
import Image from '@components/base/image/Image';
import Label from '@components/base/label/Label';
import Select from '@components/select/Select';
import Text from '@components/base/text/Text';
import Textarea from '@components/base/textarea/Textarea';
import TextField from '@components/base/textfield/TextField';
import { Form, Formik } from 'formik';
import React from 'react';
import coins from 'src/constants/coins';
import useGetAssetBalance from 'src/hooks/useGetAssetBalance';
import useGetCoinPrice from 'src/hooks/useGetCoinPrice';
import useGetCurrencies from 'src/hooks/useGetCurrencies';
import useStep from 'src/hooks/useStep';
import * as Yup from 'yup';
import number from 'src/utils/number';

const Coin = React.memo(() => {
  return (
    <FormField name='coinId'>
      {({ field }) => {
        const selectedOption = coins.find((coin) => coin.id === field.value);

        return (
          <React.Fragment>
            <Label>Coins</Label>
            <FormField.Sheet>
              <Select defaultValue={coins[0].id}>
                <Select.Trigger
                  color={'gray-30'}
                  textTransform={'uppercase'}
                >
                  <Image
                    size={'18px'}
                    src={selectedOption?.image}
                  />
                  <Text
                    css={{ flex: 1 }}
                    textAlign={'left'}
                  >
                    {selectedOption?.symbol}
                  </Text>
                </Select.Trigger>
                <Select.Content>
                  {coins.map((coin) => {
                    return (
                      <Select.Option
                        key={coin.id}
                        value={coin.id}
                      >
                        <Image
                          size={'20px'}
                          rounded={'full'}
                          src={coin.image}
                        />
                        {coin.name}
                      </Select.Option>
                    );
                  })}
                </Select.Content>
              </Select>
            </FormField.Sheet>
            <FormField.Message />
          </React.Fragment>
        );
      }}
    </FormField>
  );
});

const Fiat = React.memo(() => {
  const { currencies, error, isLoading } = useGetCurrencies();

  return (
    <FormField name='fiat'>
      <Label>Fiat</Label>
      <FormField.Sheet>
        <Select>
          <Select.Trigger
            color={'gray-30'}
            textTransform={'uppercase'}
          >
            <Select.Value />
          </Select.Trigger>
          <Select.Content
            height={'200px'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Loader
              width={'3em'}
              color={'indigo-60'}
              visible={isLoading}
            />

            <Alert
              timeout={undefined}
              visible={error !== null}
            >
              <Alert.Message>Error</Alert.Message>
            </Alert>
            <Flex
              width={'full'}
              height={'full'}
              flexDirection={'column'}
            >
              {currencies
                ? currencies.map((currency: string) => {
                    return (
                      <Select.Option
                        fontSize={13}
                        key={currency}
                        value={currency}
                        fontWeight={'medium'}
                        textTransform={'uppercase'}
                      >
                        <Badge
                          size={'8px'}
                          color={'white'}
                          rounded={'full'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          backgroundColor={'green-60'}
                        />
                        {currency}
                      </Select.Option>
                    );
                  })
                : null}
            </Flex>
          </Select.Content>
        </Select>
      </FormField.Sheet>
      <FormField.Message />
    </FormField>
  );
});

const Margin = React.memo(
  ({ coinId, fiat }: { coinId: string; fiat: string }) => {
    const { price, isLoading, error } = useGetCoinPrice(coinId, fiat);
    const selectedCoin = coins.find((coin) => coin.id === coinId);

    return (
      <FormField name={'priceMargin'}>
        {({ field }) => {
          const percentage =
            (price / 100) * ((field.value as number) || 0) || 0;
          const realPrice = percentage + price || 0;

          return (
            <React.Fragment>
              <Label>Margin</Label>
              <FormField.Sheet>
                <TextField
                  type={'number'}
                  placeholder={'Enter a value'}
                />
              </FormField.Sheet>
              <Loader
                color={'gray-10'}
                visible={isLoading}
              />
              <FormField.Message>
                <Alert
                  p={0}
                  rounded={0}
                  timeout={0}
                  alignItems={'center'}
                  visible={error === null}
                  backgroundColor={'transparent'}
                >
                  <Alert.Message
                    lineHeight={'1em'}
                    color={'orange-50'}
                    textTransform={'uppercase'}
                  >
                    {`1 ${selectedCoin!.symbol} = ${number.formatDecimal(
                      realPrice
                    )} ${fiat}`}
                  </Alert.Message>
                </Alert>
              </FormField.Message>
            </React.Fragment>
          );
        }}
      </FormField>
    );
  }
);

const Quantity = React.memo(({ coinId }: { coinId: string }) => {
  const selectedCoin = coins.find((coin) => coin.id === coinId);

  const { loading, balance } = useGetAssetBalance({
    contractAddress: selectedCoin!.contractAddress,
    platform: selectedCoin!.network,
  });

  return (
    <FormField name={'amount'}>
      <Label>Total quantity</Label>
      <FormField.Sheet>
        <TextField
          type={'number'}
          placeholder={'Enter an amount'}
        />
      </FormField.Sheet>
      <FormField.Message color={'orange-60'}>
        <Loader
          color={'gray-10'}
          visible={loading}
        />
        <Alert
          p={0}
          rounded={0}
          timeout={0}
          alignItems={'center'}
          visible={!isNaN(balance)}
          backgroundColor={'transparent'}
        >
          <Alert.Message
            lineHeight={'1em'}
            color={'orange-50'}
          >
            {`Max. ${number.formatDecimal(balance)} `}
            <Text textTransform={'uppercase'}>{selectedCoin!.symbol}</Text>
          </Alert.Message>
        </Alert>
      </FormField.Message>
    </FormField>
  );
});

const Duration = React.memo(() => {
  return (
    <FormField name={'timeout'}>
      <Label>Payment duration</Label>
      <Flex gap={8}>
        <ButtonField value={15}>15 min(s)</ButtonField>
        <ButtonField value={30}>30 min(s)</ButtonField>
      </Flex>
    </FormField>
  );
});

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
      <Heading fontSize={{ initial: 21, sm: 24 }}>Settings</Heading>

      <Formik
        initialValues={data}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values }) => {
          return (
            <Form>
              <Flex
                mt={24}
                gap={8}
              >
                <Coin />
                <Fiat />
              </Flex>

              <Divider
                my={20}
                borderTop={1}
                borderTopColor={'gray-90'}
              />

              <Flex flexDirection={'column'}>
                <Heading
                  fontSize={17}
                  letterSpacing={'xs'}
                >
                  Price settings
                </Heading>

                <Text
                  mt={8}
                  mb={16}
                  as={'p'}
                  fontSize={13}
                  color={'gray-40'}
                  lineHeight={'lg'}
                >
                  Margin adjusts the trade price based on a percentage of the
                  market rate e.g. 2% increases the price above the market rate
                </Text>

                <Flex gap={8}>
                  <Margin
                    fiat={values.fiat || ''}
                    coinId={values.coinId || ''}
                  />
                  <Quantity coinId={values.coinId} />
                </Flex>
              </Flex>

              <Divider
                my={20}
                borderTop={1}
                borderTopColor={'gray-90'}
              />

              <Heading
                fontSize={17}
                letterSpacing={'xs'}
                mb={16}
              >
                Duration
              </Heading>

              <Duration />

              <Divider
                my={20}
                borderTop={1}
                borderTopColor={'gray-90'}
              />

              <Heading
                fontSize={17}
                letterSpacing={'xs'}
              >
                Transaction limits
              </Heading>

              <Flex
                mt={16}
                gap={8}
              >
                <FormField name={'minLimit'}>
                  <Label>Minimum limit</Label>
                  <FormField.Sheet>
                    <TextField
                      type={'number'}
                      placeholder={'Min. trade limit in fiat'}
                    />
                  </FormField.Sheet>
                  <FormField.Message />
                </FormField>
                <FormField name={'maxLimit'}>
                  <Label>Maximum limit</Label>
                  <FormField.Sheet>
                    <TextField
                      type={'number'}
                      placeholder={'Max. trade limit in fiat'}
                    />
                  </FormField.Sheet>
                  <FormField.Message />
                </FormField>
              </Flex>

              <Divider
                my={20}
                borderTop={1}
                borderTopColor={'gray-90'}
              />

              <Heading
                mb={16}
                fontSize={17}
                letterSpacing={'xs'}
              >
                Notes
              </Heading>

              <FormField name={'notes'}>
                <Label>Notes</Label>
                <FormField.Sheet>
                  <Textarea
                    rows={5}
                    placeholder={'Leave trade notes'}
                  />
                </FormField.Sheet>
                <FormField.Message />
              </FormField>

              <Flex
                mt={24}
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
