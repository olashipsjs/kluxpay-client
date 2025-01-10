import Container from '@components/base/container/Container';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';

const Success = () => {
  return (
    <Container maxWidth={'400px'}>
      <Flex
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Iconify
          width={40}
          color={'green-60'}
          icon={'fluent:comment-multiple-checkmark-24-regular'}
        />

        <Heading
          mt={16}
          fontSize={19}
          textAlign={'center'}
        >
          Support ticket created
        </Heading>

        <Text
          mt={4}
          as={'p'}
          fontSize={14}
          textAlign={'center'}
        >
          A member of our customer support team will be reaching out to you
          shortly to assist with your inquiry and provide any help you might
          need.
        </Text>
      </Flex>
    </Container>
  );
};

export default Success;
