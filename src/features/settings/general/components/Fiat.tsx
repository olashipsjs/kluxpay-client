import React from 'react';
import useUser from '@hooks/useUser';
import { Form, Formik } from 'formik';
import { UPDATE_USER } from '@graphql/user';
import Flex from '@components/base/flex/Flex';
import Grid from '@components/base/grid/Grid';
import Text from '@components/base/text/Text';
import { GET_ALL_FIATS } from '@graphql/fiat';
import Select from '@components/select/Select';
import useApolloQuery from '@hooks/useApolloQuery';
import Button from '@components/base/button/Button';
import Heading from '@components/base/heading/Heading';
import FormField from '@components/formfield/FormField';
import useApolloMutation from '@hooks/useApolloMutation';
import Toast from '@components/toast/Toast';

const Fiat = () => {
  const { user, setUser } = useUser();
  const [updateUser, { loading, error, data }] = useApolloMutation(
    UPDATE_USER,
    {
      onCompleted: (data) => {
        if (data && data.updateUser) {
          setUser({ type: 'UPDATE_USER', payload: { user: data?.updateUser } });
        }
      },
    }
  );

  const { data: fiatsData } = useApolloQuery(GET_ALL_FIATS);
  const fiats = fiatsData?.getAllFiats;

  const handleSubmit = async (values: any) => {
    await updateUser({ variables: { fiat: values.fiat } });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ fiat: user?.fiat.symbol || '' }}
    >
      {({ values }) => {
        const fiat = fiats?.find((fiat: any) => fiat.symbol === values.fiat);

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
                Currency
              </Heading>

              <FormField name={'fiat'}>
                <React.Fragment>
                  <FormField.Sheet>
                    <Select>
                      <Select.Trigger height={'full'}>
                        <Select.Value
                          css={{ flex: 1 }}
                          color={'gray-10'}
                          textAlign={'left'}
                          fontWeight={'semibold'}
                        >
                          {fiat?.name}
                        </Select.Value>
                        <Select.Value
                          color={'gray-60'}
                          fontWeight={'regular'}
                        >
                          {fiat?.symbol}
                        </Select.Value>
                      </Select.Trigger>
                      <Select.Content maxHeight={'320px'}>
                        {fiats?.map((fiat: any) => {
                          return (
                            <Select.Option
                              key={fiat.id}
                              color={'gray-10'}
                              value={fiat.symbol}
                            >
                              {fiat.name}
                              <Text
                                color={'gray-60'}
                                css={{ flex: 1 }}
                                textAlign={'right'}
                                fontWeight={'regular'}
                              >
                                {fiat.symbol}
                              </Text>
                            </Select.Option>
                          );
                        })}
                      </Select.Content>
                    </Select>
                  </FormField.Sheet>
                </React.Fragment>
              </FormField>

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
                  borderColor={'gray-80'}
                  fontWeight={'semibold'}
                  backgroundColor={'white'}
                  disabled={loading || values.fiat === user?.fiat.name}
                  _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
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
                    App base currency(fiat) changed successfully.
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

export default Fiat;
