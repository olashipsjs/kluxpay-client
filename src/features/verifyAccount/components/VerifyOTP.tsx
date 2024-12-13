import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import FormField from '@components/formfield/FormField';
import Heading from '@components/base/heading/Heading';
import Label from '@components/base/label/Label';
import Text from '@components/base/text/Text';
import TextField from '@components/base/textfield/TextField';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .required('Enter your verification code.')
    .min(4, 'Must be at least 4 characters long'),
});

const VerifyOTP = () => {
  return (
    <Box>
      <Heading
        fontSize={19}
        // textAlign={'center'}
        letterSpacing={'md'}
      >
        Verify your account
      </Heading>
      <Text
        as={'p'}
        mt={8}
        fontSize={14}
        color={'gray-50'}
        lineHeight={'lg'}
        // textAlign={'center'}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sed fugit
        velit itaque, explicabo exercitationem aut minima quis.
      </Text>

      <Formik
        onSubmit={() => null!}
        initialValues={{ code: '' }}
        validationSchema={validationSchema}
      >
        {() => {
          return (
            <Form>
              <FormField
                mt={24}
                name='code'
              >
                <Label htmlFor='code'>OTP</Label>
                <FormField.Sheet>
                  <TextField name='code' />
                </FormField.Sheet>
                <FormField.Message />
              </FormField>

              <Button
                type={'submit'}
                mt={16}
              >
                Confirm Code
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default VerifyOTP;
