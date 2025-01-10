import * as Yup from 'yup';
import useUser from '@hooks/useUser';
import { Form, Formik } from 'formik';
import { UPDATE_USER } from '@graphql/user';
import Toast from '@components/toast/Toast';
import Grid from '@components/base/grid/Grid';
import Flex from '@components/base/flex/Flex';
import Button from '@components/base/button/Button';
import Heading from '@components/base/heading/Heading';
import FormField from '@components/formfield/FormField';
import useApolloMutation from '@hooks/useApolloMutation';
import TextField from '@components/base/textfield/TextField';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Enter your first name'),
  lastName: Yup.string().required('Enter your Last name'),
});

const Names = () => {
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

  const handleSubmit = async (values: typeof initialValues) => {
    await updateUser({ variables: values });
  };

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ values }) => {
        return (
          <Form>
            <Grid
              gap={12}
              alignItems={'center'}
              gridTemplateColumns={{ sm: '1fr 1fr 1fr' }}
            >
              <Heading
                fontSize={14}
                fontWeight={'semibold'}
              >
                Legal names
              </Heading>

              <Flex gap={8}>
                <FormField name={'firstName'}>
                  <FormField.Sheet alignItems={'center'}>
                    <TextField placeholder={'e.g John'} />
                  </FormField.Sheet>
                  <FormField.Message />
                </FormField>

                <FormField name={'lastName'}>
                  <FormField.Sheet alignItems={'center'}>
                    <TextField placeholder={'e.g Doe'} />
                  </FormField.Sheet>
                  <FormField.Message />
                </FormField>
              </Flex>

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
                  backgroundColor={'white'}
                  _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
                  disabled={
                    (values.firstName === user?.firstName &&
                      values.lastName === user?.lastName) ||
                    loading
                  }
                >
                  <Button.Loader
                    color={'gray-10'}
                    visible={loading}
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
              <Toast visible={data && data.updateUser}>
                <Toast.Panel backgroundColor={'green-60'}>
                  <Toast.TextContext>
                    Legal names updated successfully
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

export default Names;
