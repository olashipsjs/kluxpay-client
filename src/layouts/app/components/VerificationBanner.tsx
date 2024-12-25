import Container from '@components/base/container/Container';
import Heading from '@components/base/heading/Heading';
import Overlay from '@components/overlay/Overlay';
import VerifyEmailFeature from '@features/shared/modals/verify-email/Feature';
import useUser from '@hooks/useUser';

const VerificationBanner = () => {
  const { user } = useUser();

  if (user && user?.isEmailVerified === false) {
    return (
      <Container
        py={6}
        zIndex={'999'}
        maxWidth={'full'}
        position={'fixed'}
        backgroundColor={'orange-60'}
      >
        <Overlay justifyContent={'center'}>
          <Heading
            fontSize={13}
            color={'white'}
          >
            Unlock full access by verifying your email address.
            <Overlay.Trigger
              px={8}
              py={4}
              ms={6}
              rounded={12}
              width={'fit'}
              fontSize={13}
              color={'orange-60'}
              borderColor={'transparent'}
              backgroundColor={'white'}
              _hover={{
                opacity: 90,
                color: 'orange-70',
                backgroundColor: 'white',
              }}
            >
              Verify now
            </Overlay.Trigger>
          </Heading>

          <VerifyEmailFeature />
        </Overlay>
      </Container>
    );
  }

  return null;
};

export default VerificationBanner;
