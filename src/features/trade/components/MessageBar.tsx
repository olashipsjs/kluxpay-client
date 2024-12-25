import { Form, Formik } from 'formik';
import FormField from '@components/formfield/FormField';
import TextField from '@components/base/textfield/TextField';
import Button from '@components/base/button/Button';
import Iconify from '@components/base/iconify/Iconify';

const MessageBar = () => {
  const handleSubmit = () => {};

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ message: '' }}
    >
      <Form>
        <FormField name={'message'}>
          <FormField.Sheet
            pe={'3px'}
            rounded={'full'}
            alignItems={'center'}
            backgroundColor={'gray-100'}
          >
            <TextField placeholder='Type a message...' />
            <Button
              p={4}
              size={'32px'}
              rounded={'full'}
            >
              <Iconify
                width={20}
                icon={'fluent:arrow-hook-up-right-24-filled'}
              />
            </Button>
          </FormField.Sheet>
        </FormField>
      </Form>
    </Formik>
  );
};

export default MessageBar;
