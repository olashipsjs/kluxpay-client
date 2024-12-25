import Box from '@components/base/box/Box';
import Grid from '@components/base/grid/Grid';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import formatDecimal from '@utils/formatDecimal';

type DataProps = {
  label: string;
  value: string;
};

const Data = ({ label, value }: DataProps) => {
  return (
    <Box>
      <Text
        lineHeight={'1'}
        fontWeight={'regular'}
        fontSize={{ initial: 12, sm: 14 }}
      >
        {label}
      </Text>
      <Heading
        mt={8}
        lineHeight={'1'}
        fontSize={{ initial: 16, sm: 19 }}
      >
        {value}
      </Heading>
    </Box>
  );
};

type Props = {
  volume: number;
  dailyLow: number;
  dailyHigh: number;
  dailyChange: number;
  marketCap: number;
};

const Information = ({ volume, dailyChange, dailyHigh, dailyLow }: Props) => {
  return (
    <Box
      p={12}
      border={1}
      rounded={12}
      borderColor={'gray-90'}
      backgroundColor={'white'}
      boxShadow={'0px .5px 0px 0px rgba(var(--gray-80))'}
    >
      <Heading
        as={'h2'}
        fontSize={16}
      >
        Information
      </Heading>

      <Grid
        mt={20}
        gap={24}
        gridTemplateColumns={'1fr 1fr 1fr 1fr 1fr'}
      >
        <Data
          label={'High'}
          value={`${formatDecimal(dailyHigh)}`}
        />
        <Data
          label={'Low'}
          value={`${formatDecimal(dailyLow)}`}
        />
        <Data
          label={'Change'}
          value={`${formatDecimal(dailyChange)}`}
        />
        <Data
          label={'Volume'}
          value={`${formatDecimal(volume)}`}
        />
      </Grid>
    </Box>
  );
};

export default Information;
