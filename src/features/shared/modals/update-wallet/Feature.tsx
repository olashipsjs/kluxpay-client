import Step from '@components/step/Step';
import Overlay from '@components/overlay/Overlay';
import { useSearchParams } from 'react-router-dom';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import FormBlock from './components/FormBlock';
import Divider from '@components/divider/Divider';
import Success from './components/Success';

const UpdateWalletFeature = () => {
  const [searchParams] = useSearchParams();

  const WALLET_NAME = searchParams.get('name') || '';

  return (
    <Overlay.Panel justifyContent={{ initial: 'end', sm: 'center' }}>
      <Overlay.Background />
      <Overlay.Content maxWidth={'400px'}>
        <Flex
          p={12}
          alignItems={'center'}
          justifyContent={'between'}
        >
          <Heading
            fontSize={16}
            lineHeight={'1'}
          >
            Update Wallet
          </Heading>
          <Overlay.Trigger
            py={6}
            size={'fit'}
            color={'gray-60'}
            borderColor={'gray-90'}
            backgroundColor={'transparent'}
            boxShadow={'0px .5px 0px 0px rgba(var(--gray-80))'}
            _hover={{
              color: 'gray-10',
              backgroundColor: 'gray-100',
            }}
          >
            Cancel
          </Overlay.Trigger>
        </Flex>
        <Divider backgroundColor={'gray-90'} />
        <Step
          p={12}
          initialData={{ name: WALLET_NAME }}
        >
          <Step.Screen screens={[<FormBlock />, <Success />]} />
        </Step>
      </Overlay.Content>
    </Overlay.Panel>
  );
};

export default UpdateWalletFeature;
