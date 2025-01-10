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
import Text from '@components/base/text/Text';

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
          justifyContent={'between'}
        >
          <Box css={{ flex: 1 }}>
            <Heading fontSize={17}>Verify email address</Heading>
            <Text fontSize={14}>
              Complete onboarding by verifying your email address
            </Text>
          </Box>

          <Overlay.Trigger
            p={0}
            size={'24px'}
            color={'gray-60'}
            borderColor={'transparent'}
            backgroundColor={'transparent'}
            _hover={{ color: 'gray-10', backgroundColor: 'gray-95' }}
          >
            <Iconify
              width={16}
              icon={'fluent:dismiss-24-regular'}
            />
          </Overlay.Trigger>
        </Flex>

        <Divider backgroundColor={'gray-90'} />

        <Step
          px={20}
          defaultStep={1}
          initialData={{ email: user ? user.email : '', code: '' }}
        >
          <Step.Screen
            py={20}
            screens={[<Generate />, <Verify />]}
          />
        </Step>
      </Overlay.Content>
    </Overlay.Panel>
  );
};

export default VerifyEmailFeature;
