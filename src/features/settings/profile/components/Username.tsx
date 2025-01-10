import { Form, Formik } from 'formik';
import useUser from '@hooks/useUser';
import Box from '@components/base/box/Box';
import Toast from '@components/toast/Toast';
import Flex from '@components/base/flex/Flex';
import Grid from '@components/base/grid/Grid';
import { CHANGE_USERNAME } from '@graphql/auth';
import Button from '@components/base/button/Button';
import Heading from '@components/base/heading/Heading';
import FormField from '@components/formfield/FormField';
import useApolloMutation from '@hooks/useApolloMutation';
import TextField from '@components/base/textfield/TextField';

const Username = () => {
  const { user, setUser } = useUser();
  const [changeUsername, { loading, error, data }] = useApolloMutation(
    CHANGE_USERNAME,
    {
      onCompleted: (data: any) => {
        if (data && data.changeUsername) {
          setUser({
            type: 'CHANGE_USERNAME',
            payload: { username: data.changeUsername?.username },
          });
        }
      },
    }
  );

  const handleSubmit = async (values: { username: string }) => {
    await changeUsername({ variables: { username: values.username } });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ username: user ? user.username : '' }}
    >
      {({ values }) => {
        return (
          <Form>
            <Grid
              alignItems={'center'}
              gridTemplateColumns={{ sm: '1fr 1fr 1fr' }}
            >
              <Heading
                fontSize={14}
                fontWeight={'semibold'}
              >
                Username
              </Heading>

              <Box>
                <FormField name={'username'}>
                  <FormField.Sheet>
                    <TextField placeholder={'Enter new username'} />
                  </FormField.Sheet>
                  <FormField.Message />
                </FormField>
              </Box>

              <Flex
                flexDirection={'column'}
                alignItems={{ sm: 'end' }}
              >
                <Button
                  py={6}
                  px={10}
                  fontSize={13}
                  width={'fit'}
                  type={'submit'}
                  color={'gray-40'}
                  fontWeight={'semibold'}
                  borderColor={'gray-80'}
                  backgroundColor={'transparent'}
                  disabled={user?.username === values.username || loading}
                  _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
                >
                  <Button.Loader
                    visible={loading}
                    color={'gray-10'}
                  />
                  Change
                </Button>
              </Flex>

              {/* error toast */}
              <Toast visible={error !== undefined}>
                <Toast.Panel>
                  <Toast.TextContext>{error?.message}</Toast.TextContext>
                </Toast.Panel>
              </Toast>

              {/* success toast */}
              <Toast visible={data && data.changeUsername}>
                <Toast.Panel backgroundColor={'green-60'}>
                  <Toast.TextContext>
                    Username updated successfully
                  </Toast.TextContext>
                </Toast.Panel>
              </Toast>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Username;
