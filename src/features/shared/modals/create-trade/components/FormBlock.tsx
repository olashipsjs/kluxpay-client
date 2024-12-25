import * as Yup from 'yup';
import useStep from '@hooks/useStep';
import { Form, Formik } from 'formik';
import FormField from '@components/formfield/FormField';
import Label from '@components/base/label/Label';
import TextField from '@components/base/textfield/TextField';
import Button from '@components/base/button/Button';

const validationSchema = Yup.object().shape({
  amount: Yup.string().required('Enter an amount'),
});

const FormBlock = () => {
  const { data, next } = useStep<any>();

  const handleSubmit = async (values: typeof data) => {
    next(values);
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {() => {
        return (
          <Form>
            <FormField name={'amount'}>
              <Label> Amount</Label>
              <FormField.Sheet>
                <TextField
                  type={'number'}
                  placeholder={'Enter an amount'}
                />
              </FormField.Sheet>
              <FormField.Message />
            </FormField>

            <Button
              mt={24}
              type={'submit'}
            >
              Confirm
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormBlock;