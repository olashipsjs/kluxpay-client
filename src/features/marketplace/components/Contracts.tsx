import FormField from '@components/formfield/FormField';
import Image from '@components/base/image/Image';
import Select from '@components/select/Select';
import Text from '@components/base/text/Text';
import { Form, Formik } from 'formik';
import React from 'react';
import coins from 'src/constants/coins';

const Contracts = () => {
  return (
    <React.Fragment>
      <Formik
        onSubmit={() => null!}
        initialValues={{ coinId: coins[0].id }}
      >
        {function ({ values }) {
          const selectedCoin = coins.find((coin) => coin.id === values.coinId);

          return (
            <Form>
              <FormField name={'coinId'}>
                <FormField.Sheet>
                  <Select>
                    <Select.Trigger
                      minWidth={'200px'}
                      textTransform={'uppercase'}
                    >
                      <Image
                        size={'16px'}
                        src={selectedCoin!.image}
                        alt={selectedCoin!.id}
                      />
                      <Text
                        css={{ flex: 1 }}
                        textAlign={'left'}
                      >
                        {selectedCoin!.symbol}
                      </Text>
                    </Select.Trigger>
                    <Select.Content>
                      {coins.map((coin) => {
                        return (
                          <Select.Option
                            fontSize={13}
                            key={coin.id}
                            value={coin.id}
                          >
                            <Image
                              size={'16px'}
                              src={coin.image}
                              alt={coin.symbol}
                            />
                            {coin.name}
                          </Select.Option>
                        );
                      })}
                    </Select.Content>
                  </Select>
                </FormField.Sheet>
              </FormField>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default Contracts;
