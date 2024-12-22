import React from 'react';
import Box from '@components/base/box/Box';
import coins from 'src/constants/coins';
import useStep from 'src/hooks/useStep';
import Flex from '@components/base/flex/Flex';
import Text from '@components/base/text/Text';
import Heading from '@components/base/heading/Heading';
import Button from '@components/base/button/Button';
import { Form, Formik } from 'formik';
import Alert from '@components/alert/Alert';
import useApolloMutation from '@hooks/useApolloMutation';
import { CREATE_OFFER, UPDATE_OFFER } from '@graphql/offer';
import Image from '@components/base/image/Image';
import useOffers from '@hooks/useOffers';
import toNumber from '@utils/toNumber';
import CoinPrice from '@components/shared/CoinPrice';
import { useSearchParams } from 'react-router-dom';

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
      <Text fontSize={13}>{label}</Text>
      <Heading
        as={'h3'}
        fontSize={13}
        letterSpacing={'xs'}
      >
        {value}
      </Heading>
    </Flex>
  );
};

const Summary = () => {
  const [searchParams] = useSearchParams();
  const { setOffers } = useOffers();
  const { data, next } = useStep<any>();

  const ID = searchParams.get('id');

  const [addOffer, { loading, error }] = useApolloMutation(
    ID ? UPDATE_OFFER : CREATE_OFFER,
    {
      onCompleted: (data) => {
        if (ID) {
          setOffers({
            type: 'UPDATE_OFFER',
            payload: { offer: data?.updateOffer },
          });
        } else {
          setOffers({
            type: 'ADD_OFFER',
            payload: { offer: data?.createOffer },
          });
        }

        next(data);
      },
    }
  );

  const selectedCoin = coins.find((c) => c.id === data.coinId);

  const handleSubmit = async (values: typeof data) => {
    const variables = ID
      ? {
          id: ID,
          payload: {
            ...values,
            timeout: Number(values.timeout),
            amount: toNumber(String(values.amount)),
            minLimit: toNumber(String(values.minLimit)),
            maxLimit: toNumber(String(values.maxLimit)),
            priceMargin: toNumber(String(values.priceMargin)),
          },
        }
      : {
          payload: {
            ...values,
            timeout: Number(values.timeout),
            amount: toNumber(values.amount),
            minLimit: toNumber(values.minLimit),
            maxLimit: toNumber(values.maxLimit),
            priceMargin: toNumber(values.priceMargin),
          },
        };

    await addOffer({ variables });
  };

  return (
    <React.Fragment>
      <Flex
        px={20}
        gap={12}
        alignItems={'center'}
      >
        <Image
          size={'24px'}
          src={selectedCoin!.image}
          alt={`${selectedCoin!.symbol}}`}
        />
        <Heading
          fontSize={16}
          css={{ flex: 1 }}
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
              <Heading
                fontSize={16}
                textTransform={'uppercase'}
              >{`${price} ${data.fiat}`}</Heading>
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
        initialValues={data}
        onSubmit={handleSubmit}
      >
        <Form>
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
              {ID ? 'Update' : 'Post'}
            </Button>
          </Box>
        </Form>
      </Formik>
    </React.Fragment>
  );
};

export default Summary;
