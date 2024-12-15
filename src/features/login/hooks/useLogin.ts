import { SIGN_IN } from '@graphql/auth';
import { SEND_MAIL } from '@graphql/mail';
import useApolloMutation from '@hooks/useApolloMutation';
import useLocalStorage from '@hooks/useLocalStorage';

const useLogin = () => {
  const [signIn] = useApolloMutation(SIGN_IN);
  const [sendMail] = useApolloMutation(SEND_MAIL);
  const { save } = useLocalStorage('kp_access_token');

  const login = async (payload: any) => {
    const { email, password } = payload;

    try {
      const signInResponse = await signIn({
        variables: { payload: { email, password } },
      });

      if (signInResponse.errors) {
        throw new Error((signInResponse as any)?.errors?.cause?.message);
      }

      const sendMailResponse = await sendMail({
        variables: {
          payload: {
            template: 'login',
            recipients: email,
            subject: 'New login detected',
            data: {
              device: ``,
            },
          },
        },
      });

      if (sendMailResponse.errors) {
        throw new Error((sendMailResponse as any)?.errors?.cause?.message);
      }

      const data = await signInResponse.data;
      save(data?.signIn?.accessToken);
      return data?.signIn;
    } catch (error) {
      throw error;
    }
  };

  return { login };
};

export default useLogin;
