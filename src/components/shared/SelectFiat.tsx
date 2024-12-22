import Image from '@components/base/image/Image';
import Label from '@components/base/label/Label';
import Text from '@components/base/text/Text';
import FormField from '@components/formfield/FormField';
import Select from '@components/select/Select';
import currencies from '@constants/currencies';
import React from 'react';

type Props = {
  name: string;
};

const SelectFiat = ({ name }: Props) => {
  return (
    <FormField name={name}>
      {({ field }) => {
        const selectedCurrency = currencies.find(
          (currency) => currency.name === field.value
        )!;

        return (
          <React.Fragment>
            <Label>Fiat</Label>
            <FormField.Sheet>
              <Select>
                <Select.Trigger>
                  <Image
                    size={'20px'}
                    src={selectedCurrency.image}
                    alt={selectedCurrency.country}
                  />
                  <Select.Value
                    textAlign={'left'}
                    css={{ flex: 1 }}
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
                <Select.Content maxHeight={'200px'}>
                  {currencies.map((currency, index) => {
                    return (
                      <Select.Option
                        key={index}
                        textAlign={'left'}
                        value={currency.name}
                      >
                        <Image
                          size={'20px'}
                          src={currency.image}
                          alt={currency.name}
                        />
                        <Text
                          css={{ flex: 1 }}
                          textAlign={'left'}
                        >
                          {currency.country}
                        </Text>
                        <Text
                          color={'gray-60'}
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
            <FormField.Message />
          </React.Fragment>
        );
      }}
    </FormField>
  );
};

export default SelectFiat;
