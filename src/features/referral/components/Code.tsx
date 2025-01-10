import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Grid from '@components/base/grid/Grid';
import Heading from '@components/base/heading/Heading';
import TextField from '@components/base/textfield/TextField';
import Clipboard from '@components/clipboard/Clipboard';
import FormField from '@components/formfield/FormField';
import useUser from '@hooks/useUser';
import { Form, Formik } from 'formik';

const Code = () => {
  const { user } = useUser();

  return (
    <Grid
      gap={12}
      alignItems={'start'}
      gridTemplateColumns={{ sm: '1fr 1fr 1fr' }}
    >
      <Heading
        fontSize={13}
        fontWeight={'semibold'}
      >
        Referral Code
      </Heading>

      <Formik
        initialValues={{ referralCode: user?.referralCode }}
        onSubmit={() => null!}
      >
        {({ values }) => {
          return (
            <Form>
              <FormField name={'referralCode'}>
                <FormField.Sheet disabled>
                  <TextField
                    fontWeight={'semibold'}
                    placeholder={'Your referral code'}
                    value={`kluxpay.com/invite/${values.referralCode}`}
                  />
                </FormField.Sheet>
              </FormField>
            </Form>
          );
        }}
      </Formik>

      <Flex justifyContent={{ sm: 'end' }}>
        <Clipboard>
          {({ handleCopy, copied }) => {
            return (
              <Button
                py={6}
                px={10}
                fontSize={13}
                maxWidth={'fit'}
                color={'gray-60'}
                borderColor={'gray-80'}
                fontWeight={'semibold'}
                backgroundColor={'white'}
                onClick={() => handleCopy(user?.referralCode || '')}
                _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
              >
                {copied ? 'Copied Code' : 'Copy Code'}
              </Button>
            );
          }}
        </Clipboard>
      </Flex>
    </Grid>
  );
};

export default Code;
