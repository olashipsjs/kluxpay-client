import Flex from '@components/base/flex/Flex';
import Message from './Message';

const ChatBoard = () => {
  return (
    <Flex
      height={'full'}
      flexDirection={'column'}
    >
      <Message message={'Hello'} />
      <Message
        align={'end'}
        message={'Hi, how are you doing?'}
      />
    </Flex>
  );
};

export default ChatBoard;
