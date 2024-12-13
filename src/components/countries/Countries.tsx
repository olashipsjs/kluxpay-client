import React from 'react';
import Country from './Country';
import Box from '@components/base/box/Box';
import Text from '@components/base/text/Text';
import Image from '@components/base/image/Image';
import Select from '@components/select/Select';
import Button from '@components/base/button/Button';
import Iconify from '@components/base/iconify/Iconify';
import useFormField from 'src/hooks/useFormField';
import useFetchCountries from 'src/hooks/useFetchCountries';

const Countries = () => {
  const { field } = useFormField();
  const { countries, isLoading } = useFetchCountries();

  const sortedCountries = React.useMemo(() => {
    if (Array.isArray(countries)) {
      return [...countries].sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
    }
    return [];
  }, [countries]);

  const selectedCountry = React.useMemo(() => {
    if (Array.isArray(sortedCountries)) {
      return sortedCountries.find(
        (country) => country.name.common === field.value
      );
    }
    return undefined;
  }, [field.value, sortedCountries]);

  const value = {
    shortName: selectedCountry ? selectedCountry.cca2 : '',
    name: selectedCountry ? selectedCountry.name.common : '',
    flag: selectedCountry ? selectedCountry.flags.png : '',
    countryCode: selectedCountry
      ? `${selectedCountry.idd.root}${
          selectedCountry.idd.suffixes[0]?.length < 3
            ? selectedCountry.idd.suffixes[0]
            : ''
        }`
      : '',
  };

  return (
    <Select>
      {({ domRect }) => {
        return (
          <React.Fragment>
            <Select.Trigger
              py={0}
              px={8}
              gap={8}
              rounded={6}
              size={'full'}
              color={'gray-10'}
              fontWeight={'regular'}
              borderColor={'transparent'}
              _hover={{
                color: 'gray-70',
              }}
            >
              <Button.Loader visible={isLoading} />
              {!isLoading ? (
                <React.Fragment>
                  <Image
                    size={'20px'}
                    rounded={'full'}
                    alt={value.name}
                    src={value.flag}
                    boxShadow={'ringGray95'}
                  />
                  <Text
                    fontSize={16}
                    css={{ flex: 1 }}
                  >
                    {value.shortName} {value.countryCode}
                  </Text>
                  <Iconify
                    width={'0.8em'}
                    icon={'bi:caret-down-fill'}
                  />
                </React.Fragment>
              ) : null}
            </Select.Trigger>
            <Select.Content
              rounded={12}
              maxHeight={'240px'}
              boxShadow={'ringGray90'}
              left={String(domRect?.left) + 'px'}
              width={String(domRect?.width) + 'px'}
              top={domRect ? String(domRect.top + 42) + 'px' : '0px'}
            >
              <Box
                height={'320px'}
                overflowY={'scroll'}
                notLastChild={{
                  borderBottom: 1,
                  borderColor: 'green-95',
                }}
              >
                {isLoading ? (
                  <Iconify
                    width={'2.5em'}
                    icon={'line-md:loading-twotone-loop'}
                  />
                ) : Array.isArray(sortedCountries) ? (
                  sortedCountries.map((country: any) => {
                    return (
                      <Country
                        country={country}
                        key={country.name.common}
                      />
                    );
                  })
                ) : null}
              </Box>
            </Select.Content>
          </React.Fragment>
        );
      }}
    </Select>
  );
};

export default React.memo(Countries);
