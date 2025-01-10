import { VERIFY_OTP } from '@graphql/otp';
import useApolloMutation from '@hooks/useApolloMutation';

const useVerifyOtp = () => {
  const [verifyOtp] = useApolloMutation(VERIFY_OTP);

  const verify = async (payload: any) => {
    const { email, code } = payload;
    try {
      const verifyOtpResponse = await verifyOtp({
        variables: { email, code },
      });

      if (verifyOtpResponse.errors) {
        throw new Error(
          (verifyOtpResponse as any).errors?.cause?.message ||
            'One Time Password verification failed.'
        );
      }

      const data = payload;

      return data;
    } catch (error) {
      throw error;
    }
  };

  return { verify };
};

export default useVerifyOtp;
