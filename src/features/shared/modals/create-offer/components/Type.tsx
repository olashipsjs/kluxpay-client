import * as Yup from 'yup';
import useStep from '@hooks/useStep';
import { Form, Formik } from 'formik';
import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Text from '@components/base/text/Text';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import FormField from '@components/formfield/FormField';
import ButtonField from '@components/button-field/ButtonField';
import Header from './Header';

const validationSchema = Yup.object().shape({
  type: Yup.string().required('Select an option'),
});

const Type = () => {
  const { data, next } = useStep<any>();

  const handleSubmit = (values: typeof data) => {
    next({ ...data, ...values });
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values }) => {
        const types = [
          {
            value: 'sell',
            title: `sell ${values.coin.symbol}`,
            icon: 'fluent:arrow-forward-24-regular',
            description: `Your offer will be listed on the Buy ${values.coin.symbol} tab`,
          },
          {
            value: 'buy',
            title: `buy ${values.coin.symbol}`,
            icon: 'fluent:arrow-reply-down-24-regular',
            description: `Your offer will be listed on the Sell ${values.coin.symbol} tab`,
          },
        ];

        return (
          <Form>
            <Flex
              minHeight={'60vh'}
              flexDirection={'column'}
            >
              <Header data={values} />

              <Box
                p={16}
                css={{ flex: 1 }}
                notLastChild={{ mb: 24 }}
              >
                <Heading fontSize={21}>
                  Want to buy or sell {values.coin.symbol}?
                </Heading>
                <FormField name={'type'}>
                  <Box notLastChild={{ mb: 4 }}>
                    {types.map((type) => {
                      const isActive = type.value === values.type;

                      return (
                        <ButtonField
                          py={8}
                          gap={12}
                          type={'submit'}
                          key={type.value}
                          textAlign={'left'}
                          value={type.value}
                          color={'indigo-60'}
                          justifyContent={'start'}
                        >
                          <Iconify
                            width={20}
                            icon={type.icon}
                            color={'indigo-60'}
                          />
                          <Box css={{ flex: 1 }}>
                            <Heading
                              fontSize={14}
                              textTransform={'capitalize'}
                            >
                              {type.title}
                            </Heading>
                            <Text
                              mt={6}
                              as={'p'}
                              fontSize={13}
                              color={'gray-60'}
                              fontWeight={'regular'}
                            >
                              {type.description}
                            </Text>
                          </Box>

                          {isActive ? (
                            <Iconify
                              width={20}
                              color={'indigo-60'}
                              icon={'fluent:checkmark-starburst-24-filled'}
                            />
                          ) : null}
                        </ButtonField>
                      );
                    })}
                  </Box>

                  <FormField.Message />
                </FormField>
              </Box>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Type;
