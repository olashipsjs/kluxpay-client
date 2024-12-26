import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Overlay from '@components/overlay/Overlay';
import Step from '@components/step/Step';
import Success from './components/Success';
import useWallet from '@hooks/useWallet';
import FormBlock from './components/FormBlock';

type Props = {
  coin: {
    id: string;
    symbol: string;
    name: string;
  };
  walletId?: string;
  contractAddress?: string;
};

const WithdrawFeature = ({ contractAddress, walletId, coin }: Props) => {
  const { wallet } = useWallet();

  const initialData = {
    to: '',
    amount: '',
    contractAddress,
    walletId: walletId ? walletId : wallet?._id || '',
  };

  return (
    <Overlay.Panel justifyContent={'end'}>
      <Overlay.Background />
      <Overlay.Content maxWidth={'400px'}>
        <Flex
          px={12}
          py={12}
          alignItems={'center'}
          justifyContent={'between'}
        >
          <Heading fontSize={17}>Send {coin.name}</Heading>
          <Overlay.Trigger
            py={6}
            border={1}
            width={'fit'}
            color={'gray-60'}
            borderColor={'gray-90'}
            backgroundColor={'transparent'}
            boxShadow={'0px .5px 0px 0px rgba(var(--gray-80))'}
            _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
          >
            Cancel
          </Overlay.Trigger>
        </Flex>
        <Step
          p={12}
          initialData={initialData}
        >
          <Step.Screen screens={[<FormBlock />, <Success />]} />
        </Step>
      </Overlay.Content>
    </Overlay.Panel>
  );
};

export default WithdrawFeature;
