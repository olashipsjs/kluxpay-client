import Names from './components/FormBlock';
import Step from '@components/step/Step';
import Success from './components/Success';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import Anchor from '@components/anchor/Anchor';

const initialData = {
  email: '',
  lastName: '',
  password: '',
  firstName: '',
  dateOfBirth: '',
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
        mt={12}
        as={'p'}
        fontSize={17}
        textAlign={'center'}
        lineHeight={'md'}
        letterSpacing={'xs'}
      >
        Trade digital assets with no hidden fees at the best market rates.
      </Text>

      <Step.Screen
        mt={32}
        screens={[<Names />, <Success />]}
      />

      <Text
        mt={20}
        as={'p'}
        fontSize={14}
        textAlign={'center'}
      >
        Already have an account?
        <Anchor
          ms={4}
          fontSize={'inherit'}
          to={'/auth/'}
        >
          Login
        </Anchor>
      </Text>
    </Step>
  );
};

export default RegisterFeature;
