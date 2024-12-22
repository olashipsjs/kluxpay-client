import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import FormField from '@components/formfield/FormField';
import Overlay from '@components/overlay/Overlay';
import usePayments from '@hooks/usePayments';
import useStep from '@hooks/useStep';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import AddPaymentFeature from '../../add-payment/Feature';
import Radio from '@components/base/radio/Radio';
import React from 'react';
import Box from '@components/base/box/Box';

const EmptyState = () => {
  return (
    <Flex
      p={20}
      mx={20}
      rounded={12}
      flexDirection={'column'}
      backgroundColor={'gray-95'}
    >
      <Iconify
        width={'32px'}
        color={'gray-60'}
        icon={'ph:cards-three-fill'}
      />
      <Heading
        mt={12}
        fontSize={16}
        fontWeight={'regular'}
      >
        Get paid using your bank accounts
      </Heading>
      <Text
        mt={4}
        as={'p'}
        fontSize={13}
        color={'gray-60'}
      >
        We couldn’t find a payment method linked to your account.{' '}
      </Text>
      <Overlay mt={12}>
        <Overlay.Trigger
          py={4}
          width={'fit'}
          fontSize={13}
          display={'inline'}
        >
          Add one
        </Overlay.Trigger>
        <AddPaymentFeature />
      </Overlay>
    </Flex>
  );
};

const Payment = () => {
  const { data, next } = useStep<any>();
  const { payments } = usePayments();

  if (payments.length === 0) return <EmptyState />;

  const handleSubmit = (values: any) => next(values);

  const validationSchema = Yup.object().shape({
    payment: Yup.string().required('Choose a payment option'),
  });

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Box px={20}>
          <Flex
            alignItems={'center'}
            justifyContent={'between'}
          >
            <Heading fontSize={14}>Found {payments.length} options</Heading>

            <Overlay>
              <Overlay.Trigger
                py={4}
                fontSize={13}
                color={'gray-60'}
                borderColor={'gray-80'}
                backgroundColor={'transparent'}
                _hover={{
                  borderColor: 'transparent',
                  backgroundColor: 'gray-95',
                  color: 'gray-10',
                }}
              >
                Add more
              </Overlay.Trigger>
              <AddPaymentFeature />
            </Overlay>
          </Flex>

          <FormField
            mt={12}
            gap={0}
            border={1}
            rounded={12}
            name={'payment'}
            overflow={'clip'}
            borderColor={'gray-80'}
            boxShadow={'0px .5px 1px 0px rgb(var(--gray-90))'}
            notLastChild={{
              borderBottom: 1,
              borderBottomColor: 'gray-80',
            }}
          >
            {payments.map((payment) => {
              return (
                <Radio
                  key={payment._id}
                  justifyContent={'start'}
                  value={payment._id}
                >
                  {({ isActive }) => {
                    return (
                      <React.Fragment>
                        <Radio.Switch
                          color={'white'}
                          backgroundColor={
                            isActive ? 'indigo-60' : 'transparent'
                          }
                          _hover={{
                            backgroundColor: isActive ? '' : 'gray-90',
                          }}
                        />
                        <Box>
                          <Heading
                            fontSize={14}
                            textAlign={'left'}
                            fontWeight={'regular'}
                          >
                            {payment.method}
                          </Heading>
                          <Text
                            mt={2}
                            as={'p'}
                            fontSize={12}
                            textAlign={'left'}
                            color={'gray-60'}
                          >
                            {payment.bankAccountName}
                          </Text>
                        </Box>
                      </React.Fragment>
                    );
                  }}
                </Radio>
              );
            })}

            <FormField.Message />
          </FormField>

          <Button
            mt={24}
            type={'submit'}
          >
            Confirmation
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

export default Payment;
