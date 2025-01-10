import { useApolloClient } from '@apollo/client';
import { LOGIN } from '@graphql/auth';
import { SEND_MAIL } from '@graphql/mail';
import useLocalStorage from '@hooks/useLocalStorage';
import { formatDistanceToNow } from 'date-fns';

const useLogin = () => {
  const client = useApolloClient();
  const { save } = useLocalStorage('kp_access_token');

  const login = async (payload: any) => {
    const { email, password } = payload;

    try {
      const { data: loginData } = await client.mutate({
        mutation: LOGIN,
        variables: { email, password },
      });

      const date = new Date();

      await client.mutate({
        mutation: SEND_MAIL,
        variables: {
          template: 'login',
          recipients: email,
          subject: 'New login detected',
          data: {
            time: formatDistanceToNow(date, {
              addSuffix: true,
              includeSeconds: true,
            }),
          },
        },
      });

      const accessToken = await loginData?.login?.accessToken;
      save(accessToken);

      return { accessToken };
    } catch (error) {
      throw error;
    }
  };

  return { login };
};

export default useLogin;
