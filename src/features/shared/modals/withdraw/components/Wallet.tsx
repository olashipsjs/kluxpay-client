import * as Yup from 'yup';
import useStep from '@hooks/useStep';
import { Form, Formik } from 'formik';
import useWallet from '@hooks/useWallet';
import FormField from '@components/formfield/FormField';
import Radio from '@components/base/radio/Radio';
import React from 'react';
import Label from '@components/base/label/Label';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import Button from '@components/base/button/Button';

const validationSchema = Yup.object().shape({
  walletId: Yup.string().required('Select a wallet'),
});

const Wallet = () => {
  const { wallets } = useWallet();
  const { data, next } = useStep<any>();

  const handleSubmit = (values: typeof data) => {
    next(values);
    // TODO:
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {() => {
        return (
          <Form>
            <Heading
              fontSize={14}
              mb={8}
            >
              Choose wallet
            </Heading>
            <FormField
              gap={2}
              name={'walletId'}
            >
              {wallets?.map((wallet, index) => {
                return (
                  <Radio
                    gap={8}
                    rounded={12}
                    key={wallet._id}
                    value={wallet._id}
                    justifyContent={'start'}
                  >
                    {({ isActive }) => {
                      return (
                        <React.Fragment>
                          <Radio.Switch
                            color={isActive ? 'gray-10' : 'transparent'}
                          />
                          <Label
                            cursor={'pointer'}
                            css={{ flex: 1 }}
                            textAlign={'left'}
                          >
                            {wallet.name ? wallet.name : `Wallet ${index + 1}`}
                          </Label>

                          <Text
                            fontSize={12}
                            color={'gray-60'}
                          >{`${wallet.publicKey.substring(
                            0,
                            3
                          )}...${wallet.publicKey.substring(
                            wallet.publicKey.length - 4
                          )}`}</Text>
                        </React.Fragment>
                      );
                    }}
                  </Radio>
                );
              })}

              <FormField.Message />
            </FormField>

            <Button
              mt={64}
              type={'submit'}
            >
              Confirm
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Wallet;
