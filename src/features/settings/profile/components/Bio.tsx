import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Grid from '@components/base/grid/Grid';
import Heading from '@components/base/heading/Heading';
import Textarea from '@components/base/textarea/Textarea';
import FormField from '@components/formfield/FormField';
import Toast from '@components/toast/Toast';
import { UPDATE_USER } from '@graphql/user';
import useApolloMutation from '@hooks/useApolloMutation';
import useUser from '@hooks/useUser';
import { Form, Formik } from 'formik';

const Bio = () => {
  const { user, setUser } = useUser();
  const [updateUser, { loading, error, data }] = useApolloMutation(
    UPDATE_USER,
    {
      onCompleted: (data) => {
        if (data && data.updateUser) {
          setUser({ type: 'UPDATE_USER', payload: { user: data.updateUser } });
        }
      },
    }
  );

  const handleSubmit = async (values: { bio: string }) => {
    await updateUser({ variables: { bio: values.bio } });
  };

  return (
    <Formik
      initialValues={{ bio: user?.bio || '' }}
      onSubmit={handleSubmit}
    >
      {({ values }) => {
        return (
          <Form>
            <Grid
              gap={12}
              gridTemplateColumns={{ sm: '1fr 1fr 1fr' }}
            >
              <Heading
                fontSize={14}
                fontWeight={'semibold'}
              >
                Bio
              </Heading>

              <FormField name={'bio'}>
                <FormField.Sheet>
                  <Textarea
                    rows={4}
                    placeholder={'An trusted bitcoin trader'}
                  />
                </FormField.Sheet>
              </FormField>

              <Flex
                alignItems={{ sm: 'end' }}
                flexDirection={'column'}
              >
                <Button
                  py={6}
                  px={10}
                  width={'fit'}
                  fontSize={13}
                  type={'submit'}
                  color={'gray-40'}
                  fontWeight={'semibold'}
                  borderColor={'gray-80'}
                  backgroundColor={'transparent'}
                  disabled={values.bio === user?.bio || loading}
                  _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
                >
                  <Button.Loader
                    color={'gray-10'}
                    visible={loading}
                  />
                  Change Bio
                </Button>
              </Flex>

              {/* error toast */}
              <Toast visible={error !== undefined}>
                <Toast.Panel>
                  <Toast.TextContext>{error?.message}</Toast.TextContext>
                </Toast.Panel>
              </Toast>

              {/* success toast */}
              <Toast visible={data && data.updateUser}>
                <Toast.Panel backgroundColor={'green-60'}>
                  <Toast.TextContext>
                    Biography data updated successfully
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

export default Bio;
