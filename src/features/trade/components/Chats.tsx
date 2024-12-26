import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Text from '@components/base/text/Text';
import useSocket from '@hooks/useSocket';
import useUser from '@hooks/useUser';
import { useParams } from 'react-router-dom';

const Chats = () => {
  const { user } = useUser();
  const { id } = useParams<{ id: string }>();

  const [_, { messages }] = useSocket(id || '');

  return (
    <Box
      pb={{ initial: 64, md: 48 }}
      overflow={'clip'}
    >
      {Object.entries(messages).map(([time, group]) => {
        return (
          <Flex
            p={12}
            gap={12}
            key={time}
            flexDirection={'column'}
          >
            <Flex
              width={'full'}
              justifyContent={'center'}
            >
              <Button
                py={6}
                width={'fit'}
                fontSize={12}
                color={'gray-10'}
                borderColor={'gray-90'}
                backgroundColor={'white'}
                boxShadow={'0px .5px 0px 0px rgba(var(--gray-80))'}
              >
                {new Date(time).toLocaleDateString('default', {
                  month: 'short',
                  day: 'numeric',
                })}
              </Button>
            </Flex>
            <Box notLastChild={{ mb: 4 }}>
              {(group as any).map((msg: any) => {
                const IS_SENDER = user?._id === msg.sender._id;

                return (
                  <Flex
                    key={msg._id}
                    width={'full'}
                    flexDirection={'column'}
                    alignItems={IS_SENDER ? 'end' : 'start'}
                  >
                    <Box
                      py={6}
                      px={12}
                      rounded={12}
                      minWidth={'100px'}
                      maxWidth={{ initial: '256px', sm: '372px' }}
                      backgroundColor={IS_SENDER ? 'gray-95' : 'white'}
                    >
                      <Text
                        as={'p'}
                        lineHeight={'1'}
                        fontSize={'1rem'}
                        color={'gray-60'}
                      >
                        {new Date(msg.createdAt).toLocaleTimeString('default', {
                          timeStyle: 'short',
                        })}
                      </Text>
                      <Text
                        as={'p'}
                        color={'gray-10'}
                        fontWeight={'medium'}
                        fontSize={{ initial: 13, sm: 14 }}
                        css={{
                          whiteSpace: 'pretty',
                        }}
                      >
                        {msg.text.trim()}
                      </Text>
                    </Box>
                  </Flex>
                );
              })}
            </Box>
          </Flex>
        );
      })}
    </Box>
  );
};

export default Chats;
