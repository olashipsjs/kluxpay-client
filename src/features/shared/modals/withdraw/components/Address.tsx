import * as Yup from 'yup';
import useStep from '@hooks/useStep';
import { Form, Formik } from 'formik';
import Label from '@components/base/label/Label';
import Button from '@components/base/button/Button';
import FormField from '@components/formfield/FormField';
import TextField from '@components/base/textfield/TextField';

const Address = () => {
  const { data, next } = useStep<any>();

  const validationSchema = Yup.object({
    recipient: Yup.string().required('Enter recipient wallet address'),
  });

  const handleSubmit = (values: typeof data) => {
    next(values);
    // TODO: Send transaction to blockchain
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
            <FormField name={'recipient'}>
              <Label>Receiving address</Label>
              <TextField
                px={0}
                placeholder={'Enter wallet address'}
              />
              <FormField.Message />
            </FormField>

            <Button
              mt={64}
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

export default Address;
