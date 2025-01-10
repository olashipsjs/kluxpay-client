import { useApolloClient } from '@apollo/client';
import { SEND_MAIL } from '@graphql/mail';
import { CREATE_TICKET } from '@graphql/ticket';

type Payload = {
  name: string;
  email: string;
  title: string;
  priority: string;
  category: string;
  description: string;
};

const useCreateTicket = () => {
  const client = useApolloClient();

  const createTicket = async (payload: Payload) => {
    try {
      const ticket = await client.mutate({
        mutation: CREATE_TICKET,
        variables: {
          name: payload.name,
          title: payload.title,
          email: payload.email,
          category: payload.category,
          priority: payload.priority,
          description: payload.description,
        },
      });

      const TICKET_ID = ticket?.data?.createTicket?.ticketId;

      if (!TICKET_ID) {
        throw new Error('Failed to create ticket. TICKET_ID is undefined');
      }

      // Send emails in parallel
      const ADMIN_EMAIL =
        import.meta.env.VITE_ADMIN_EMAIL_ADDRESS || 'devbylanre@gmail.com';

      await Promise.all([
        client.mutate({
          mutation: SEND_MAIL,
          variables: {
            template: 'ticket',
            recipients: payload.email,
            subject: `New Ticket: #${TICKET_ID} Submitted`,
            data: { ticketId: TICKET_ID, name: payload.name },
          },
        }),

        client.mutate({
          mutation: SEND_MAIL,
          variables: {
            template: 'new-ticket',
            subject: `New Ticket: #${TICKET_ID} Submitted`,
            recipients: ADMIN_EMAIL,
          },
        }),
      ]);

      const data = ticket?.data?.createTicket;

      return { data };
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  };

  return { createTicket };
};

export default useCreateTicket;
