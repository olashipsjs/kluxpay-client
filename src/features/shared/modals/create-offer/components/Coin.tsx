import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Image from '@components/base/image/Image';
import Text from '@components/base/text/Text';
import ButtonField from '@components/button-field/ButtonField';
import FormField from '@components/formfield/FormField';
import { GET_ALL_P2P_COINS } from '@graphql/coin';
import useStep from '@hooks/useStep';
import formatDecimal from '@utils/formatDecimal';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Header from './Header';
import Query from '@components/query/Query';

const validationSchema = Yup.object().shape({
  coin: Yup.object().shape({ name: Yup.string().required('Select a coin.') }),
});

const Coin = () => {
  const { data, next } = useStep<any>();

  const handleSubmit = (values: typeof data) => {
    next({ ...data, ...values });
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values }) => {
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
                <Heading fontSize={21}>What coin are you trading?</Heading>

                <FormField name={'coin'}>
                  <FormField.Message />

                  <Query
                    query={GET_ALL_P2P_COINS}
                    keys={{ convert: data.fiat.symbol }}
                  >
                    <Query.Loader />
                    <Query.Error>
                      <Text
                        fontSize={14}
                        color={'red-60'}
                      >
                        Server error. Unable to fetch coins data.
                      </Text>
                    </Query.Error>
                    <Query.Data notLastChild={{ mb: 4 }}>
                      {({ data }) => {
                        const coins = data?.getAllP2PCoins;
                        return coins?.map((coin: any) => {
                          const isActive = coin.id === values.coin.id;

                          return (
                            <ButtonField
                              py={8}
                              gap={10}
                              value={coin}
                              key={coin.id}
                              type={'submit'}
                              textAlign={'left'}
                              justifyContent={'between'}
                            >
                              <Image
                                size={'24px'}
                                src={coin.logo}
                                alt={coin.symbol}
                              />
                              <Box css={{ flex: 1 }}>
                                <Heading
                                  as={'p'}
                                  fontSize={13}
                                  fontWeight={'medium'}
                                >
                                  {coin.symbol}
                                </Heading>
                                <Text
                                  mt={6}
                                  as={'p'}
                                  fontSize={12}
                                  color={'gray-60'}
                                  fontWeight={'regular'}
                                >
                                  {values.fiat.sign}
                                  {formatDecimal(
                                    coin.quote[values.fiat.symbol].price || 0
                                  )}
                                </Text>
                              </Box>
                              {isActive ? (
                                <Iconify
                                  width={20}
                                  color={'indigo-60'}
                                  icon={'fluent:checkmark-starburst-24-filled'}
                                />
                              ) : null}
                            </ButtonField>
                          );
                        });
                      }}
                    </Query.Data>
                  </Query>
                </FormField>
              </Box>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Coin;
