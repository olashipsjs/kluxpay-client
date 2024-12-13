import Avatar from '@components/avatar/Avatar';
import Button from '@components/base/button/Button';
import Container from '@components/base/container/Container';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import useUser from '@hooks/useUser';

const Header = () => {
  const { user } = useUser();

  return (
    <Container py={20}>
      <Flex
        alignItems={'center'}
        justifyContent={'between'}
      >
        <Flex
          gap={8}
          alignItems={'center'}
        >
          <Avatar
            hasError
            backgroundColor={'indigo-60'}
          >
            <Avatar.Fallback
              fontSize={19}
              color={'white'}
              textTransform={'uppercase'}
            >
              {user?.firstName[0]}
            </Avatar.Fallback>
          </Avatar>
          <Heading
            fontSize={21}
            textTransform={'capitalize'}
          >
            {user?.firstName}
          </Heading>
        </Flex>

        <Flex gap={12}>
          <Button
            p={0}
            size={'32px'}
            rounded={'full'}
            color={'indigo-30'}
            borderColor={'transparent'}
            backgroundColor={'indigo-95'}
            _hover={{
              backgroundColor: 'indigo-90',
            }}
          >
            <Iconify
              width={'20px'}
              color={'inherit'}
              icon={'eva:plus-fill'}
            />
          </Button>

          <Button
            p={0}
            size={'26px'}
            rounded={'full'}
            color={'gray-60'}
            borderColor={'transparent'}
            backgroundColor={'transparent'}
            _hover={{
              color: 'gray-10',
              backgroundColor: 'gray-95',
            }}
          >
            <Iconify
              width={'20px'}
              color={'inherit'}
              icon={'raphael:chat'}
            />
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Header;
