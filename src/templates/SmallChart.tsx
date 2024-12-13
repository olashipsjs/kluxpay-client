import Iconify from '@components/base/iconify/Iconify';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import useFetchCoinPrices from 'src/hooks/useGetCoinPrices';

const apexOptions: ApexOptions = {
  chart: {
    type: 'area',
    toolbar: { show: false },
    zoom: { enabled: false },
  },

  grid: { show: false },
  dataLabels: { enabled: false },
  legend: { horizontalAlign: 'left' },

  stroke: {
    width: 1.25,
    curve: 'smooth',
    lineCap: 'round',
    colors: ['rgb(67, 74, 255)'],
  },

  tooltip: {
    style: {
      fontSize: '12px',
      fontFamily: 'Inter, sans-serif',
    },
    x: {
      show: false,
    },
  },

  yaxis: {
    axisTicks: { show: false },
    axisBorder: { show: false },
    labels: {
      show: false,
      formatter: (value: number) =>
        new Intl.NumberFormat('en-Us', {
          style: 'currency',
          currency: 'USD',
        }).format(value),
    },
  },

  xaxis: {
    axisTicks: { show: false },
    axisBorder: { show: false },
    labels: {
      show: false,
      formatter: (value: string) =>
        new Date(value).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
    },
  },
};

const SmallChart = ({ id }: { id: string }) => {
  const { prices, isLoading } = useFetchCoinPrices({ id: id, days: 1 });

  if (isLoading) {
    return (
      <Iconify
        width={'3em'}
        icon={'line-md:loading-twotone-loop'}
      />
    );
  }

  return (
    <ReactApexChart
      options={apexOptions}
      css={{ width: '100%', height: '100%' }}
      series={[{ data: prices, name: id }]}
    />
  );
};

export default SmallChart;
