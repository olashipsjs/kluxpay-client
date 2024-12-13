import Badge from '@components/badge/Badge';
import Button from '@components/base/button/Button';
import FormField from '@components/formfield/FormField';
import Iconify from '@components/base/iconify/Iconify';
import TextField from '@components/base/textfield/TextField';
import { Form, Formik } from 'formik';

const ChartBar = () => {
  return (
    <Formik
      onSubmit={() => null!}
      initialValues={{ message: '' }}
    >
      {() => {
        return (
          <Form>
            <FormField
              name={'message'}
              bottom={'0px'}
              position={'sticky'}
            >
              <FormField.Sheet
                rounded={12}
                minHeight={'40px'}
                alignItems={'center'}
                pe={8}
              >
                <TextField
                  fontSize={16}
                  name={'message'}
                  fontWeight={'regular'}
                  placeholder={'Type a new message'}
                  css={{ flex: 1 }}
                />

                <Badge
                  px={8}
                  py={4}
                  rounded={'full'}
                  backgroundColor={'red-60'}
                >
                  <Badge.Caption
                    fontSize={12}
                    color={'white'}
                  >
                    10:29s
                  </Badge.Caption>
                </Badge>

                <Button
                  p={0}
                  ms={8}
                  size={'28px'}
                  rounded={'full'}
                  type={'submit'}
                >
                  <Iconify
                    width={'20px'}
                    icon={'mdi:chat'}
                  />
                </Button>
              </FormField.Sheet>
            </FormField>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ChartBar;
