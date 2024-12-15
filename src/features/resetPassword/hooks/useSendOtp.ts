import { SEND_MAIL } from '@graphql/mail';
import { GENERATE_OTP } from '@graphql/otp';
import useApolloMutation from '@hooks/useApolloMutation';

const useSendOtp = () => {
  const [sendMail] = useApolloMutation(SEND_MAIL);
  const [generateOtp] = useApolloMutation(GENERATE_OTP);

  const sendOtp = async (payload: any) => {
    const { email } = payload;

    try {
      const generateOtpResponse = await generateOtp({
        variables: { payload: { email } },
      });

      if (generateOtpResponse.errors) {
        throw new Error(
          (generateOtpResponse as any)?.errors?.cause?.message ||
            'Unable to generate One Time Password'
        );
      }

      const code = await generateOtpResponse.data?.generateOtp?.code;

      if (!code) {
        throw new Error('Unable to generate OTP code');
      }

      const sendMailResponse = await sendMail({
        variables: {
          payload: {
            template: 'otp',
            recipients: email,
            subject: 'One Time Password',
            data: {
              code,
              title: 'One Time Password',
              label: 'To reset your password',
            },
          },
        },
      });

      if (sendMailResponse.errors) {
        throw new Error(
          (sendMailResponse as any)?.errors?.cause?.message ||
            'Unable to generate One Time Password'
        );
      }

      const data = { email };

      return data;
    } catch (error) {
      throw error;
    }
  };

  return { sendOtp };
};

export default useSendOtp;
