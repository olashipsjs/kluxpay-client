import { useApolloClient } from '@apollo/client';
import { SEND_MAIL } from '@graphql/mail';
import { GENERATE_OTP } from '@graphql/otp';
import { CREATE_USER } from '@graphql/user';
import { CREATE_WALLETS } from '@graphql/wallet';

type Payload = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
};
const useRegister = (options?: { onCompleted?: (data: any) => void }) => {
  options = options || {};

  const client = useApolloClient();

  const mutation = async (payload: Payload) => {
    const { email, firstName, lastName, password, username } = payload;

    try {
      const userResponse = await client.mutate({
        mutation: CREATE_USER,
        variables: {
          email,
          firstName,
          lastName,
          password,
          username,
        },
      });

      const [_, { data: OtpData }, __] = await Promise.all([
        await client.mutate({
          mutation: CREATE_WALLETS,
          variables: { email, networks: 'ethereum' },
        }),

        await client.mutate({
          mutation: GENERATE_OTP,
          variables: { email },
        }),

        await client.mutate({
          mutation: SEND_MAIL,
          variables: {
            recipients: email,
            subject: 'Welcome to KluxPay',
            template: 'welcome',
            data: {
              platform: 'Kluxpay',
              firstName: firstName,
            },
          },
        }),
      ]);

      const code = await OtpData?.generateOtp?.code;

      if (!code) {
        throw new Error('Registration failed. Please try again later.');
      }

      await client.mutate({
        mutation: SEND_MAIL,
        variables: {
          recipients: email,
          subject: 'Complete registration',
          template: 'otp',
          data: {
            code,
            title: 'Verify your account',
            firstName: firstName,
            label: 'To verify your account',
          },
        },
      });

      const data = await userResponse.data?.createUser;
      return data;
    } catch (error) {
      throw new Error(
        (error as Error).message || 'An unexpected error occurred.'
      );
    }
  };

  return { mutation };
};

export default useRegister;
