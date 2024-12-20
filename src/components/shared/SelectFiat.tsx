import Iconify from '@components/base/iconify/Iconify';
import Label from '@components/base/label/Label';
import FormField from '@components/formfield/FormField';
import Select from '@components/select/Select';
import useGetCurrencies from '@hooks/useGetCurrencies';

type Props = {
  name: string;
};

const SelectFiat = ({ name }: Props) => {
  const { currencies } = useGetCurrencies();

  return (
    <FormField name={name}>
      <Label>Fiat</Label>
      <FormField.Sheet>
        <Select>
          <Select.Trigger
            color={'gray-30'}
            textTransform={'uppercase'}
          >
            <Select.Value />
          </Select.Trigger>
          <Select.Content height={'200px'}>
            {currencies
              ? currencies.map((currency: string) => {
                  return (
                    <Select.Option
                      fontSize={13}
                      key={currency}
                      value={currency}
                      textTransform={'uppercase'}
                    >
                      <Iconify
                        width={'16px'}
                        color={'gray-50'}
                        icon={'ph:tag-fill'}
                      />
                      {currency}
                    </Select.Option>
                  );
                })
              : null}
          </Select.Content>
        </Select>
      </FormField.Sheet>
      <FormField.Message />
    </FormField>
  );
};

export default SelectFiat;
