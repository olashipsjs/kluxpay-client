import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Overlay from '@components/overlay/Overlay';
import Step from '@components/step/Step';
import Amount from './components/Amount';
import Address from './components/Address';
import Success from './components/Success';
import Wallet from './components/Wallet';

const initialData = {
  amount: '',
  recipient: '',
  walletId: '',
};

const WithdrawFeature = () => {
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
          <Heading fontSize={17}>Withdraw</Heading>
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
          <Step.Screen
            screens={[<Amount />, <Address />, <Wallet />, <Success />]}
          />
        </Step>
      </Overlay.Content>
    </Overlay.Panel>
  );
};

export default WithdrawFeature;
