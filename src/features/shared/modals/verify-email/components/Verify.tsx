import useStep from '@hooks/useStep';
import useVerifyEmail from '../hooks/useVerifyEmail';
import useAsync from '@hooks/useAsync';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import FormField from '@components/formfield/FormField';
import Label from '@components/base/label/Label';
import TextField from '@components/base/textfield/TextField';
import Button from '@components/base/button/Button';
import Loader from '@components/base/button/Loader';
import Alert from '@components/alert/Alert';
import Flex from '@components/base/flex/Flex';
import Overlay from '@components/overlay/Overlay';

const Verify = () => {
  const { data, next, previous } = useStep<any>();
  const { verify } = useVerifyEmail();
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

            <Flex
              mt={24}
              gap={6}
            >
              <Button
                color={'gray-60'}
                borderColor={'gray-90'}
                backgroundColor={'transparent'}
                onClick={() => previous(values)}
                _hover={{ color: 'gray-10', backgroundColor: 'gray-95' }}
              >
                New code
              </Button>
              <Button
                type={'submit'}
                disabled={loading}
              >
                <Loader visible={loading} />
                Verify OTP
              </Button>
            </Flex>

            <Overlay.Trigger
              mt={6}
              color={'gray-60'}
              borderColor={'transparent'}
              backgroundColor={'gray-90'}
              _hover={{
                color: 'gray-10',
                backgroundColor: 'gray-95',
              }}
            >
              Cancel
            </Overlay.Trigger>

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

export default Verify;