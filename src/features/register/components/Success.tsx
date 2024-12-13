import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import useStep from 'src/hooks/useStep';
import Flex from '@components/base/flex/Flex';
import Button from '@components/base/button/Button';

const Success = () => {
  const { data, reset } = useStep<any>();

  return (
    <Flex
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Iconify
        width={'40px'}
        height={'40px'}
        color={'green-60'}
        icon={'material-symbols-light:check-circle-rounded'}
      />
      <Heading
        mt={16}
        fontSize={21}
      >
        Registration Completed
      </Heading>

      <Text
        mt={12}
        fontSize={17}
        lineHeight={'lg'}
        textAlign={'center'}
      >
        Thank you, {data.firstName}! Your account has been successfully created.
        Please check your email: {data.email} for a confirmation mail.
      </Text>

      <Button
        mt={24}
        onClick={reset}
      >
        Start over
      </Button>
    </Flex>
  );
};

export default Success;
