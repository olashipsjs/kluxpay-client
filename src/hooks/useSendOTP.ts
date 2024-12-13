import useActionState from './useActionState';
import useApolloMutation from './useApolloMutation';
import { SEND_MAIL } from '@graphql/mail';
import { GENERATE_OTP } from '@graphql/otp';

const useSendOTP = (options?: {
  onCompleted?: (data: any) => void;
}): [typeof sendOTP, typeof state] => {
  options = options || {};

  const [state, setState] = useActionState();
  const [sendMail] = useApolloMutation(SEND_MAIL);
  const [generateOtp] = useApolloMutation(GENERATE_OTP);

  const sendOTP = async (email: any, payload: any) => {
    setState({ type: 'LOADING' });

    try {
      const otpResponse = await generateOtp({
        variables: { payload: { email } },
      });

      if (otpResponse.errors) {
        throw new Error(
          (otpResponse as any).errors?.cause?.message ||
            'Unable to generate OTP. Try again later.'
        );
      }

      const code = otpResponse.data?.generateOtp?.code;

      if (!code) {
        throw new Error('Unable to generate OTP code');
      }

      const sendMailResponse = await sendMail({
        variables: {
          payload: {
            recipients: email,
            template: payload.template,
            subject: payload.subject,
            data: { code, ...payload.data },
          },
        },
      });

      if (sendMailResponse.errors) {
        throw new Error(
          (sendMailResponse as any).errors?.cause?.message ||
            'Unable to generate OTP. Try again later.'
        );
      }

      const data = { code, email };

      setState({ type: 'SUCCESS', payload: { data } });

      options?.onCompleted && options.onCompleted(data);
    } catch (error) {
      setState({
        type: 'ERROR',
        payload: { message: (error as Error).message },
      });

      throw new Error((error as Error).message);
    }
  };

  return [sendOTP, state];
};

export default useSendOTP;
