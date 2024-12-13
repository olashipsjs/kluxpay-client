import React from 'react';
import { useMutation } from '@apollo/client/react/hooks/useMutation';
import { GENERATE_OTP } from 'src/graphql/otp';
import { SEND_MAIL } from 'src/graphql/mail';
import client from 'src/lib/apolloClient';

type State = {
  loading: boolean;
  error: undefined | any;
  data: undefined | null;
};

type Return = [
  (payload: Payload) => Promise<void>,
  State & { reset: () => void },
];

type Payload = {
  email: string;
  subject: string;
  recipients: string;
  data: {
    title: string;
    label: string;
  };
};

const useGenerateOtp = (): Return => {
  const [sendMail] = useMutation(SEND_MAIL, { client });
  const [generateOtp] = useMutation(GENERATE_OTP, { client });

  const [state, setState] = React.useState<State>({
    error: undefined,
    loading: false,
    data: null,
  });

  const reset = () => {
    setState({
      data: null,
      loading: false,
      error: undefined,
    });
  };

  const sendOtp = async (payload: Payload) => {
    setState({
      data: null,
      loading: true,
      error: undefined,
    });

    try {
      const { data: otp } = await generateOtp({
        variables: {
          payload: { email: payload.email },
        },
      });

      if (!otp) {
        throw new Error('Failed to generate OTP');
      }

      await sendMail({
        variables: {
          payload: {
            template: 'otp',
            subject: payload.subject,
            recipients: payload.recipients,
            data: {
              ...payload.data,
              code: otp?.generateOtp?.code,
            },
          },
        },
      });

      setState({
        data: otp,
        loading: false,
        error: undefined,
      });
    } catch (error) {
      console.log({ error });
      setState({
        error: error,
        loading: false,
        data: null,
      });
    }
  };

  return [sendOtp, { ...state, reset }];
};

export default useGenerateOtp;
