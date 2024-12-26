import Anchor from '@components/anchor/Anchor';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import coins from '@constants/coins';
import useOffers from '@hooks/useOffers';
import useStep from '@hooks/useStep';

const Success = () => {
  const { data } = useStep<any>();
  const { offer } = useOffers();

  const coin = coins.find((coin) => coin.id === offer?.coinId)!;

  return (
    <Flex
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Iconify
        width={40}
        icon={'fluent:people-checkmark-24-regular'}
      />
      <Heading
        mt={12}
        fontSize={19}
        textAlign={'center'}
      >
        You're trading {`${data.amount} ${coin.symbol.toUpperCase()}`}
      </Heading>

      <Text
        mt={8}
        as={'p'}
        fontSize={14}
        textAlign={'center'}
      >
        Your P2P trade has started successfully. Please click on the button
        below to start trading.
      </Text>

      <Anchor
        mt={12}
        py={8}
        px={12}
        color={'gray-60'}
        to={`/app/trades/${data?._id}`}
        backgroundColor={'gray-95'}
        _hover={{ color: 'gray-10' }}
      >
        Go to Trade
      </Anchor>
    </Flex>
  );
};

export default Success;
