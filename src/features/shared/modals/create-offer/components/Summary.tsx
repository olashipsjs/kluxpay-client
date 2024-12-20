import React from 'react';
import Box from '@components/base/box/Box';
import coins from 'src/constants/coins';
import useStep from 'src/hooks/useStep';
import Flex from '@components/base/flex/Flex';
import Text from '@components/base/text/Text';
import Heading from '@components/base/heading/Heading';
import Button from '@components/base/button/Button';
import { Form, Formik } from 'formik';
import FormField from '@components/formfield/FormField';
import Checkbox from '@components/checkbox/Checkbox';
import Anchor from '@components/anchor/Anchor';
import * as Yup from 'yup';
import Alert from '@components/alert/Alert';
import useApolloMutation from '@hooks/useApolloMutation';
import { CREATE_OFFER, UPDATE_OFFER } from '@graphql/offer';
import Image from '@components/base/image/Image';
import useOffers from '@hooks/useOffers';
import toNumber from '@utils/toNumber';
import CoinPrice from '@components/shared/CoinPrice';

const validationSchema = Yup.object().shape({
  consent: Yup.boolean().oneOf(
    [true],
    'To post an offer you must agree to our Terms of Service.'
  ),
});

type ListProps = {
  label: string;
  value: string | number;
};

const List = ({ label, value }: ListProps) => {
  return (
    <Flex
      py={8}
      px={20}
      alignItems={'center'}
      justifyContent={'between'}
    >
      <Text fontSize={12}>{label}</Text>
      <Heading
        as={'h3'}
        fontSize={12}
        letterSpacing={'xs'}
      >
        {value}
      </Heading>
    </Flex>
  );
};

const Summary = ({ offerId }: { offerId?: string }) => {
  const { setOffers } = useOffers();
  const { data, next } = useStep<any>();

  const [addOffer, { loading, error }] = useApolloMutation(
    offerId ? UPDATE_OFFER : CREATE_OFFER,
    {
      onCompleted: (data) => {
        if (offerId) {
          setOffers({
            type: 'UPDATE_OFFER',
            payload: { offer: data?.updateOffer },
          });
        }

        setOffers({ type: 'ADD_OFFER', payload: { offer: data?.createOffer } });
        next(data);
      },
    }
  );

  const selectedCoin = coins.find((c) => c.id === data.coinId);

  const handleSubmit = async () => {
    const variables = offerId
      ? {
          id: offerId,
          payload: {
            ...data,
            amount: toNumber(data.amount),
            timeout: Number(data.timeout),
            minLimit: toNumber(data.minLimit),
            maxLimit: toNumber(data.maxLimit),
            priceMargin: parseFloat(data.priceMargin),
          },
        }
      : {
          payload: {
            ...data,
            amount: toNumber(data.amount),
            timeout: Number(data.timeout),
            minLimit: toNumber(data.minLimit),
            maxLimit: toNumber(data.maxLimit),
            priceMargin: parseFloat(data.priceMargin),
          },
        };

    await addOffer({ variables });
  };

  return (
    <React.Fragment>
      <Flex
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Image
          size={'32px'}
          src={selectedCoin!.image}
          alt={`${selectedCoin!.symbol}}`}
        />
        <Heading
          mb={8}
          mt={12}
          fontSize={17}
          textAlign={'center'}
          textTransform={'capitalize'}
        >
          {data.type}{' '}
          <Text textTransform={'uppercase'}>{selectedCoin!.symbol}</Text>
        </Heading>
        <CoinPrice
          coinId={data.coinId}
          fiat={data.fiat}
        >
          {({ price }) => {
            return (
              <Text
                fontSize={14}
                textTransform={'uppercase'}
              >{`${price} ${data.fiat}`}</Text>
            );
          }}
        </CoinPrice>
      </Flex>

      <Box
        mt={20}
        notLastChild={{
          borderBottom: 1,
          borderColor: 'gray-90',
        }}
      >
        <List
          label={'Quantity'}
          value={`${data.amount} ${selectedCoin!.symbol.toUpperCase()}`}
        />
        <List
          label={'Limits'}
          value={`${data.minLimit} - ${
            data.maxLimit
          } ${data.fiat.toUpperCase()}`}
        />
        <List
          label={'Payment duration'}
          value={`${data.timeout} Mins`}
        />
        <List
          label={'Payment ID'}
          value={`${data.payment.substring(0, 14)}...`}
        />
        <List
          value={'2.00%'}
          label={'Transaction fee'}
        />
      </Box>

      <Formik
        onSubmit={handleSubmit}
        initialValues={{ consent: false }}
        validationSchema={validationSchema}
      >
        <Form>
          <FormField
            mt={12}
            px={20}
            name={'consent'}
            flexDirection={'row'}
          >
            <Checkbox>
              {() => {
                return (
                  <React.Fragment>
                    <Checkbox.Switch />
                    <FormField.Message>
                      I have read and agreed to the{' '}
                      <Anchor to={'/'}>Terms</Anchor>
                    </FormField.Message>
                  </React.Fragment>
                );
              }}
            </Checkbox>
          </FormField>

          <Alert
            mt={20}
            rounded={0}
            visible={error !== undefined}
          >
            <Alert.Icon />
            <Alert.Message css={{ flex: 1 }}>{error?.message}</Alert.Message>
          </Alert>

          <Box
            mt={24}
            px={20}
          >
            <Button
              type={'submit'}
              disabled={loading}
            >
              <Button.Loader visible={loading} />
              {offerId ? 'Update offer' : 'Post offer'}
            </Button>
          </Box>
        </Form>
      </Formik>
    </React.Fragment>
  );
};

export default Summary;
