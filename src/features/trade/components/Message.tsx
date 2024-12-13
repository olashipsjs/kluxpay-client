import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';

const Message = ({
  message,
  align = 'start',
}: {
  message: string;
  align?: 'start' | 'end';
}) => {
  return (
    <Flex
      mt={32}
      width={'full'}
      justifyContent={align}
    >
      <Box
        minWidth={'40%'}
        maxWidth={'60%'}
      >
        <Flex
          gap={6}
          alignItems={'center'}
        >
          <Avatar
            hasError
            size={'24px'}
            backgroundColor={'gray-100'}
          >
            <Avatar.Fallback>M</Avatar.Fallback>
          </Avatar>
          <Heading
            as={'h4'}
            fontSize={14}
            letterSpacing={'xs'}
            css={{ flex: 1 }}
          >
            Mark Wullenberg
          </Heading>

          <Text fontSize={13}>22:40</Text>
        </Flex>

        <Box
          mt={4}
          py={8}
          px={16}
          rounded={12}
          backgroundColor={'gray-95'}
        >
          <Text
            fontSize={16}
            color={'gray-40'}
            lineHeight={'xl'}
          >
            {message}
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Message;
