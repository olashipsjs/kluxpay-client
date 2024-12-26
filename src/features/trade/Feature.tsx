import Box from '@components/base/box/Box';
import MessageBar from './components/MessageBar';
import Chats from './components/Chats';
import Header from './components/Header';
import Banner from './components/Banner';
import useTrades from '@hooks/useTrades';
import Flex from '@components/base/flex/Flex';
import Iconify from '@components/base/iconify/Iconify';
import Heading from '@components/base/heading/Heading';

const TradeFeature = () => {
  const { trade } = useTrades();

  if (trade) {
    return (
      <Box
        minHeight={'screen'}
        backgroundColor={'white'}
      >
        <Header />
        <Banner />
        <Chats />
        <Box
          borderTop={1}
          position={'fixed'}
          backdropBlur={'lg'}
          borderTopColor={'gray-90'}
          bottom={{ initial: '60px', md: '0px' }}
          backgroundColor={'rgba(var(--white), 0.5)'}
          width={{ initial: 'full', md: 'calc(100vw - 636px)' }}
        >
          <MessageBar />
        </Box>
      </Box>
    );
  }

  return (
    <Flex
      pt={40}
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Iconify
        width={32}
        color={'gray-60'}
        icon={'fluent:people-search-24-regular'}
      />

      <Heading
        mt={12}
        fontSize={19}
      >
        We could not locate the trade.
      </Heading>
    </Flex>
  );
};

export default TradeFeature;
