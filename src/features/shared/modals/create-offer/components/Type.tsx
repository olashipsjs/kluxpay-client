import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import FormField from '@components/formfield/FormField';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import { Form, Formik } from 'formik';
import React from 'react';
import useStep from 'src/hooks/useStep';
import * as Yup from 'yup';
import Label from '@components/base/label/Label';
import Radio from '@components/base/radio/Radio';

const validationSchema = Yup.object().shape({
  type: Yup.string()
    .required('Select trade type')
    .oneOf(['buy', 'sell'], 'Invalid trade type'),
});

const types = [
  {
    title: 'I want to sell',
    value: 'sell',
    icon: 'fluent:people-money-24-filled',
    label: 'Offer will be listed to buyers.',
  },
  {
    title: 'I want to buy',
    value: 'buy',
    icon: 'fluent:person-money-24-filled',
    label: 'Offer will be listed to sellers.',
  },
];

const Type = () => {
  const { data, next } = useStep<any>();

  const handleSubmit = (values: any) => next(values);

  return (
    <React.Fragment>
      <Formik
        initialValues={data}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <FormField
            px={20}
            gapY={8}
            gapX={20}
            name={'type'}
          >
            <Label>Choose an option</Label>

            <Box
              border={1}
              rounded={12}
              overflow={'clip'}
              borderColor={'gray-80'}
              boxShadow={'0px .5px 1px 0px rgb(var(--gray-90))'}
              notLastChild={{
                borderBottom: 1,
                borderBottomColor: 'gray-80',
              }}
            >
              {types.map((type) => {
                return (
                  <Radio
                    key={type.value}
                    value={type.value}
                  >
                    {({ isActive }) => {
                      return (
                        <React.Fragment>
                          <Radio.Switch
                            color={'white'}
                            backgroundColor={
                              isActive ? 'indigo-60' : 'transparent'
                            }
                            _hover={{
                              backgroundColor: isActive ? '' : 'gray-90',
                            }}
                          />

                          <Box css={{ flex: 1 }}>
                            <Heading
                              as={'h4'}
                              fontSize={14}
                              textAlign={'left'}
                              letterSpacing={'xs'}
                              fontWeight={'regular'}
                            >
                              {type.title}
                            </Heading>

                            <Text
                              mt={4}
                              as={'p'}
                              fontSize={13}
                              lineHeight={'md'}
                              color={'gray-60'}
                              textAlign={'left'}
                            >
                              {type.label}
                            </Text>
                          </Box>

                          <Iconify
                            color={'gray-60'}
                            width={'24px'}
                            icon={type.icon}
                          />
                        </React.Fragment>
                      );
                    }}
                  </Radio>
                );
              })}
            </Box>
            <FormField.Message />
          </FormField>

          <Flex
            mt={24}
            px={20}
            gap={8}
          >
            <Button type='submit'>Settings</Button>
          </Flex>
        </Form>
      </Formik>
    </React.Fragment>
  );
};

export default Type;
