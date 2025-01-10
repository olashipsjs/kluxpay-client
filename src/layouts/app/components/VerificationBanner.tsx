import Box from '@components/base/box/Box';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import Overlay from '@components/overlay/Overlay';
import VerifyEmailFeature from '@features/shared/modals/verify-email/Feature';
import useUser from '@hooks/useUser';

const VerificationBanner = () => {
  const { user } = useUser();

  if (user && user?.isEmailVerified === false) {
    return (
      <Overlay open={true}>
        <Overlay.Panel
          alignItems={'end'}
          justifyContent={'start'}
          flexDirection={'column'}
        >
          <Overlay.Content
            p={12}
            gap={16}
            border={1}
            maxWidth={'400px'}
            flexDirection={'row'}
            borderColor={'gray-90'}
            boxShadow={'0px 2px 8px 0px rgba(var(--gray-90))'}
          >
            <Iconify
              width={32}
              color={'indigo-60'}
              icon={'fluent:mail-inbox-checkmark-24-regular'}
            />
            <Box css={{ flex: 1 }}>
              <Heading
                fontSize={17}
                fontWeight={'semibold'}
              >
                Check your inbox
              </Heading>
              <Text
                mt={2}
                as={'p'}
                fontSize={14}
                color={'gray-60'}
                fontWeight={'medium'}
              >
                We sent you a One Time Password for your account verification
              </Text>
              <Overlay mt={12}>
                <Overlay.Trigger
                  py={6}
                  px={10}
                  width={'fit'}
                  color={'gray-40'}
                  fontWeight={'semibold'}
                  borderColor={'gray-80'}
                  backgroundColor={'transparent'}
                  _hover={{ backgroundColor: 'gray-100', color: 'gray-10' }}
                >
                  Verify now
                </Overlay.Trigger>
                <VerifyEmailFeature />
              </Overlay>
            </Box>
          </Overlay.Content>
        </Overlay.Panel>
      </Overlay>
    );
  }

  return null;
};

export default VerificationBanner;
