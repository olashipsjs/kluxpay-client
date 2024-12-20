import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Divider from '@components/divider/Divider';
import Overlay from '@components/overlay/Overlay';
import Step from '@components/step/Step';
import useUser from '@hooks/useUser';
import Generate from './components/Generate';
import Verify from './components/Verify';
import Success from './components/Success';

const VerifyEmailFeature = () => {
  const { user } = useUser();

  return (
    <Overlay.Panel justifyContent={{ initial: 'end', sm: 'center' }}>
      <Overlay.Background />
      <Overlay.Content maxWidth={'400px'}>
        <Flex
          py={12}
          px={20}
          gap={8}
          alignItems={'center'}
        >
          <Iconify
            p={2}
            width={'32px'}
            color={'white'}
            rounded={'full'}
            backgroundColor={'gray-70'}
            icon={'material-symbols-light:person-rounded'}
          />
          <Box css={{ flex: 1 }}>
            <Heading fontSize={17}>Verify email address</Heading>
          </Box>
        </Flex>

        <Divider backgroundColor={'gray-90'} />

        <Step
          px={20}
          defaultStep={1}
          initialData={{ email: user ? user.email : '', code: '' }}
        >
          <Step.Screen
            py={20}
            screens={[<Generate />, <Verify />, <Success />]}
          />
        </Step>
      </Overlay.Content>
    </Overlay.Panel>
  );
};

export default VerifyEmailFeature;
