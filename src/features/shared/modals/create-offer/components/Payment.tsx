import React from 'react';
import * as Yup from 'yup';
import Header from './Header';
import useStep from '@hooks/useStep';
import { Form, Formik } from 'formik';
import Box from '@components/base/box/Box';
import Query from '@components/query/Query';
import Flex from '@components/base/flex/Flex';
import Text from '@components/base/text/Text';
import { GET_USER_PAYMENTS } from '@graphql/payment';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import FormField from '@components/formfield/FormField';
import ButtonField from '@components/button-field/ButtonField';

const validationSchema = Yup.object().shape({
  payment: Yup.object()
    .shape({
      method: Yup.string().required('Select a payment method'),
    })
    .required('Select a payment method'),
});

const Payment = () => {
  const { data, next } = useStep<any>();

  const handleSubmit = (values: any) => {
    next({ ...data, ...values });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={data}
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
                <Heading fontSize={21}>How would you like to get paid?</Heading>

                <FormField name={'payment'}>
                  <FormField.Message />

                  <Query query={GET_USER_PAYMENTS}>
                    <Query.Loader />
                    <Query.Error>
                      <Text
                        fontSize={14}
                        color={'red-60'}
                        fontWeight={'medium'}
                      >
                        {'Something went wrong.'}
                      </Text>
                    </Query.Error>
                    <Query.Data>
                      {({ data }) => {
                        const payments = data?.getUserPayments;

                        return payments?.map((payment: any) => {
                          return (
                            <ButtonField
                              py={8}
                              px={10}
                              gap={6}
                              rounded={8}
                              type={'submit'}
                              value={payment}
                              key={payment._id}
                              textAlign={'left'}
                              fontWeight={'regular'}
                              justifyContent={'between'}
                            >
                              {({ isActive }) => {
                                return (
                                  <React.Fragment>
                                    <Box
                                      width={'full'}
                                      alignItems={'center'}
                                      justifyContent={'between'}
                                    >
                                      <Heading
                                        mb={8}
                                        fontSize={14}
                                      >
                                        {payment.bankName}
                                      </Heading>

                                      <Text
                                        fontSize={12}
                                        color={'gray-60'}
                                        textTransform={'capitalize'}
                                      >
                                        {payment.bankAccountName} -{' '}
                                        {payment.bankAccountNumber}
                                      </Text>
                                    </Box>
                                    {isActive ? (
                                      <Iconify
                                        width={20}
                                        color={'indigo-60'}
                                        icon={
                                          'fluent:checkmark-starburst-24-filled'
                                        }
                                      />
                                    ) : null}
                                  </React.Fragment>
                                );
                              }}
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

export default Payment;
