import { Form, Formik } from 'formik';
import FormField from '@components/formfield/FormField';
import TextField from '@components/base/textfield/TextField';
import Button from '@components/base/button/Button';
import Iconify from '@components/base/iconify/Iconify';
import useSocket from '@hooks/useSocket';
import { useParams } from 'react-router-dom';
import useUser from '@hooks/useUser';

const MessageBar = () => {
  const { user } = useUser();
  const { id } = useParams<{ id: string }>();

  const [sendMessage] = useSocket(id || '');

  const handleSubmit = (values: any, { resetForm }: any) => {
    sendMessage({
      tradeId: id || '',
      text: values.text,
      userId: user?._id || '',
    });

    resetForm();
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ text: '' }}
    >
      <Form>
        <FormField
          p={12}
          name={'text'}
        >
          <FormField.Sheet
            pe={'3px'}
            rounded={'full'}
            alignItems={'center'}
          >
            <TextField
              px={16}
              fontSize={14}
              placeholder="Say 'Hi'"
            />
            <Button
              p={4}
              size={'32px'}
              type={'submit'}
              rounded={'full'}
            >
              <Iconify
                width={24}
                icon={'fluent:chat-multiple-24-filled'}
              />
            </Button>
          </FormField.Sheet>
        </FormField>
      </Form>
    </Formik>
  );
};

export default MessageBar;
