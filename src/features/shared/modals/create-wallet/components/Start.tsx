import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Image from '@components/base/image/Image';
import Text from '@components/base/text/Text';
import useStep from '@hooks/useStep';

const Start = () => {
  const { data, next } = useStep();

  return (
    <Flex
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Image
        width={'64px'}
        alt={'crypto-wallets'}
        src={'https://cdn-icons-png.flaticon.com/128/10105/10105383.png'}
      />

      <Heading
        mt={20}
        fontSize={19}
        textAlign={'center'}
      >
        Create a new wallet
      </Heading>
      <Text
        mt={4}
        as={'p'}
        fontSize={14}
        textAlign={'center'}
      >
        In the next step, you'll be asked to choose a network e.g{' '}
        <Text
          as={'code'}
          color={'indigo-60'}
        >
          Ethereum, Bitcoin or Solana.
        </Text>
      </Text>

      <Button
        mt={24}
        onClick={() => next(data)}
      >
        Continue
      </Button>
    </Flex>
  );
};

export default Start;
