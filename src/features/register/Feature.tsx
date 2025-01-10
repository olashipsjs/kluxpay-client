import Names from './components/FormBlock';
import Step from '@components/step/Step';
import Success from './components/Success';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import Anchor from '@components/anchor/Anchor';
import Username from './components/Username';

const initialData = {
  email: '',
  username: '',
  lastName: '',
  password: '',
  firstName: '',
};

const RegisterFeature = () => {
  return (
    <Step
      width={'full'}
      initialData={initialData}
    >
      <Heading
        id={'heading'}
        textAlign={'center'}
      >
        Trade your tokens faster
      </Heading>
      <Text
        mt={6}
        as={'p'}
        fontSize={16}
        textAlign={'center'}
        lineHeight={'md'}
        letterSpacing={'xs'}
      >
        Trade digital assets with no hidden fees at the best market rates.
      </Text>

      <Step.Screen
        mt={32}
        screens={[<Names />, <Username />, <Success />]}
      />

      <Text
        mt={48}
        as={'p'}
        fontSize={14}
        textAlign={'center'}
      >
        Already have an account?
        <Anchor
          ms={4}
          to={'/auth/login/'}
          color={'orange-60'}
          fontSize={'inherit'}
          _hover={{
            color: 'orange-40',
          }}
        >
          Login
        </Anchor>
      </Text>
    </Step>
  );
};

export default RegisterFeature;
