import React from 'react';
import useApolloQuery from '@hooks/useApolloQuery';
import { GET_OFFER } from '@graphql/offer';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Divider from '@components/divider/Divider';
import Box from '@components/base/box/Box';
import Avatar from '@components/avatar/Avatar';
import Text from '@components/base/text/Text';
import useTanstackQuery from '@hooks/useTanstackQuery';
import { getCoinPrice } from 'src/apis/coins';
import number from '@utils/number';
import Loader from '@components/base/button/Loader';
import { Form, Formik } from 'formik';
import FormField from '@components/formfield/FormField';
import TextField from '@components/base/textfield/TextField';
import Label from '@components/base/label/Label';
import coins from 'src/constants/coins';
import Image from '@components/base/image/Image';
import { GET_ASSET_BALANCE } from '@graphql/wallet';
import * as Yup from 'yup';
import Button from '@components/base/button/Button';
import useApolloMutation from '@hooks/useApolloMutation';
import { CREATE_TRADE } from '@graphql/trade';
import useStep from '@hooks/useStep';
import Alert from '@components/alert/Alert';

const Item = ({ label, value }: { label: string; value: string }) => {
  return (
    <Flex
      width={'full'}
      alignItems={'center'}
      justifyContent={'between'}
    >
      <Text fontSize={13}>{label}</Text>
      <Heading
        as={'h4'}
        fontSize={13}
        letterSpacing={'xs'}
      >
        {value}
      </Heading>
    </Flex>
  );
};

const Price = ({
  fiat,
  coinId,
  priceMargin,
}: {
  fiat: string;
  coinId: string;
  priceMargin: number;
}) => {
  const { isFetching, error, data } = useTanstackQuery({
    queryFn: getCoinPrice,
    queryKey: [coinId, fiat],
    refetchInterval: 30000,
    initialData: null,
  });

  const price = data ? data[coinId][fiat] : 0;
  const rate = (price * priceMargin) / 100 + price;

  return (
    <Flex
      width={'full'}
      alignItems={'center'}
      justifyContent={'between'}
    >
      <Text fontSize={13}>Price</Text>

      <Flex gap={4}>
        <Loader
          width={'12px'}
          color={'gray-60'}
          visible={isFetching}
        />

        {error ? (
          <Text
            fontSize={13}
            color={'red-60'}
          >
            Unable to fetch coin
          </Text>
        ) : null}

        {error === null && !isFetching ? (
          <Heading
            as={'h4'}
            fontSize={13}
            letterSpacing={'xs'}
          >
            {`${number.formatDecimal(rate)} ${fiat.toUpperCase()}`}
          </Heading>
        ) : null}
      </Flex>
    </Flex>
  );
};

