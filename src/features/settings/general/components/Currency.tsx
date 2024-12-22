import Alert from '@components/alert/Alert';
import Button from '@components/base/button/Button';
import Loader from '@components/base/button/Loader';
import Image from '@components/base/image/Image';
import Label from '@components/base/label/Label';
import Text from '@components/base/text/Text';
import FormField from '@components/formfield/FormField';
import Select from '@components/select/Select';
import currencies from '@constants/currencies';
import { UPDATE_USER } from '@graphql/user';
import useApolloMutation from '@hooks/useApolloMutation';
import useUser from '@hooks/useUser';
import { Form, Formik } from 'formik';
import React from 'react';

const Currency = () => {
  const { user, setUser } = useUser();
  const [updateUser, { loading, error }] = useApolloMutation(UPDATE_USER, {
    onCompleted: (data) => {
      console.log(data);

      setUser({ type: 'UPDATE_USER', payload: { user: data?.updateUser } });
    },
  });

  const handleSubmit = async (values: any) => {
    await updateUser({
      variables: {
        payload: {
          currency: values.currency,
        },
      },
    });
  };

  return (
    <Formik
      initialValues={{ currency: user?.currency || '' }}
      onSubmit={handleSubmit}
    >
      {({ values }) => {
        const selectedCurrency = currencies.find(
          (currency) => currency.name === values.currency
        )!;

        return (
          <Form>
            <FormField name={'currency'}>
              <React.Fragment>
                <Label>Currency</Label>
                <FormField.Sheet>
                  <Select>
                    <Select.Trigger height={'full'}>
                      <Image
                        size={'16px'}
                        src={selectedCurrency.image}
                      />
                      <Select.Value
                        css={{ flex: 1 }}
                        textAlign={'left'}
                      >
                        {selectedCurrency.country}
                      </Select.Value>
                      <Select.Value
                        color={'gray-60'}
                        fontWeight={'regular'}
                      >
                        {selectedCurrency.symbol}
                      </Select.Value>
                    </Select.Trigger>
                    <Select.Content maxHeight={'320px'}>
                      {currencies.map((currency, index) => {
                        return (
                          <Select.Option
                            key={index}
                            value={currency.name}
                          >
                            <Image
                              size={'20px'}
                              src={currency.image}
                            />
                            {currency.country}
                            <Text
                              color={'gray-60'}
                              css={{ flex: 1 }}
                              textAlign={'right'}
                              fontWeight={'regular'}
                            >
                              {currency.symbol}
                            </Text>
                          </Select.Option>
                        );
                      })}
                    </Select.Content>
                  </Select>
                </FormField.Sheet>
              </React.Fragment>
            </FormField>

            <Button
              mt={12}
              py={6}
              fontSize={13}
              width={'fit'}
              type={'submit'}
              disabled={loading || values.currency === user?.currency}
            >
              <Loader visible={loading} />
              Apply changes
            </Button>

            <Alert
              mt={12}
              visible={error !== undefined}
            >
              <Alert.Icon />
              <Alert.Message css={{ flex: 1 }}>{error?.message}</Alert.Message>
            </Alert>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Currency;
