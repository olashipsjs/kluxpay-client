import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Query from '@components/query/Query';
import { GET_ALL_FIATS } from '@graphql/fiat';
import useStep from '@hooks/useStep';
import { Form, Formik } from 'formik';
import Header from './Header';
import Text from '@components/base/text/Text';
import ButtonField from '@components/button-field/ButtonField';
import FormField from '@components/formfield/FormField';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  fiat: Yup.object().shape({
    name: Yup.string().required('Choose a currency'),
  }),
});

const Fiat = () => {
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
            <Header data={values} />

            <Flex
              minHeight={'60vh'}
              flexDirection={'column'}
            >
              <Box p={16}>
                <Heading fontSize={21}>What's your fiat?</Heading>
              </Box>

              <Box
                px={16}
                pb={16}
                css={{ flex: 1 }}
              >
                <FormField name={'fiat'}>
                  <FormField.Message />

                  <Query query={GET_ALL_FIATS}>
                    <Query.Loader />
                    <Query.Error>
                      <Text
                        fontSize={14}
                        color={'red-60'}
                      >
                        Server error. We were unable to fetch fiats
                      </Text>
                    </Query.Error>
                    <Query.Data
                      border={1}
                      rounded={8}
                      overflow={'clip'}
                      borderColor={'gray-95'}
                      backgroundColor={'gray-95'}
                      notLastChild={{
                        borderBottom: 1,
                        borderBottomColor: 'gray-90',
                      }}
                    >
                      {({ data }) => {
                        const fiats = data?.getAllFiats;

                        return fiats?.map((fiat: any) => {
                          return (
                            <ButtonField
                              py={10}
                              value={fiat}
                              key={fiat.id}
                              type={'submit'}
                              rounded={'none'}
                              textAlign={'left'}
                              alignItems={'start'}
                              flexDirection={'column'}
                              justifyContent={'start'}
                              borderColor={'transparent'}
                              backgroundColor={'transparent'}
                              _hover={{ backgroundColor: 'white' }}
                            >
                              <Heading
                                fontSize={14}
                                fontWeight={'semibold'}
                              >
                                {fiat.name} - {fiat.sign}
                              </Heading>

                              <Text
                                fontSize={12}
                                color={'gray-60'}
                                fontWeight={'regular'}
                              >
                                {fiat.symbol}
                              </Text>
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

export default Fiat;
