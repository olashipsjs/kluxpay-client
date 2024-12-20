import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import FormField from '@components/formfield/FormField';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Overlay from '@components/overlay/Overlay';
import Text from '@components/base/text/Text';
import { Form, Formik } from 'formik';
import React from 'react';
import useStep from 'src/hooks/useStep';
import * as Yup from 'yup';
import Divider from '@components/divider/Divider';
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
    icon: 'material-symbols-light:leaderboard-rounded',
    label: 'Offer will be listed to buyers.',
  },
  {
    title: 'I want to buy',
    value: 'buy',
    icon: 'material-symbols-light:payments-rounded',
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
                  <Radio value={type.value}>
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

          <Divider
            my={20}
            backgroundColor={'gray-90'}
          />

          <Flex
            px={20}
            gap={8}
          >
            <Overlay.Trigger
              color={'gray-30'}
              borderColor={'gray-90'}
              backgroundColor={'transparent'}
              _hover={{
                backgroundColor: 'gray-100',
              }}
            >
              Cancel
            </Overlay.Trigger>
            <Button type='submit'>Settings</Button>
          </Flex>
        </Form>
      </Formik>
    </React.Fragment>
  );
};

export default Type;
