import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import ButtonField from '@components/button-field/ButtonField';
import FormField from '@components/formfield/FormField';
import useStep from '@hooks/useStep';
import { Form, Formik } from 'formik';
import Header from './Header';

const Duration = () => {
  const { data, next } = useStep<any>();

  const handleSubmit = (values: typeof data) => {
    next({ ...data, ...values });
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
    >
      {({ values }) => {
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
                <Heading fontSize={21}>Duration</Heading>

                <FormField name={'timeout'}>
                  {[15, 30, 60, 90].map((value) => {
                    return (
                      <ButtonField
                        py={12}
                        key={value}
                        value={value}
                      >
                        {value} Minutes
                      </ButtonField>
                    );
                  })}
                </FormField>
              </Box>

              <Box p={16}>
                <Button type={'submit'}>Next</Button>
              </Box>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Duration;
