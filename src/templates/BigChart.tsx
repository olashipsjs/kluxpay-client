import Iconify from '@components/base/iconify/Iconify';
import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import useGetCoinPrices from 'src/hooks/useGetCoinPrices';
import params from 'src/utils/params';

const apexOptions: ApexOptions = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    offsetX: 0,
    offsetY: 0,
  },

  grid: {
    show: false,
    padding: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  },

  dataLabels: { enabled: false },

  legend: { horizontalAlign: 'left' },

  stroke: {
    width: 1.5,
    curve: 'smooth',
    lineCap: 'round',
    colors: ['rgb(67, 74, 255)'],
  },

  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.4,
      gradientToColors: ['rgba(67, 74, 255, 0.1)', 'rgba(67, 74, 255, 0)'], // Match with stroke colors for a seamless effect
      inverseColors: false,
      opacityFrom: 0.65,
      opacityTo: 0,
      stops: [0, 90],
    },
  },

  tooltip: {
    style: {
      fontSize: '12px',
      fontFamily: 'Inter, sans-serif',
    },
  },

  yaxis: {
    axisTicks: { show: false },
    axisBorder: { show: false },
    labels: {
      show: false,
      padding: 0,
      formatter: (value: number) =>
        new Intl.NumberFormat('en-Us', {
          style: 'currency',
          currency: 'USD',
        }).format(value),
    },
  },

  xaxis: {
    tooltip: { enabled: false },
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

type Props = {
  id: string;
  type?: React.ComponentProps<typeof ReactApexChart>['type'];
};

const BigChart = React.memo(({ id, type = 'area' }: Props) => {
  const days = params.queryValue('days');
  const { prices, isLoading } = useGetCoinPrices({
    id,
    days: Number(days) || 1,
  });

  if (!id) return null;

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
      type={type}
      width={'100%'}
      height={'100%'}
      options={apexOptions}
      css={{
        width: '100%',
        height: 'auto',
        transform: 'none',
        '.apexcharts-graphical': {
          transform: 'none !important',
        },
      }}
      series={[{ data: prices, name: id }]}
    />
  );
});

export default BigChart;
