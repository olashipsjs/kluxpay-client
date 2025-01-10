import Alert from '@components/alert/Alert';
import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import Textarea from '@components/base/textarea/Textarea';
import FormField from '@components/formfield/FormField';
import useSocket from '@hooks/useSocket';
import useTrades from '@hooks/useTrades';
import useUser from '@hooks/useUser';
import { Form, Formik } from 'formik';

const Bar = () => {
  const { user } = useUser();
  const { trade } = useTrades();
  const { sendMessage, isConnected } = useSocket(trade?._id || '');

  const handleSendMessage = (values: { text: string }, { resetForm }: any) => {
    sendMessage({
      text: values.text,
      userId: user?._id || '',
      tradeId: trade?._id || '',
    });

    resetForm();
  };

  return (
    <Box
      borderTop={1}
      width={'full'}
      bottom={'0px'}
      position={'fixed'}
      backdropBlur={'lg'}
      borderTopColor={'gray-90'}
      backgroundColor={'white/80'}
    >
      {trade?.status === 'pending' ? (
        <Formik
          initialValues={{ text: '' }}
          onSubmit={handleSendMessage}
        >
          <Form>
            <FormField
              px={16}
              py={10}
              name={'text'}
            >
              <FormField.Sheet
                rounded={'12'}
                height={'fit'}
                alignItems={'end'}
              >
                <Textarea
                  rows={1}
                  autoFocus={true}
                  css={{ flex: 1 }}
                  placeholder={'Write a message...'}
                />

                <Box p={4}>
                  <Button
                    p={0}
                    size={'32px'}
                    type={'submit'}
                  >
                    <Iconify
                      width={20}
                      icon={'mingcute:send-plane-fill'}
                    />
                  </Button>
                </Box>
              </FormField.Sheet>
            </FormField>
          </Form>
        </Formik>
      ) : (
        <Flex
          p={16}
          gap={8}
        >
          <Iconify
            width={24}
            color={'red-60'}
            icon={'line-md:bell-twotone-loop'}
          />
          <Box>
            <Heading
              mb={2}
              fontSize={14}
              fontWeight={'semibold'}
            >
              This trade is no longer active.
            </Heading>
            <Text fontSize={13}>
              To trade again with the same user. Visit their profile and view
              their offers
            </Text>
          </Box>
        </Flex>
      )}
      <Alert
        timeout={0}
        rounded={'none'}
        visible={isConnected === false}
      >
        <Alert.Message textAlign={'center'}>
          Connection error. Try checking your internet connection
        </Alert.Message>
      </Alert>
    </Box>
  );
};

export default Bar;
