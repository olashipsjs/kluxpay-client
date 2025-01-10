import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Text from '@components/base/text/Text';
import useSocket from '@hooks/useSocket';
import useTrades from '@hooks/useTrades';
import useUser from '@hooks/useUser';
import { format, isToday } from 'date-fns';

const Messages = () => {
  const { user } = useUser();
  const { trade } = useTrades();
  const { messages } = useSocket(trade?._id || '');

  return (
    <Box
      mt={32}
      pb={80}
      height={'100vh'}
      overflowY={'scroll'}
    >
      {Object.keys(messages).map((key: string, index: number) => {
        const date = new Date(key);

        return (
          <Box key={index}>
            <Flex
              alignItems={'center'}
              flexDirection={'column'}
            >
              <Text fontSize={12}>
                {isToday(date) ? 'Today' : `${format(date, 'LLL d')}`}
              </Text>
            </Flex>

            <Box
              mt={24}
              notLastChild={{ mb: 4 }}
            >
              {messages[key].map((message) => {
                const sender = message.sender._id !== user?._id;

                return (
                  <Flex
                    px={20}
                    key={message._id}
                    flexDirection={'column'}
                    alignItems={sender ? 'start' : 'end'}
                  >
                    <Box
                      py={8}
                      px={12}
                      rounded={10}
                      width={'fit'}
                      maxWidth={'80%'}
                      minWidth={'20%'}
                      my={sender ? 20 : 0}
                      border={sender ? 1 : '0'}
                      borderColor={'gray-90'}
                      backgroundColor={!sender ? 'gray-95' : 'transparent'}
                    >
                      <Text
                        fontSize={13}
                        color={'gray-10'}
                        lineHeight={'1.4'}
                        fontWeight={'medium'}
                      >
                        {message.text}
                      </Text>
                    </Box>
                  </Flex>
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Messages;
