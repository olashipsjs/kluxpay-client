import Alert from '@components/alert/Alert';
import Badge from '@components/badge/Badge';
import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Text from '@components/base/text/Text';
import { formatDistanceToNow } from 'date-fns';
import Overlay from '@components/overlay/Overlay';
import { GET_ALL_TICKETS } from '@graphql/ticket';
import useApolloQuery from '@hooks/useApolloQuery';
import Loader from '@components/loader/Loader';
import Heading from '@components/base/heading/Heading';
import TicketStatusFeature from '@features/shared/modals/ticket-status/Feature';

const TicketsFeature = () => {
  const { loading, error, data } = useApolloQuery(GET_ALL_TICKETS);

  const tickets = data && data.getAllTickets;

  return (
    <Box notLastChild={{ mb: 24 }}>
      <Heading>Tickets</Heading>

      <Loader
        color={'gray-10'}
        visible={loading}
      />

      <Alert
        timeout={0}
        maxWidth={'400px'}
        visible={error || (tickets && tickets.length === 0)}
      >
        <Alert.Message>No tickets found. Check back later.</Alert.Message>
      </Alert>

      <Box notLastChild={{ mb: 8 }}>
        {tickets?.map((ticket: any) => {
          return (
            <Box
              py={10}
              px={12}
              border={1}
              rounded={8}
              height={'fit'}
              width={'full'}
              key={ticket._id}
              borderColor={'gray-80'}
            >
              <Flex
                gap={12}
                alignItems={'center'}
              >
                <Heading
                  fontSize={14}
                  css={{ flex: 1 }}
                  fontWeight={'semibold'}
                >
                  {ticket.category}
                </Heading>
                <Text
                  fontSize={12}
                  color={'gray-60'}
                >
                  ID: {ticket.ticketId}
                </Text>

                <Overlay>
                  <Overlay.Trigger
                    py={4}
                    px={10}
                    fontSize={12}
                    width={'fit'}
                    color={'gray-10'}
                    borderColor={'gray-80'}
                    fontWeight={'semibold'}
                    backgroundColor={'white'}
                    _hover={{ backgroundColor: 'gray-100' }}
                  >
                    Edit
                  </Overlay.Trigger>
                  <TicketStatusFeature
                    ticketId={ticket._id}
                    status={ticket.status}
                  />
                </Overlay>
              </Flex>

              <Heading
                mt={12}
                fontSize={14}
              >
                {ticket.title}
              </Heading>
              <Text
                mt={2}
                as={'p'}
                fontSize={13}
                lineHeight={'1.36'}
              >
                {ticket.description}
              </Text>

              <Flex
                mt={12}
                gap={12}
                alignItems={'center'}
              >
                <Badge
                  py={6}
                  px={8}
                  border={1}
                  rounded={8}
                  borderColor={'gray-80'}
                  backgroundColor={'white'}
                >
                  <Badge.Caption
                    fontSize={12}
                    lineHeight={'1'}
                    color={'indigo-60'}
                    textTransform={'capitalize'}
                  >
                    {ticket.priority}
                  </Badge.Caption>
                </Badge>

                <Text
                  fontSize={12}
                  css={{ flex: 1 }}
                  color={'gray-10'}
                  textAlign={'right'}
                  fontWeight={'medium'}
                  textTransform={'capitalize'}
                >
                  {ticket.status}
                </Text>

                <Text
                  fontSize={12}
                  color={'gray-60'}
                  textAlign={'right'}
                >
                  {formatDistanceToNow(ticket.createdAt)}
                </Text>
              </Flex>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default TicketsFeature;
