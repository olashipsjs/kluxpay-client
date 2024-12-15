import * as Yup from 'yup';
import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Label from '@components/base/label/Label';
import Text from '@components/base/text/Text';
import TextField from '@components/base/textfield/TextField';
import Divider from '@components/divider/Divider';
import FormField from '@components/formfield/FormField';
import Overlay from '@components/overlay/Overlay';
import Step from '@components/step/Step';
import useStep from '@hooks/useStep';
import useUser from '@hooks/useUser';
import { Form, Formik } from 'formik';
import useSendOtp from '../hooks/useSendOtp';
import useAsync from '@hooks/useAsync';
import Loader from '@components/base/button/Loader';
import Alert from '@components/alert/Alert';
import useVerifyOtp from '../hooks/useVerifyEmail';
import useConfirm from '../hooks/useConfirm';

const GenerateOtp = () => {
  const { data, next } = useStep<any>();
  const { sendOtp } = useSendOtp();
  const [async, { loading, error }] = useAsync(sendOtp, {
    onCompleted: (res: any) => next({ ...data, ...res }),
  });

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Please enter a valid email address'),
  });

  const handleSubmit = async (values: any) => {
    await async({ email: values.email });
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <FormField name={'email'}>
          <Label>Email</Label>
          <FormField.Sheet>
            <TextField
              disabled
              autoComplete={'email'}
              placeholder={'e.g johndoe@mail.com'}
            />
          </FormField.Sheet>
          <FormField.Message>Generate new One Time Password</FormField.Message>
        </FormField>

        <Button
          mt={24}
          type={'submit'}
          disabled={loading}
        >
          <Loader visible={loading} />
          Generate OTP
        </Button>

        <Alert
          mt={12}
          visible={error !== undefined}
        >
          <Alert.Icon />
          <Alert.Message css={{ flex: 1 }}>{error?.message}</Alert.Message>
        </Alert>
      </Form>
    </Formik>
  );
};

const VerifyOtp = () => {
  const { data, next, previous } = useStep<any>();
  const { verify } = useVerifyOtp();
  const [async, { loading, error }] = useAsync(verify, {
    onCompleted: (res: any) => {
      next({ ...data, ...res });
    },
  });

  const validationSchema = Yup.object({
    code: Yup.string()
      .required('Enter your OTP code')
      .matches(/^[0-9]{6}$/, 'Invalid code'),
  });

  const handleSubmit = async (values: any) => {
    await async({ email: values.email, code: values.code });
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
            <FormField name={'code'}>
              <Label>OTP Code</Label>
              <FormField.Sheet>
                <TextField placeholder={'One Time Password Code'} />
              </FormField.Sheet>
              <FormField.Message>
                Enter the verification code sent to your email address.
              </FormField.Message>
            </FormField>

            <Button
              mt={24}
              type={'submit'}
              disabled={loading}
            >
              <Loader visible={loading} />
              Verify OTP
            </Button>

            <Button
              mt={6}
              color={'gray-30'}
              borderColor={'gray-90'}
              backgroundColor={'transparent'}
              onClick={() => previous(values)}
              _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
            >
              Request new code
            </Button>

            <Alert
              mt={12}
              visible={error !== undefined}
            >
              <Alert.Icon />
              <Alert.Message css={{ flex: 1 }}>{error?.message}</Alert.Message>
            </Alert>
          </Form>
        );
      }}
    </Formik>
  );
};

const Success = () => {
  const { data } = useStep<any>();
  const { confirm } = useConfirm();
  const [async, { loading, error }] = useAsync(confirm);

  const handleSubmit = async () => {
    await async();
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
                fontSize={17}
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

const VerifyAccount = () => {
  const { user } = useUser();

  return (
    <Overlay.Panel justifyContent={{ initial: 'end', sm: 'center' }}>
      <Overlay.Background />
      <Overlay.Content
        py={20}
        maxWidth={'480px'}
      >
        <Flex
          gap={8}
          px={20}
          alignItems={'start'}
        >
          <Iconify
            width={'32px'}
            color={'white'}
            rounded={'full'}
            backgroundColor={'indigo-60'}
            icon={'material-symbols-light:person-rounded'}
          />
          <Box css={{ flex: 1 }}>
            <Heading fontSize={17}>Verify account</Heading>
            <Text
              mt={6}
              as={'p'}
              fontSize={14}
            >
              Unlock full access by verifying your account
            </Text>
          </Box>

          <Overlay.Trigger
            px={4}
            py={2}
            width={'fit'}
            color={'orange-60'}
            borderColor={'transparent'}
            backgroundColor={'transparent'}
            _hover={{
              backgroundColor: 'orange-100',
            }}
          >
            Cancel
          </Overlay.Trigger>
        </Flex>

        <Divider my={12} />

        <Step
          px={20}
          defaultStep={1}
          initialData={{ email: user ? user.email : '', code: '' }}
        >
          <Step.Screen
            screens={[<GenerateOtp />, <VerifyOtp />, <Success />]}
          />
        </Step>
      </Overlay.Content>
    </Overlay.Panel>
  );
};

export default VerifyAccount;
