import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

type Props = {
  dailyChange: number;
  data: Array<[number, number]>;
};

const SmallChart = ({ data, dailyChange }: Props) => {
  const formattedData = data.map(([timestamp, value]) => ({
    timestamp, // X-axis key
    value, // Y-axis key
  }));

  return (
    <ResponsiveContainer
      height={32}
      width={'100%'}
    >
      <LineChart
        data={formattedData}
        syncId={'timestamp'}
      >
        <XAxis
          hide
          axisLine={false}
          dataKey='timestamp'
        />
        <YAxis
          hide
          domain={['dataMin', 'dataMax - 50']}
          axisLine={false}
        />
        <Line
          type={'basis'}
          dataKey={'value'}
          strokeWidth={1.25}
          dot={false}
          stroke={
            dailyChange > 0 ? 'rgba(var(--gray-70))' : 'rgba(var(--red-60))'
          }
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SmallChart;
