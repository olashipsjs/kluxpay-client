import Box from '@components/base/box/Box';
import MessageBar from './components/MessageBar';
import React from 'react';

const TradeFeature = () => {
  return (
    <React.Fragment>
      <Box></Box>
      <Box>hello world</Box>
      <Box
        p={12}
        borderTop={1}
        bottom={'0px'}
        width={'900px'}
        position={'fixed'}
        backdropBlur={'md'}
        borderTopColor={'gray-90'}
        backgroundColor={'rgba(var(--white), 0.9)'}
      >
        <MessageBar />
      </Box>
    </React.Fragment>
  );
};

export default TradeFeature;
