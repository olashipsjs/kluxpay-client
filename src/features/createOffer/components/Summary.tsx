import React from 'react';
import Box from '@components/base/box/Box';
import coins from 'src/constants/coins';
import useStep from 'src/hooks/useStep';
import Flex from '@components/base/flex/Flex';
import Text from '@components/base/text/Text';
import Heading from '@components/base/heading/Heading';
import Button from '@components/base/button/Button';
import number from 'src/utils/number';
import { Form, Formik } from 'formik';
import FormField from '@components/formfield/FormField';
import Checkbox from '@components/checkbox/Checkbox';
import Anchor from '@components/anchor/Anchor';
import * as Yup from 'yup';
import Alert from '@components/alert/Alert';
import useTanstackQuery from '@hooks/useTanstackQuery';
import { getCoinPrice } from 'src/apis/coins';
import useApolloMutation from '@hooks/useApolloMutation';
import { CREATE_OFFER, UPDATE_OFFER } from '@graphql/offer';
import Loader from '@components/base/button/Loader';
import Image from '@components/base/image/Image';
import Divider from '@components/divider/Divider';
import Iconify from '@components/base/iconify/Iconify';
import useOffers from '@hooks/useOffers';

const validationSchema = Yup.object().shape({
  consent: Yup.boolean().oneOf(
    [true],
    'To post an offer you must agree to our Terms of Service.'
  ),
});

const Price = ({
  fiat,
  coinId,
  priceMargin,
}: {
  fiat: string;
  coinId: string;
  priceMargin: number;
}) => {
  const {
    error,
    isFetching,
    data: price,
  } = useTanstackQuery({
    queryFn: getCoinPrice,
    queryKey: [coinId, fiat],
    initialData: null,
  });

  const rate = price
    ? price[coinId][fiat] * (priceMargin / 100) + price[coinId][fiat]
    : 0;

  switch (true) {
    case isFetching:
      return (
        <Loader
          visible
          color={'gray-60'}
        />
      );
    case error !== null:
      return (
        <Text
          fontSize={13}
          color={'red-60'}
        >
          Error
        </Text>
      );

    default:
      return (
        <Text
          fontSize={13}
          color={'gray-40'}
          textTransform={'uppercase'}
        >
          {`${fiat} ${number.formatDecimal(rate)}`}
        </Text>
      );
  }
};

type ListProps = {
  label: string;
  value: string | number;
};

const List = ({ label, value }: ListProps) => {
  return (
    <Flex
      py={8}
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
  const { data, next, previous } = useStep<any>();

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
            timeout: Number(data.timeout),
            priceMargin: Number(data.priceMargin),
            ...data,
          },
        }
      : {
          payload: {
            timeout: Number(data.timeout),
            priceMargin: Number(data.priceMargin),
            ...data,
          },
        };

    await addOffer({ variables });
  };

  return (
    <React.Fragment>
      <Flex
        alignItems={'center'}
        justifyContent={'between'}
      >
        <Heading fontSize={{ initial: 21, sm: 24 }}>Confirmation</Heading>
        <Button
          p={0}
          size={'24px'}
          rounded={'full'}
          color={'gray-60'}
          borderColor={'gray-90'}
          onClick={() => previous(data)}
          backgroundColor={'transparent'}
          _hover={{
            color: 'gray-10',
            backgroundColor: 'gray-95',
          }}
        >
          <Iconify
            width={'20px'}
            icon={'material-symbols-light:chevron-left-rounded'}
          />
        </Button>
      </Flex>
      <Divider my={12} />
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
        <Price
          fiat={data.fiat}
          coinId={data.coinId}
          priceMargin={Number(data.priceMargin)}
        />
      </Flex>

      <Divider my={20} />

      <Box
        notLastChild={{
          borderBottom: 1,
          borderColor: 'gray-95',
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
            name={'consent'}
            flexDirection={'row'}
          >
            <Checkbox />
            <FormField.Message>
              I have read and agreed to the{' '}
              <Anchor to={'/'}>(P2P Terms and Conditions.)</Anchor>
            </FormField.Message>
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
            py={12}
            type={'submit'}
          >
            <Button.Loader visible={loading} />
            {offerId ? 'Update offer' : 'Post offer'}
          </Button>
        </Form>
      </Formik>
    </React.Fragment>
  );
};

export default Summary;
