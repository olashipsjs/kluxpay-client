import Image from '@components/base/image/Image';
import Label from '@components/base/label/Label';
import Text from '@components/base/text/Text';
import FormField from '@components/formfield/FormField';
import Select from '@components/select/Select';
import React from 'react';
import coins from 'src/constants/coins';

type Props = {
  name: string;
};

const SelectCoin = ({ name }: Props) => {
  return (
    <FormField name={name}>
      {({ field }) => {
        const selectedOption = coins.find((coin) => coin.id === field.value);

        return (
          <React.Fragment>
            <Label>Coins</Label>
            <FormField.Sheet>
              <Select defaultValue={coins[0].id}>
                <Select.Trigger
                  color={'gray-10'}
                  fontWeight={'medium'}
                  textTransform={'uppercase'}
                >
                  <Image
                    size={'18px'}
                    src={selectedOption?.image}
                  />
                  <Text
                    css={{ flex: 1 }}
                    textAlign={'left'}
                  >
                    {selectedOption?.symbol}
                  </Text>
                </Select.Trigger>
                <Select.Content>
                  {coins.map((coin) => {
                    return (
                      <Select.Option
                        key={coin.id}
                        value={coin.id}
                      >
                        <Image
                          size={'20px'}
                          rounded={'full'}
                          src={coin.image}
                        />
                        {coin.name}
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

export default SelectCoin;
