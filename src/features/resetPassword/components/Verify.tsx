import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import useStep from 'src/hooks/useStep';
import Alert from '@components/alert/Alert';
import Label from '@components/base/label/Label';
import Button from '@components/base/button/Button';
import FormField from '@components/formfield/FormField';
import useApolloMutation from '@hooks/useApolloMutation';
import { VERIFY_OTP } from 'src/graphql/otp';
import TextField from '@components/base/textfield/TextField';

// const GenerateNewOtp = () => {
//   const { data: currentData } = useStep<{ email: string }>();
//   const [generateOtp, { data, loading, error, reset }] =
//     useApolloMutation(GENERATE_OTP);
//   const { minute, seconds, timeLeft } = useCountDown(0.15, {
//     resetDelay: 12000,
//     resetFn: () => reset(),
//     reset: data !== undefined,
//   });

//   const handleClick = async () => {
//     await generateOtp({
//       variables: {
//         payload: { email: currentData.email },
//       },
//     });
//   };

//   return (
//     <React.Fragment>
//       {timeLeft === 0 ? (
//         <Button
//           mt={12}
//           height={'32px'}
//           disabled={loading}
//           onClick={handleClick}
//           color={data ? 'white' : 'gray-10'}
//           borderColor={data ? 'green-60' : 'gray-95'}
//           backgroundColor={data ? 'green-60' : 'gray-95'}
//           _hover={{
//             backgroundColor: data ? 'green-07' : 'gray-90',
//           }}
//         >
//           <Button.Loader
//             color={'gray-30'}
//             visible={loading}
//           />
//           {data ? 'Code sent' : 'Request new code'}
//         </Button>
//       ) : (
//         <Text
//           mt={12}
//           as={'p'}
//           fontSize={13}
//           textAlign={'center'}
//         >
//           Request new OTP in{' '}
//           {`${minute > 0 ? minute + ':' : ''}${
//             seconds < 10 ? '0' + seconds + 's' : seconds + 's'
//           }`}
//         </Text>
//       )}

//       <Alert
//         mt={12}
//         visible={error !== undefined}
//       >
//         <Alert.Icon />
//         <Alert.Message css={{ flex: 1 }}>{error?.message}</Alert.Message>
//       </Alert>
//     </React.Fragment>
//   );
// };

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .required('Code is required')
    .matches(/^[0-9]{6}$/, 'Invalid code')
    .label('Code'),
});

const Verify = () => {
  const { data, setData, previous, next } = useStep<any>();
  const [verifyOtp, { loading, error }] = useApolloMutation(VERIFY_OTP, {
    onCompleted: () => next(data),
  });

  const handleSubmit = async (values: typeof data) => {
    setData({ ...data, ...values });

    await verifyOtp({
      variables: {
        payload: {
          email: data.email,
          code: values.code,
        },
      },
    });
  };

  return (
    <React.Fragment>
      <Formik
        onSubmit={handleSubmit}
        initialValues={data}
        validationSchema={validationSchema}
      >
        {() => {
          return (
            <Form>
              <FormField
                mt={20}
                name={'code'}
              >
                <Label>Code</Label>
                <FormField.Sheet>
                  <TextField
                    autoComplete={'one-time-code webauthn'}
                    placeholder={'Enter the six digit code'}
                  />
                </FormField.Sheet>
                <FormField.Message />
              </FormField>

              <Button
                mt={16}
                type={'submit'}
                disabled={loading}
              >
                <Button.Loader visible={loading} />
                Verify Code
              </Button>

              <Button
                mt={8}
                type={'submit'}
                color={'gray-40'}
                disabled={loading}
                borderColor={'gray-90'}
                onClick={() => previous(data)}
                backgroundColor={'transparent'}
                _hover={{
                  color: 'gray-10',
                  backgroundColor: 'gray-100',
                }}
              >
                Retry
              </Button>
            </Form>
          );
        }}
      </Formik>

      <Alert
        mt={20}
        visible={error !== undefined}
      >
        <Alert.Icon />
        <Alert.Message css={{ flex: 1 }}>{error?.message}</Alert.Message>
      </Alert>
    </React.Fragment>
  );
};

export default Verify;
