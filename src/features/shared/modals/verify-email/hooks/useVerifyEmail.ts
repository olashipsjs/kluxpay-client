import { useApolloClient } from '@apollo/client';
import { VERIFY_EMAIL } from '@graphql/auth';
import { SEND_MAIL } from '@graphql/mail';
import { VERIFY_OTP } from '@graphql/otp';

const useVerifyEmail = () => {
  const client = useApolloClient();

  const verify = async (payload: any) => {
    const { email, code } = payload;

    try {
      const [] = await Promise.all([
        await client.mutate({
          mutation: VERIFY_OTP,
          variables: { email, code },
        }),

        await client.mutate({
          mutation: VERIFY_EMAIL,
          variables: { email },
        }),

        await client.mutate({
          mutation: SEND_MAIL,
          variables: {
            recipients: email,
            template: 'email-verification',
            subject: 'Email Verified — Welcome Aboard!',
          },
        }),
      ]);

      return { email, code };
    } catch (error) {
      throw error;
    }
  };

  return { verify };
};

export default useVerifyEmail;
