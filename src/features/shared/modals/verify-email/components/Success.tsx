import useStep from '@hooks/useStep';
import useConfirm from '../hooks/useConfirm';
import useAsync from '@hooks/useAsync';
import { Form, Formik } from 'formik';
import Flex from '@components/base/flex/Flex';
import Iconify from '@components/base/iconify/Iconify';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import Button from '@components/base/button/Button';
import Loader from '@components/base/button/Loader';
import Alert from '@components/alert/Alert';
import useOverlay from '@hooks/useOverlay';

const Success = () => {
  const { data } = useStep<any>();
  const { confirm } = useConfirm();
  const { setIsOpen } = useOverlay();
  const [async, { loading, error }] = useAsync(confirm);

  const handleSubmit = async () => {
    await async();
    setIsOpen(false);
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
    >
      {() => {
        return (
          <Form>
            <Flex
              mt={20}
              mx={'auto'}
              maxWidth={'400px'}
              alignItems={'center'}
              flexDirection={'column'}
            >
              <Iconify
                width={'40px'}
                color={'green-60'}
                icon={'material-symbols-light:person-book'}
              />
              <Heading
                mt={20}
                fontSize={21}
                textAlign={'center'}
              >
                Verification successful
              </Heading>
              <Text
                mt={8}
                as={'p'}
                fontSize={16}
                lineHeight={'lg'}
                textAlign={'center'}
              >
                Your email has been verified. You can now enjoy all the features
                of your account.
              </Text>
            </Flex>

            <Button
              mt={24}
              type={'submit'}
              disabled={loading}
            >
              <Loader visible={loading} />
              Confirm
            </Button>

            <Alert visible={error !== undefined}>
              <Alert.Icon />
              <Alert.Message css={{ flex: 1 }}>{error?.message}</Alert.Message>
            </Alert>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Success;
