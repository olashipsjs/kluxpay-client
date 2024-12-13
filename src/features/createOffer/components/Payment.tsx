import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import Divider from '@components/divider/Divider';
import FormField from '@components/formfield/FormField';
import Overlay from '@components/overlay/Overlay';
import AddPaymentMethod from '@features/addPaymentMethod/Feature';
import usePayments from '@hooks/usePayments';
import useStep from '@hooks/useStep';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const Payment = () => {
  const { data, next } = useStep<any>();
  const { payments } = usePayments();

  if (payments.length === 0) {
    return (
      <Flex
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Iconify
          width={'40px'}
          color={'orange-60'}
          icon={'material-symbols-light:warning-rounded'}
        />
        <Heading
          mt={16}
          fontSize={21}
          textAlign={'center'}
        >
          No payment options found
        </Heading>
        <Overlay>
          <Overlay.Trigger mt={24}>Add payment option</Overlay.Trigger>
          <AddPaymentMethod />
        </Overlay>
      </Flex>
    );
  }

  const handleSubmit = (values: any) => {
    next(values);
  };

  const validationSchema = Yup.object().shape({
    payment: Yup.string().required('Choose a payment option'),
  });

  return (
    <Flex flexDirection={'column'}>
      <Heading>Payment options</Heading>
      <Divider my={12} />
      <Formik
        initialValues={data}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <FormField name={'payment'}>
                {payments.map((payment) => {
                  const isActive = payment._id === values.payment;

                  return (
                    <Flex
                      p={8}
                      rounded={6}
                      key={payment._id}
                      cursor={'pointer'}
                      justifyContent={'between'}
                      backgroundColor={isActive ? 'gray-95' : 'transparent'}
                      onClick={() => setFieldValue('payment', payment._id)}
                      _hover={{
                        backgroundColor: 'gray-95',
                      }}
                    >
                      <Box>
                        <Heading
                          fontSize={16}
                          fontWeight={'regular'}
                        >
                          {payment.method}
                        </Heading>
                        <Text
                          mt={6}
                          as={'p'}
                          fontSize={13}
                        >
                          {payment.bankAccountName} |{' '}
                          {payment.bankAccountNumber}
                        </Text>
                      </Box>

                      {isActive ? (
                        <Iconify
                          width={'24px'}
                          color={'green-60'}
                          icon={'material-symbols-light:check-circle-rounded'}
                        />
                      ) : null}
                    </Flex>
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
            </Form>
          );
        }}
      </Formik>
    </Flex>
  );
};

export default Payment;
