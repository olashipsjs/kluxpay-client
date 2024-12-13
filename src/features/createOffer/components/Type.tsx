import Box from '@components/base/box/Box';
import ButtonField from '@components/button-field/ButtonField';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import FormField from '@components/formfield/FormField';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Overlay from '@components/overlay/Overlay';
import Text from '@components/base/text/Text';
import { Form, Formik } from 'formik';
import gsap from 'gsap';
import React from 'react';
import useStep from 'src/hooks/useStep';
import * as Yup from 'yup';

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
    label:
      'Sell your digital assets to other users. This will be listed on the marketplace buy tab.',
  },
  {
    title: 'I want to buy',
    value: 'buy',
    icon: 'material-symbols-light:payments-rounded',
    label:
      'Purchase digital assets from other users. This will be listed on the marketplace sell tab.',
  },
];

const Type = () => {
  const { data, next } = useStep<any>();

  const handleSubmit = (values: any) => next(values);

  return (
    <React.Fragment>
      <Heading
        fontSize={{ initial: 21, sm: 24 }}
        letterSpacing={'xs'}
      >
        Trade type
      </Heading>

      <Formik
        initialValues={data}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <FormField
            name={'type'}
            mt={24}
            gapY={8}
            gapX={20}
          >
            {() => {
              return (
                <React.Fragment>
                  {types.map((type) => {
                    const handleClick = () => {
                      gsap.set('#check-icon', {
                        scale: 0,
                        opacity: 0,
                      });

                      gsap.to('#check-icon', {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        ease: 'back.out(1.5)',
                      });
                    };

                    return (
                      <Flex
                        px={8}
                        py={16}
                        gap={12}
                        rounded={12}
                        width={'full'}
                        height={'fit'}
                        key={type.value}
                        alignItems={'start'}
                        position={'relative'}
                        onClick={handleClick}
                        flexDirection={'row'}
                        backgroundColor={'gray-95'}
                      >
                        <Iconify
                          width={'3em'}
                          icon={type.icon}
                        />

                        <Box css={{ flex: 1 }}>
                          <Heading
                            as={'h4'}
                            fontSize={14}
                            textAlign={'left'}
                            letterSpacing={'xs'}
                          >
                            {type.title}
                          </Heading>

                          <Text
                            mt={6}
                            as={'p'}
                            fontSize={13}
                            lineHeight={'md'}
                            color={'gray-30'}
                            textAlign={'left'}
                          >
                            {type.label}
                          </Text>
                        </Box>

                        <ButtonField
                          p={0}
                          size={'20px'}
                          rounded={'full'}
                          value={type.value}
                          alignItems={'center'}
                          justifyContent={'center'}
                          backgroundColor={'white'}
                        >
                          {({ isActive }) => {
                            return (
                              <React.Fragment>
                                {isActive ? (
                                  <Iconify
                                    width={'1.75em'}
                                    icon={
                                      'material-symbols-light:check-circle-rounded'
                                    }
                                  />
                                ) : null}
                              </React.Fragment>
                            );
                          }}
                        </ButtonField>
                      </Flex>
                    );
                  })}

                  <FormField.Message />
                </React.Fragment>
              );
            }}
          </FormField>

          <Flex
            mt={24}
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
