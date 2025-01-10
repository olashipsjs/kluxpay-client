import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Text from '@components/base/text/Text';
import Button from '@components/base/button/Button';
import Heading from '@components/base/heading/Heading';

const Banner = () => {
  return (
    <Flex
      py={16}
      px={16}
      gap={16}
      border={1}
      rounded={8}
      alignItems={'start'}
      borderColor={'gray-90'}
      backgroundColor={'white'}
      flexDirection={{ initial: 'column', sm: 'row' }}
      boxShadow={'0px .5px 0px 0px rgba(var(--gray-80))'}
    >
      <Heading
        as={'h2'}
        fontSize={17}
        lineHeight={'1'}
        color={'indigo-60'}
      >
        1 USDT <Text as={'sup'}>+</Text>
      </Heading>
      <Box css={{ flex: 1 }}>
        <Heading
          as={'h3'}
          fontSize={14}
          lineHeight={'1.3'}
        >
          Earn 0.2 USDT for every friend you invite
        </Heading>
        <Text
          mt={4}
          as={'p'}
          fontSize={13}
          color={'gray-60'}
          lineHeight={'1.36'}
          fontWeight={'medium'}
        >
          Earn up to 0.2 USDT for each friend who uses your referral code. Plus
          1 USDT for every 5 referrals!
        </Text>
      </Box>

      <Button
        py={6}
        px={10}
        width={'fit'}
        fontSize={13}
        color={'gray-60'}
        fontWeight={'semibold'}
        borderColor={'gray-80'}
        backgroundColor={'transparent'}
        _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
      >
        Learn more
      </Button>
    </Flex>
  );
};

export default Banner;
