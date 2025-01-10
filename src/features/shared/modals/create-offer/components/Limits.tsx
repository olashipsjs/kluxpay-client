import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Label from '@components/base/label/Label';
import TextField from '@components/base/textfield/TextField';
import FormField from '@components/formfield/FormField';
import useStep from '@hooks/useStep';
import toNumber from '@utils/toNumber';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Header from './Header';

const validationSchema = Yup.object().shape({
  minLimit: Yup.string()
    .required('Enter trade minimum limit')
    .test('isMinLimit', 'Minimum limit cannot be less than 0', (value) => {
      const minLimit = toNumber(value);
      return minLimit > 0;
    }),
  maxLimit: Yup.string()
    .required('Enter trade maximum limit')
    .test('isMaxLimit', 'Minimum limit cannot be less than 0', (value) => {
      const minLimit = toNumber(value);
      return minLimit > 0;
    }),
});

const Limits = () => {
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
                <Heading fontSize={21}>Trade limits</Heading>

                <Box notLastChild={{ mb: 8 }}>
                  <FormField name={'minLimit'}>
                    <FormField.Sheet
                      alignItems={'center'}
                      ps={12}
                    >
                      <Label>Min. limit</Label>
                      <TextField
                        type={'number'}
                        css={{ flex: 1 }}
                        textAlign={'right'}
                        placeholder={'19,400'}
                      />
                    </FormField.Sheet>
                    <FormField.Message />
                  </FormField>
                  <FormField name={'maxLimit'}>
                    <FormField.Sheet
                      alignItems={'center'}
                      ps={12}
                    >
                      <Label>Max. limit</Label>
                      <TextField
                        type={'number'}
                        css={{ flex: 1 }}
                        textAlign={'right'}
                        placeholder={'98,700'}
                      />
                    </FormField.Sheet>
                    <FormField.Message />
                  </FormField>
                </Box>
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

export default Limits;
