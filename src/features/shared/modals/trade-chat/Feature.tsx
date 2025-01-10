import Overlay from '@components/overlay/Overlay';
import useSocket from '@hooks/useSocket';
import useTrades from '@hooks/useTrades';
import Bar from './components/Bar';
import Header from './components/Header';
import Messages from './components/Messages';
import useUser from '@hooks/useUser';
import React from 'react';

const TradeChatFeature = () => {
  const { user } = useUser();
  const { trade } = useTrades();
  const { goOnline } = useSocket(trade?._id || '');

  React.useEffect(() => {
    goOnline(user?._id || '');
  }, []);

  return (
    <Overlay.Panel
      justifyContent={'end'}
      flexDirection={'column'}
    >
      <Overlay.Background />
      <Overlay.Content
        height={'88vh'}
        maxWidth={'400px'}
      >
        <Header />
        <Messages />
        <Bar />
      </Overlay.Content>
    </Overlay.Panel>
  );
};

export default TradeChatFeature;
