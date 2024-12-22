import Anchor from '@components/anchor/Anchor';
import Box from '@components/base/box/Box';
import Container from '@components/base/container/Container';
import Heading from '@components/base/heading/Heading';
import Section from '@components/base/section/Section';
import Text from '@components/base/text/Text';

const NotFoundFeature = () => {
  return (
    <Section
      minHeight={'screen'}
      backgroundColor={'gray-10'}
    >
      <Container
        mx={'0'}
        pt={64}
        maxWidth={'480px'}
        px={{ initial: 16, sm: 64 }}
      >
        <Box>
          <Heading color={'white'}>Something went wrong</Heading>
          <Text
            mt={6}
            as={'p'}
            fontSize={13}
            color={'gray-60'}
          >
            The content you're trying to access might not be visible because
            you're not signed in. You can return to Homepage using the button
            below.
          </Text>

          <Anchor
            py={4}
            mt={24}
            px={16}
            fontSize={13}
            color={'white'}
            to={'/auth/login/'}
            backgroundColor={'indigo-60'}
            _hover={{ color: 'white', backgroundColor: 'indigo-70' }}
          >
            Home
          </Anchor>
        </Box>
      </Container>
    </Section>
  );
};

export default NotFoundFeature;
