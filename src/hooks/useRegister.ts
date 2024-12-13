import useApolloMutation from './useApolloMutation';
import { CREATE_USER } from '@graphql/user';
import { SEND_MAIL } from '@graphql/mail';
import { GENERATE_OTP } from '@graphql/otp';
import { CREATE_WALLET } from '@graphql/wallet';
import useActionState from './useActionState';

type Payload = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
};
const useRegister = (options?: {
  onCompleted?: (data: any) => void;
}): [
  (payload: Payload) => Promise<void>,
  ReturnType<typeof useActionState>[0]
] => {
  options = options || {};

  const [state, setState] = useActionState();
  const [sendMail] = useApolloMutation(SEND_MAIL);
  const [createUser] = useApolloMutation(CREATE_USER);
  const [generateOtp] = useApolloMutation(GENERATE_OTP);
  const [createWallet] = useApolloMutation(CREATE_WALLET);

  const register = async (payload: Payload) => {
    setState({ type: 'LOADING' });

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
        createWallet({
          variables: { payload: { email } },
        }),

        generateOtp({ variables: { payload: { email } } }),

        sendMail({
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

      const code = otpResponse?.data?.generateOtp?.code;

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

      const data = userResponse.data?.createUser;

      setState({
        type: 'SUCCESS',
        payload: { data },
      });

      options?.onCompleted && options.onCompleted(data);
    } catch (error) {
      console.log({ error });
      setState({
        type: 'ERROR',
        payload: { message: (error as Error).message },
      });
    }
  };

  return [register, state];
};

export default useRegister;
