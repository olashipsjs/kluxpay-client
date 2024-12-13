import Flex from '@components/base/flex/Flex';
import Text from '@components/base/text/Text';
import React from 'react';

const CustomChartTooltip = ({
  price,
  fixed = 4,
}: {
  price: number;
  fixed: number;
}) => {
  return (
    <Flex>
      <Text>{price.toFixed(fixed)}</Text>
    </Flex>
  );
};

export default CustomChartTooltip;