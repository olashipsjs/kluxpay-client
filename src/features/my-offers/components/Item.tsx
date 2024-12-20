import Offer from '@ts_types/offer';
import Button from '@components/base/button/Button';
import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import Flex from '@components/base/flex/Flex';
import Divider from '@components/divider/Divider';
import CoinPrice from '@components/shared/CoinPrice';
import coins from '@constants/coins';
import marginPrice from '@utils/marginPrice';
import { Form, Formik } from 'formik';
import Switch from '@components/switch/Switch';
import FormField from '@components/formfield/FormField';
import Overlay from '@components/overlay/Overlay';
import Iconify from '@components/base/iconify/Iconify';
import OpenTradeFeature from '@features/shared/modals/open-trade/Feature';

type Props = { offer: Offer.Type };

const Item = ({ offer }: Props) => {
  const activeCoin = coins.find((coin) => coin.id === offer.coinId)!;

  return (
    <Button
      p={0}
      gap={0}
      rounded={12}
      width={'full'}
      overflow={'clip'}
      color={'gray-40'}
      alignItems={'stretch'}
      borderColor={'gray-90'}
      flexDirection={'column'}
      justifyContent={'start'}
      backgroundColor={'white'}
      boxShadow={'0px .5px 1px 0px rgb(var(--gray-90))'}
      _hover={{ backgroundColor: 'gray-100' }}
    >
      <Flex
        p={12}
        gap={12}
        width={'full'}
        alignItems={'start'}
      >
        <Avatar
          p={8}
          border={1}
          rounded={8}
          size={'40px'}
          borderColor={'gray-95'}
          backgroundColor={'white'}
          boxShadow={'0px .25px 1px 0px rgb(var(--gray-80))'}
        >
          <Avatar.Picture src={activeCoin.image} />
        </Avatar>

        <Box css={{ flex: 1 }}>
          <Heading
            fontSize={14}
            textAlign={'left'}
            fontWeight={'semibold'}
            textTransform={'uppercase'}
          >{`${activeCoin.symbol}`}</Heading>
          <Text
            mt={2}
            as={'p'}
            fontSize={13}
            color={'gray-40'}
            textAlign={'left'}
            textTransform={'capitalize'}
          >{`${offer.payment.method}`}</Text>
        </Box>

        <Formik
          onSubmit={() => null!}
          initialValues={{ isActive: false }}
        >
          <Form>
            <FormField
              name={'isActive'}
              alignItems={'center'}
              flexDirection={'row'}
            >
              <Switch value={offer.isActive} />

              <Overlay>
                <Overlay.Trigger
                  px={8}
                  py={2}
                  borderColor={'transparent'}
                  backgroundColor={'gray-80'}
                  _hover={{
                    backgroundColor: 'gray-90',
                  }}
                >
                  <Iconify
                    width={'16px'}
                    icon={'ph:sliders-horizontal-fill'}
                  />
                </Overlay.Trigger>
                <OpenTradeFeature />
              </Overlay>
            </FormField>
          </Form>
        </Formik>
      </Flex>

      <Divider backgroundColor={'gray-90'} />

      <Box p={12}>
        <Flex justifyContent={'between'}>
          <Text fontSize={13}>{`${
            offer.minLimit
          } ${offer.fiat.toUpperCase()}`}</Text>
          <Text fontSize={13}>{`${
            offer.maxLimit
          } ${offer.fiat.toUpperCase()}`}</Text>
        </Flex>

        <Divider my={6} />

        <Flex justifyContent={'between'}>
          <Box>
            <Heading
              fontSize={12}
              textAlign={'left'}
            >
              Amount
            </Heading>
            <Heading fontSize={21}>
              {`${offer.amount} `}
              <Text
                fontSize={12}
                color={'gray-60'}
                css={{ verticalAlign: 'middle' }}
              >{` ${activeCoin.symbol.toUpperCase()}`}</Text>
            </Heading>
          </Box>

          <Box>
            <Heading
              fontSize={12}
              textAlign={'right'}
            >
              Price
            </Heading>
            <CoinPrice
              coinId={offer.coinId}
              fiat={offer.fiat}
            >
              {({ price }) => {
                return (
                  <Heading fontSize={21}>
                    {`${marginPrice(price, offer.priceMargin)} `}
                    <Text
                      fontSize={12}
                      color={'gray-60'}
                      css={{ verticalAlign: 'middle' }}
                    >{` ${offer.fiat.toUpperCase()}`}</Text>
                  </Heading>
                );
              }}
            </CoinPrice>
          </Box>
        </Flex>
      </Box>
    </Button>
  );
};

export default Item;
