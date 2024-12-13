import Badge from '@components/badge/Badge';
import Heading from '@components/base/heading/Heading';
import Image from '@components/base/image/Image';
import Select from '@components/select/Select';
import Text from '@components/base/text/Text';
import React from 'react';
import useFormField from 'src/hooks/useFormField';

type Props = {
  country: {
    flags: { png: string; svg: string };
    name: { common: string; official: string };
    idd: { root: string; suffixes: string[] };
    cca2: string;
  };
};

const Country = ({ country }: Props) => {
  const { field } = useFormField();

  const countryCode = `${country.idd.root}${
    country.idd.suffixes[0]?.length < 3 ? country.idd.suffixes[0] : ''
  }`;

  if (!countryCode) return null;

  return (
    <Select.Option
      name={field.name}
      value={country.name.common}
    >
      <Image
        size={'16px'}
        rounded={'full'}
        src={country.flags.png}
        boxShadow={'ringGray90'}
        alt={country.name.official}
      />
      <Heading
        as={'h6'}
        fontSize={14}
        css={{ flex: 1 }}
        textAlign={'left'}
      >
        {country.name.common}
      </Heading>
      <Badge
        py={4}
        px={8}
        rounded={'full'}
        boxShadow={'ringGray90'}
        backgroundColor={'transparent'}
      >
        <Badge.Caption
          fontSize={12}
          color={'gray-60'}
        >
          {countryCode}
        </Badge.Caption>
      </Badge>
    </Select.Option>
  );
};

export default React.memo(Country);
