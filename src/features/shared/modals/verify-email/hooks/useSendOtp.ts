import { SEND_MAIL } from '@graphql/mail';
import { GENERATE_OTP } from '@graphql/otp';
import { useApolloClient } from '@apollo/client';

const useSendOtp = () => {
  const client = useApolloClient();

  const sendOtp = async (payload: any) => {
    const { email } = payload;

    try {
      const { data: otpData } = await client.mutate({
        mutation: GENERATE_OTP,
        variables: { email },
      });

      const code = await otpData?.generateOtp?.code;

      if (!code) {
        throw new Error('Unable to generate OTP code');
      }

      await client.mutate({
        mutation: SEND_MAIL,
        variables: {
          template: 'otp',
          recipients: email,
          subject: 'One Time Password',
          data: {
            code,
            title: 'Account verification code',
            label: 'To complete your account verification',
          },
        },
      });

      return { email };
    } catch (error) {
      throw error;
    }
  };

  return { sendOtp };
};

export default useSendOtp;