const ConversionForm = ({ offer }: { offer: any }) => {
  const { priceMargin, coinId, fiat, minLimit, maxLimit, type } = offer;

  const { data, next, setData } = useStep<{ amount: string; rate: string }>();

  const selectedCoin = coins.find((coin) => coin.id === coinId);

  const { data: query } = useApolloQuery(GET_ASSET_BALANCE, {
    variables: {
      payload: {
        tokenAddress: selectedCoin!.contractAddress,
        platform: selectedCoin!.network,
      },
    },
  });

  const { data: coinPrice } = useTanstackQuery({
    queryFn: getCoinPrice,
    queryKey: [coinId, fiat],
    refetchInterval: 30000,
    initialData: null,
  });

  const price = coinPrice ? coinPrice[coinId][fiat] : 0;
  const balance = query ? query.getAssetBalance : 0;
  const percentage = price * (priceMargin / 100);

  const validationSchema = Yup.object().shape({
    amount: Yup.string()
      .required('Required')
      .test('insufficientBalance', 'Insufficient balance', (value) => {
        const cleanedValue = parseFloat(number.removeComma(value));
        return offer.type === 'buy' || cleanedValue < balance;
      }),
    rate: Yup.string()
      .required('Required')
      .test('belowMinimumLimit', 'Below minimum limit', (value) => {
        const cleanedValue = parseFloat(number.removeComma(value));
        return cleanedValue >= minLimit;
      })
      .test('aboveMaximumLimit', 'Above maximum limit', (value) => {
        const cleanedValue = parseFloat(number.removeComma(value));
        const cleanedMaximumLimit = parseFloat(number.removeComma(maxLimit));
        return cleanedValue <= cleanedMaximumLimit;
      }),
  });

  const [createTrade, { loading, error }] = useApolloMutation(CREATE_TRADE, {
    onCompleted: (data) => {
      const trade = data?.createTrade;

      next({ amount: trade?.amount, rate: trade?.rate, _id: trade?._id });
    },
  });

  const handleSubmit = async (values: any) => {
    setData(values);
    // TODO: Implement logic to send both creator and initiator email

    // TODO: Implement logic to convert and make API call
    await createTrade({
      variables: {
        payload: {
          offer: offer._id,
          rate: values.rate,
          amount: values.amount,
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
      {({ setFieldValue }) => {
        return (
          <Form>
            <FormField name={'amount'}>
              <FormField.Sheet
                ps={12}
                gap={4}
                alignItems={'center'}
              >
                <Label>I will {type}</Label>
                <Image
                  size={'16px'}
                  src={selectedCoin!.image}
                  alt={selectedCoin!.symbol}
                />
                <TextField
                  type={'number'}
                  css={{ flex: 1 }}
                  textAlign={'right'}
                  inputMode={'numeric'}
                  onChange={(event) => {
                    let value = event.target.value;
                    const cleanedValue = number.removeComma(value);

                    const rate =
                      parseFloat(cleanedValue || '0') * (percentage + price);

                    const timer = setTimeout(() => {
                      setFieldValue('rate', number.formatDecimal(rate));
                    }, 1000);

                    () => clearTimeout(timer);
                  }}
                />
              </FormField.Sheet>

              <FormField.Message
                as={'p'}
                fontSize={12}
                textAlign={'right'}
              >
                Available balance: {number.formatDecimal(balance)}
              </FormField.Message>
            </FormField>
            <FormField
              mt={16}
              name={'rate'}
            >
              <FormField.Sheet
                ps={12}
                gap={4}
                alignItems={'center'}
              >
                <Label>I will {type === 'sell' ? 'receive' : 'send'}</Label>
                <Avatar
                  hasError
                  size={'16px'}
                  backgroundColor={'indigo-60'}
                >
                  <Avatar.Fallback
                    fontSize={10}
                    color={'white'}
                  >
                    $
                  </Avatar.Fallback>
                </Avatar>
                <TextField
                  type={'number'}
                  css={{ flex: 1 }}
                  textAlign={'right'}
                  onChange={(event) => {
                    let value = event.target.value;
                    const cleanedValue = number.removeComma(value);

                    const rate =
                      parseFloat(cleanedValue || '0') / (percentage + price);

                    const timer = setTimeout(() => {
                      setFieldValue('amount', number.formatDecimal(rate));
                    }, 1000);

                    () => clearTimeout(timer);
                  }}
                />
              </FormField.Sheet>
              <FormField.Message
                as={'p'}
                textAlign={'right'}
              />
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
              <Loader visible={loading} />
              Open Trade
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

const TradeModal = ({ offerId }: { offerId: string }) => {
  const { data } = useApolloQuery(GET_OFFER, {
    variables: { id: offerId },
  });

  const offer = data?.getOffer;

  if (!offer) return null;

  return (
    <React.Fragment>
      <Box
        px={16}
        width={'full'}
      >
        <Flex gap={8}>
          <Avatar
            size={'24px'}
            hasError={true}
            backgroundColor={'cyan-95'}
          >
            <Avatar.Fallback
              fontSize={10}
              color={'cyan-30'}
            >
              {`${offer.createdBy.firstName[0]}${offer.createdBy.lastName[0]}`}
            </Avatar.Fallback>
          </Avatar>
          <Box>
            <Heading
              fontSize={17}
              letterSpacing={'xs'}
              textTransform={'capitalize'}
            >
              {`${offer.createdBy.firstName} ${offer.createdBy.lastName}`}
            </Heading>

            <Text
              mt={4}
              as={'p'}
              fontSize={12}
            >{`0 trades`}</Text>
          </Box>
        </Flex>

        <Divider my={20} />

        <Box notLastChild={{ mb: 12 }}>
          <Price
            fiat={offer.fiat}
            coinId={offer.coinId}
            priceMargin={Number(offer.priceMargin)}
          />

          <Item
            label={'Available'}
            value={`${offer.amount} ${offer.coinId}`}
          />

          <Item
            label={'Limits'}
            value={`${offer.minLimit} - ${
              offer.maxLimit
            } ${offer.fiat.toUpperCase()}`}
          />
        </Box>
      </Box>

      <Divider my={24} />

      <Box px={16}>
        <ConversionForm offer={offer} />
      </Box>
    </React.Fragment>
  );
};

export default TradeModal;
