import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';

const TransactionCard = () => {
  return (
    <Flex
      p={16}
      rounded={24}
      width={'full'}
      height={'240px'}
      flexDirection={'column'}
      boxShadow={'ringGray95'}
      justifyContent={'between'}
      style={{
        background:
          'linear-gradient(rgb(var(--yellow-90)), rgb(var(--yellow-80)))',
      }}
    >
      <Box></Box>

      <Flex
        gap={4}
        style={{ flex: 1 }}
        flexDirection={'column'}
      >
        {Array.from('abcd').map((_) => {
          return (
            <Flex
              gap={8}
              alignItems={'center'}
            >
              <Box
                size={'24px'}
                rounded={'full'}
                backgroundColor={'yellow-50'}
              />
              <Box
                height={'6px'}
                rounded={'full'}
                backgroundColor='yellow-50'
                style={{ flex: 1 }}
              />
              <Box
                width={'32px'}
                height={'6px'}
                rounded={'full'}
                backgroundColor='yellow-50'
              />
            </Flex>
          );
        })}
      </Flex>

      <Heading
        fontSize={17}
        letterSpacing={'sm'}
        color={'yellow-20'}
      >
        Saved Traders
      </Heading>
      <Text
        mt={8}
        as={'p'}
        fontSize={13}
        lineHeight={'md'}
        fontWeight={'medium'}
        color={'yellow-30'}
      >
        Complete a trade to the seller to access this feature.
      </Text>
    </Flex>
  );
};

export default TransactionCard;
