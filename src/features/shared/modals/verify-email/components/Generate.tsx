import useStep from '@hooks/useStep';
import useSendOtp from '../hooks/useSendOtp';
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

const Generate = () => {
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

        <Flex
          mt={24}
          gap={6}
        >
          <Overlay.Trigger
            color={'gray-60'}
            borderColor={'gray-90'}
            backgroundColor={'transparent'}
            _hover={{
              color: 'gray-10',
              backgroundColor: 'gray-95',
            }}
          >
            Cancel
          </Overlay.Trigger>
          <Button
            type={'submit'}
            disabled={loading}
          >
            <Loader visible={loading} />
            Generate OTP
          </Button>
        </Flex>

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

export default Generate;
