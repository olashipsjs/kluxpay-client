import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import Overlay from '@components/overlay/Overlay';
import AddPaymentFeature from '@features/shared/modals/add-payment/Feature';
import usePayments from '@hooks/usePayments';

const PaymentSettingsFeature = () => {
  const { payments } = usePayments();

  return (
    <Box>
      <Flex
        alignItems={'center'}
        justifyContent={'between'}
      >
        <Heading fontSize={21}>Payments</Heading>

        <Overlay>
          <Overlay.Trigger
            py={4}
            fontSize={13}
            width={'fit'}
          >
            New
          </Overlay.Trigger>
          <AddPaymentFeature />
        </Overlay>
      </Flex>

      {payments.length === 0 && (
        <Box mt={6}>
          <Text fontSize={14}>No payments found.</Text>
        </Box>
      )}

      <Box
        mt={20}
        rounded={12}
        backgroundColor={'white'}
        notLastChild={{
          borderBottom: 1,
          borderBottomColor: 'gray-90',
        }}
      >
        {payments?.map((payment) => {
          return (
            <Box
              py={12}
              px={12}
              key={payment._id}
            >
              <Flex justifyContent={'between'}>
                <Heading fontSize={14}>{payment.method}</Heading>
                <Overlay>
                  <Overlay.Trigger
                    p={0}
                    size={'32px'}
                    rounded={'full'}
                    color={'gray-60'}
                    borderColor={'gray-90'}
                    backgroundColor={'transparent'}
                    _hover={{
                      color: 'gray-10',
                      backgroundColor: 'gray-95',
                    }}
                  >
                    <Iconify
                      width={16}
                      icon={'fluent:pen-sparkle-24-regular'}
                    />
                  </Overlay.Trigger>
                  <AddPaymentFeature id={payment._id} />
                </Overlay>
              </Flex>

              <Text
                as={'p'}
                mt={6}
                fontSize={13}
              >
                {payment.details}
              </Text>

              <Box mt={10}>
                <Heading
                  fontSize={14}
                >{`${payment.bankAccountName} - ${payment.bankName}`}</Heading>
                <Text fontSize={14}>{payment.bankAccountNumber}</Text>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default PaymentSettingsFeature;
