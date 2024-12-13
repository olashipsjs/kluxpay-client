import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Link from '@components/anchor/Link';
import useStep from '@hooks/useStep';

const TradeSuccess = () => {
  const { data } = useStep<any>();

  return (
    <Flex
      px={16}
      mx={'auto'}
      maxWidth={'400px'}
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Iconify
        width={'40px'}
        color={'green-60'}
        icon={'material-symbols-light:supervisor-account-rounded'}
      />
      <Heading
        mt={12}
        fontSize={21}
        lineHeight={'md'}
        letterSpacing={'xs'}
        textAlign={'center'}
      >
        Your P2P trade is now live! You're all set to begin the transaction.
      </Heading>

      <Link href={`/app/trade/${data._id}`}>
        <Button
          mt={24}
          width={'fit'}
        >
          Send a message
        </Button>
      </Link>
    </Flex>
  );
};

export default TradeSuccess;
