import Box from '@components/base/box/Box';
import Text from '@components/base/text/Text';
import useTrades from '@hooks/useTrades';

const Banner = () => {
  const { trade } = useTrades();

  return (
    <Box
      py={6}
      px={12}
      backgroundColor={'gray-95'}
    >
      <Text
        fontSize={13}
        color={'gray-10'}
      >
        {trade?.offer?.notes}
      </Text>
    </Box>
  );
};

export default Banner;
