import useStep from '@hooks/useStep';
import { Form, Formik } from 'formik';
import Box from '@components/base/box/Box';
import Alert from '@components/alert/Alert';
import Grid from '@components/base/grid/Grid';
import Flex from '@components/base/flex/Flex';
import Button from '@components/base/button/Button';
import Iconify from '@components/base/iconify/Iconify';
import FormField from '@components/formfield/FormField';
import Textarea from '@components/base/textarea/Textarea';
import TextField from '@components/base/textfield/TextField';
import ButtonField from '@components/button-field/ButtonField';
import { otherValidationSchema } from '../schemas/validationSchema';
import Heading from '@components/base/heading/Heading';
import useAsync from '@hooks/useAsync';
import useCreateTicket from '../hooks/useCreateTicket';

const FormBlock = () => {
  const { data, next } = useStep<any>();
  const { createTicket } = useCreateTicket();
  const [async, { loading, error }] = useAsync(createTicket, {
    onCompleted: (ticket) => {
      next({ ...data, ...ticket });
    },
  });

  const handleSubmit = async (values: typeof data) => {
    await async(values);
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={otherValidationSchema}
    >
      {() => {
        return (
          <Form>
            <Box notLastChild={{ mb: 16 }}>
              <Heading
                fontSize={14}
                fontWeight={'semibold'}
              >
                Ticket details
              </Heading>

              <Grid gridTemplateColumns={'1fr 1fr'}>
                <FormField
                  gridColumn={2}
                  name={'title'}
                >
                  <FormField.Sheet rounded={'12px 12px 0px 0px'}>
                    <TextField
                      placeholder={"I'm unable to login to my account"}
                    />
                  </FormField.Sheet>
                </FormField>
                <FormField name={'name'}>
                  <FormField.Sheet rounded={'0px 0px 0px 12px'}>
                    <TextField placeholder={'Hannah Some'} />
                  </FormField.Sheet>
                </FormField>
                <FormField name={'email'}>
                  <FormField.Sheet rounded={'0px 0px 12px 0px'}>
                    <TextField placeholder={'hannahsome@gmail.com'} />
                  </FormField.Sheet>
                </FormField>
              </Grid>
              <FormField name={'description'}>
                <FormField.Sheet>
                  <Textarea
                    rows={5}
                    placeholder={'Leave a message'}
                  />
                  <FormField.Slot
                    right={'4px'}
                    bottom={'4px'}
                    position={'absolute'}
                  >
                    <Button
                      p={0}
                      size={'24px'}
                      color={'gray-60'}
                      borderColor={'gray-80'}
                      backgroundColor={'transparent'}
                      _hover={{ color: 'gray-10', backgroundColor: 'gray-90' }}
                    >
                      <Iconify icon={'fluent:attach-24-filled'} />
                    </Button>
                  </FormField.Slot>
                </FormField.Sheet>
              </FormField>

              <FormField name={'priority'}>
                <Flex gap={8}>
                  {['low', 'medium', 'high'].map((priority) => {
                    return (
                      <ButtonField
                        py={10}
                        key={priority}
                        value={priority}
                        backgroundColor={'white'}
                        textTransform={'capitalize'}
                      >
                        {priority}
                      </ButtonField>
                    );
                  })}
                </Flex>
              </FormField>
              <Button
                type={'submit'}
                disabled={loading}
              >
                <Button.Loader visible={loading} />
                Submit
              </Button>
              <Alert visible={error !== undefined}>
                <Alert.Message>{error?.message}</Alert.Message>
              </Alert>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormBlock;
