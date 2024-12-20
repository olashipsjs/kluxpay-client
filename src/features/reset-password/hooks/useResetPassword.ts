import { RESET_PASSWORD } from '@graphql/auth';
import { SEND_MAIL } from '@graphql/mail';
import useApolloMutation from '@hooks/useApolloMutation';

const useResetPassword = () => {
  const [resetPassword] = useApolloMutation(RESET_PASSWORD);
  const [sendMail] = useApolloMutation(SEND_MAIL);

  const reset = async (payload: any) => {
    const { email, newPassword } = payload;
    try {
      const resetPasswordResponse = await resetPassword({
        variables: {
          payload: { email, newPassword },
        },
      });

      if (resetPasswordResponse.errors) {
        throw new Error(
          (resetPasswordResponse as any).errors?.cause?.message ||
            'Request failed. Try again later.'
        );
      }

      const sendMailResponse = await sendMail({
        variables: {
          payload: {
            recipients: email,
            subject: 'Password changed',
            template: 'reset-password',
            data: {
              title: 'Password changed',
            },
          },
        },
      });

      if (sendMailResponse.errors) {
        throw new Error(
          (sendMailResponse as any).errors?.cause?.message ||
            'Request failed. Try again later.'
        );
      }

      const data = { email, newPassword };

      return data;
    } catch (error) {
      throw error;
    }
  };

  return { reset };
};

export default useResetPassword;
