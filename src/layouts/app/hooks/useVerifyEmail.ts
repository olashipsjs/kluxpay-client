import { VERIFY_EMAIL } from '@graphql/auth';
import { SEND_MAIL } from '@graphql/mail';
import { VERIFY_OTP } from '@graphql/otp';
import useApolloMutation from '@hooks/useApolloMutation';

const useVerifyEmail = () => {
  const [verifyOtp] = useApolloMutation(VERIFY_OTP);
  const [verifyEmail] = useApolloMutation(VERIFY_EMAIL);
  const [sendMail] = useApolloMutation(SEND_MAIL);

  const verify = async (payload: any) => {
    const { email, code } = payload;

    try {
      const verifyOtpResponse = await verifyOtp({
        variables: { payload: { email, code } },
      });

      if (verifyOtpResponse.errors) {
        throw new Error(
          (verifyOtpResponse as any).errors?.cause?.message ||
            'One Time Password verification failed.'
        );
      }

      const verifyEmailResponse = await verifyEmail({
        variables: { payload: { email } },
      });

      if (verifyEmailResponse.errors) {
        throw new Error(
          (verifyEmailResponse as any).errors?.cause?.message ||
            'One Time Password verification failed.'
        );
      }

      const sendMailResponse = await sendMail({
        variables: {
          payload: {
            recipients: email,
            template: 'email-verification',
            subject: 'Email Verified — Welcome Aboard!',
          },
        },
      });

      if (sendMailResponse.errors) {
        throw new Error(
          (sendMailResponse as any)?.errors?.cause?.message ||
            'Unable to generate One Time Password'
        );
      }

      return { email, code };
    } catch (error) {
      throw error;
    }
  };

  return { verify };
};

export default useVerifyEmail;
