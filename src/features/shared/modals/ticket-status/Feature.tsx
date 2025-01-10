import Alert from '@components/alert/Alert';
import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Label from '@components/base/label/Label';
import FormField from '@components/formfield/FormField';
import Overlay from '@components/overlay/Overlay';
import Select from '@components/select/Select';
import { CHANGE_TICKET_STATUS } from '@graphql/ticket';
import useApolloMutation from '@hooks/useApolloMutation';
import { Form, Formik } from 'formik';

type Props = { ticketId: string; status: string };

const TicketStatusFeature = ({ ticketId, status }: Props) => {
  const [changeTicketStatus, { loading, error, data }] =
    useApolloMutation(CHANGE_TICKET_STATUS);

  const handleSubmit = async (values: { status: string }) => {
    await changeTicketStatus({
      variables: { ticketId, status: values.status },
    });
  };

  const newStatus = (data && data.changeTicketStatus.status) || status;

  return (
    <Overlay.Panel justifyContent={'end'}>
      <Overlay.Background />
      <Overlay.Content
        p={12}
        gap={20}
        maxWidth={'400px'}
      >
        <Flex
          alignItems={'center'}
          justifyContent={'between'}
        >
          <Heading fontSize={19}>Change Status</Heading>
          <Overlay.Trigger
            py={6}
            px={10}
            width={'fit'}
            color={'gray-60'}
            borderColor={'gray-80'}
            backgroundColor={'white'}
            _hover={{
              color: 'white',
              borderColor: 'red-60',
              backgroundColor: 'red-60',
            }}
          >
            Cancel
          </Overlay.Trigger>
        </Flex>

        <Formik
          enableReinitialize
          onSubmit={handleSubmit}
          initialValues={{ status: newStatus }}
        >
          <Form>
            <Box notLastChild={{ mb: 16 }}>
              <FormField name={'status'}>
                <Label>Status</Label>
                <FormField.Sheet>
                  <Select>
                    <Select.Trigger>
                      <Select.Value textTransform={'capitalize'} />
                    </Select.Trigger>
                    <Select.Content top={'61%'}>
                      <Select.Option value={'open'}>Open</Select.Option>
                      <Select.Option value={'in-progress'}>
                        In-Progress
                      </Select.Option>
                      <Select.Option value={'resolved'}>Resolved</Select.Option>
                      <Select.Option value={'closed'}>Closed</Select.Option>
                    </Select.Content>
                  </Select>
                </FormField.Sheet>
              </FormField>
              <Button
                type={'submit'}
                disabled={loading}
              >
                <Button.Loader visible={loading} />
                Update
              </Button>
              <Alert visible={error !== undefined}>
                <Alert.Message>{error?.message}</Alert.Message>
              </Alert>
            </Box>
          </Form>
        </Formik>
      </Overlay.Content>
    </Overlay.Panel>
  );
};

export default TicketStatusFeature;
