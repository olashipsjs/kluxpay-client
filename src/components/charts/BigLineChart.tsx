import useUser from '@hooks/useUser';
import formatDecimal from '@utils/formatDecimal';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// const xAxisCustomTick = (props: any) => {
//   const { x, y, payload } = props;

//   return (
//     <text
//       x={x - 24}
//       y={y + 12}
//       textAnchor={'center'}
//       fill={'rgba(var(--gray-10))'}
//       style={{
//         lineHeight: '1',
//         textAlign: 'end',
//         fontSize: '1.2rem',
//       }}
//     >
//       {payload.value}
//     </text>
//   );
// };

const yAxisCustomTick = (props: any) => {
  const { x, y, payload } = props;

  return (
    <text
      x={x + 48}
      y={y + 4.25}
      textAnchor='end'
      fill={'rgba(var(--gray-10))'}
      style={{ fontSize: '1.2rem', lineHeight: '1' }}
    >
      {formatDecimal(payload.value)}
    </text>
  );
};

const renderTooltip = (props: any) => {
  const { user } = useUser();
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const { timestamp, value } = payload[0].payload;

    return (
      <div
        style={{
          background: '#fff',
          border: '1px solid rgb(var(--gray-90))',
          padding: '6px 10px',
          borderRadius: '999px',
          fontSize: '1.2rem',
          boxShadow: '0px .5px 0px 0px rgba(var(--gray-80))',
        }}
      >
        <p
          style={{
            lineHeight: '1',
            fontWeight: 600,
            color: 'rgb(var(--gray-10))',
          }}
        >
          <span style={{ fontWeight: 400, color: 'rgb(var(--gray-60))' }}>
            {timestamp}
          </span>
          : {`${user?.fiat.symbol}`}
          {`${value}`}
        </p>
      </div>
    );
  }

  return null;
};

type Props = {
  data: Array<[number, number]>;
};

const BigLineChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer
      width={'100%'}
      height={500}
    >
      <LineChart
        data={data}
        margin={{ top: 20, right: 8, left: 0, bottom: 20 }}
      >
        <CartesianGrid
          vertical={false}
          strokeDasharray='0'
        />
        <XAxis
          hide
          axisLine={false}
          tickLine={false}
          dataKey={'timestamp'}
          // tick={xAxisCustomTick}
          interval={'preserveStart'}
        />
        <YAxis
          includeHidden
          axisLine={false}
          tickLine={false}
          orientation={'right'}
          tick={yAxisCustomTick}
          domain={['dataMin - 25', 'dataMax + 25']}
        />
        <Tooltip content={renderTooltip} />
        <Line
          dot={false}
          strokeWidth={2}
          type={'basisOpen'}
          dataKey={'value'}
          stroke={'rgba(var(--gray-10))'}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BigLineChart;
