import useStep from '@hooks/useStep';
import { Form, Formik } from 'formik';
import Box from '@components/base/box/Box';
import Grid from '@components/base/grid/Grid';
import Text from '@components/base/text/Text';
import categories from '../constants/categories';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import FormField from '@components/formfield/FormField';
import ButtonField from '@components/button-field/ButtonField';
import { categoryValidationSchema } from '../schemas/validationSchema';

const Category = () => {
  const { data, next } = useStep<any>();

  const handleSubmit = (values: typeof data) => {
    next({ ...data, ...values });
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={categoryValidationSchema}
    >
      {() => {
        return (
          <Form>
            <Box notLastChild={{ mb: 16 }}>
              <Heading
                fontSize={14}
                fontWeight={'semibold'}
              >
                Category
              </Heading>
              <FormField name={'category'}>
                <Grid
                  gap={8}
                  gridTemplateColumns={{
                    initial: '1fr',
                    sm: '1fr 1fr',
                  }}
                >
                  {categories.map((category, index) => {
                    return (
                      <ButtonField
                        p={16}
                        gap={12}
                        key={index}
                        type={'submit'}
                        textAlign={'left'}
                        alignItems={'start'}
                        value={category.name}
                        fontWeight={'regular'}
                        justifyContent={'start'}
                        backgroundColor={'white'}
                      >
                        <Iconify
                          width={20}
                          color={'indigo-60'}
                          icon={category.icon}
                        />
                        <Box css={{ flex: 1 }}>
                          <Heading fontSize={14}>{category.name}</Heading>
                          <Text
                            mt={8}
                            as={'p'}
                            fontSize={13}
                            lineHeight={'1.36'}
                          >
                            {category.description}
                          </Text>
                        </Box>
                      </ButtonField>
                    );
                  })}
                </Grid>
              </FormField>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Category;
