import { SEND_MAIL } from '@graphql/mail';
import { GENERATE_OTP } from '@graphql/otp';
import { CREATE_USER } from '@graphql/user';
import { CREATE_WALLET } from '@graphql/wallet';
import useApolloMutation from '@hooks/useApolloMutation';

type Payload = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
};
const useRegister = (options?: { onCompleted?: (data: any) => void }) => {
  options = options || {};

  const [sendMail] = useApolloMutation(SEND_MAIL);
  const [createUser] = useApolloMutation(CREATE_USER);
  const [generateOtp] = useApolloMutation(GENERATE_OTP);
  const [createWallet] = useApolloMutation(CREATE_WALLET);

  const register = async (payload: Payload) => {
    const { email, firstName, lastName, password, dateOfBirth } = payload;

    try {
      const userResponse = await createUser({
        variables: {
          payload: { email, firstName, lastName, password, dateOfBirth },
        },
      });

      if (userResponse.errors) {
        console.log({ userResponse });
        throw new Error(
          (userResponse.errors as any)?.cause?.message ||
            'Unable to complete the request. Try again later.'
        );
      }

      const [walletResponse, otpResponse, mailResponse] = await Promise.all([
        await createWallet({
          variables: { payload: { email } },
        }),

        await generateOtp({ variables: { payload: { email } } }),

        await sendMail({
          variables: {
            payload: {
              recipients: email,
              subject: 'Welcome to KluxPay',
              template: 'welcome',
              data: {
                platform: 'Kluxpay',
                firstName: firstName,
              },
            },
          },
        }),
      ]);

      if (!otpResponse.data || !walletResponse.data || !mailResponse.data) {
        throw new Error('Registration failed. Please try again later.');
      }

      const code = await otpResponse?.data?.generateOtp?.code;

      if (!code) {
        throw new Error('Registration failed. Please try again later.');
      }

      await sendMail({
        variables: {
          payload: {
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
        },
      });

      const data = await userResponse.data?.createUser;
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { register };
};

export default useRegister;
