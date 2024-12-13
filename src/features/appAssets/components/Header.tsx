import Box from '@components/base/box/Box';
import Text from '@components/base/text/Text';
import Heading from '@components/base/heading/Heading';

const Header = () => {
  return (
    <Box>
      <Heading>Markets Overview</Heading>
      <Text
        mt={8}
        as={'p'}
        fontSize={17}
        color={'gray-50'}
        lineHeight={'md'}
      >
        Explore popular assets on bitcoin, ethereum, arbitrum, solana and all
        other popular network.
      </Text>
    </Box>
  );
};

export default Header;
