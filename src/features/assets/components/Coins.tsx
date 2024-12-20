import React from 'react';
import ScrollContainer from './ScrollContainer';

const Coins = React.memo(() => {
  return (
    <React.Fragment>
      <ScrollContainer
        label={'Ethereum network'}
        network={'ethereum'}
      />

      <ScrollContainer
        label={'Bitcoin network'}
        network={'bitcoin'}
      />

      <ScrollContainer
        label={'Solana network'}
        network={'solana'}
      />
    </React.Fragment>
  );
});

export default Coins;
