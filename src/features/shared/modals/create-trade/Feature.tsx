import Overlay from '@components/overlay/Overlay';
import Step from '@components/step/Step';
import FormBlock from './components/FormBlock';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Success from './components/Success';

type Props = {
  rate: number;
  offerId: string; // From the route params
};

const CreateTradeFeature = ({ rate, offerId }: Props) => {
  const initialData = {
    rate,
    amount: '',
    offerId: offerId,
  };

  return (
    <Overlay.Panel justifyContent={'end'}>
      <Overlay.Background />
      <Overlay.Content maxWidth={'400px'}>
        <Flex
          p={12}
          alignItems={'center'}
          justifyContent={'between'}
        >
          <Heading fontSize={19}>Trade</Heading>
          <Overlay.Trigger
            py={6}
            width={'fit'}
            color={'gray-60'}
            borderColor={'gray-90'}
            backgroundColor={'transparent'}
            _hover={{ backgroundColor: 'gray-100' }}
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

export default CreateTradeFeature;
