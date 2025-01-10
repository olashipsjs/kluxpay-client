import { Form, Formik } from 'formik';
import Alert from '@components/alert/Alert';
import Grid from '@components/base/grid/Grid';
import Flex from '@components/base/flex/Flex';
import Button from '@components/base/button/Button';
import { CREATE_REFERRAL } from '@graphql/referral';
import Heading from '@components/base/heading/Heading';
import FormField from '@components/formfield/FormField';
import useApolloMutation from '@hooks/useApolloMutation';
import TextField from '@components/base/textfield/TextField';
import { invitationValidationSchema } from '../schemas/validationSchema';

const Invitation = () => {
  const [createReferral, { loading, error, data }] =
    useApolloMutation(CREATE_REFERRAL);

  const handleSubmit = async (values: any) => {
    await createReferral({
      variables: { referralCode: values.referralCode },
    });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ referralCode: '' }}
      validationSchema={invitationValidationSchema}
    >
      {() => {
        return (
          <Form>
            <Grid
              gap={12}
              alignItems={'start'}
              gridTemplateColumns={{ sm: '1fr 1fr 1fr' }}
            >
              <Heading
                fontSize={13}
                fontWeight={'semibold'}
              >
                Use a Code
              </Heading>

              <FormField name={'referralCode'}>
                <FormField.Sheet>
                  <TextField
                    fontWeight={'semibold'}
                    placeholder={'2D43R3E'}
                    textTransform={'uppercase'}
                  />
                </FormField.Sheet>
                <FormField.Message />
              </FormField>

              <Flex
                gap={12}
                flexDirection={'column'}
                alignItems={{ sm: 'end' }}
              >
                <Button
                  py={6}
                  px={10}
                  fontSize={13}
                  type={'submit'}
                  maxWidth={'fit'}
                  color={'gray-60'}
                  disabled={loading}
                  borderColor={'gray-80'}
                  fontWeight={'semibold'}
                  backgroundColor={'white'}
                  _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
                >
                  <Button.Loader
                    color={'gray-10'}
                    visible={loading}
                  />
                  Use Code
                </Button>
                <Alert
                  mx={'auto'}
                  right={'20px'}
                  top={'20px'}
                  maxWidth={'400px'}
                  position={'absolute'}
                  visible={error !== undefined}
                >
                  <Alert.Message>{error?.message}</Alert.Message>
                </Alert>
                <Alert
                  mx={'auto'}
                  right={'20px'}
                  top={'20px'}
                  maxWidth={'400px'}
                  position={'absolute'}
                  backgroundColor={'green-60'}
                  visible={data && data.createReferral}
                >
                  <Alert.Message>
                    You've been referred by{' '}
                    {`${data?.createReferral.referrer.firstName}`}
                    {` ${data?.createReferral.referrer.lastName}`}. Thank you
                    for being part of the journey!
                  </Alert.Message>
                </Alert>
              </Flex>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Invitation;
