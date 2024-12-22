import Anchor from '@components/anchor/Anchor';
import Avatar from '@components/avatar/Avatar';
import Container from '@components/base/container/Container';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Section from '@components/base/section/Section';
import Divider from '@components/divider/Divider';
import useUser from '@hooks/useUser';

const Header = () => {
  const { user } = useUser();

  if (user === null) return null;

  return (
    <Section
      zIndex={2}
      top={'0px'}
      position={'sticky'}
      backgroundColor={'white'}
    >
      <Container
        maxWidth={'full'}
        px={{ initial: 12, sm: 16 }}
      >
        <Flex
          height={'56px'}
          alignItems={'center'}
          justifyContent={'between'}
        >
          <Flex
            gap={8}
            alignItems={'center'}
          >
            <Avatar
              size={'32px'}
              backgroundColor={'indigo-95'}
            >
              <Avatar.Picture
                src={
                  'https://finance-template.alignui.com/images/avatar/illustration/arthur.png'
                }
              />
              <Avatar.Fallback
                fontSize={17}
                color={'white'}
                textTransform={'capitalize'}
              >
                {user?.firstName.substring(0, 2)}
              </Avatar.Fallback>
            </Avatar>
            <Heading
              fontSize={16}
              textTransform={'capitalize'}
            >
              {`${user?.firstName} ${user?.lastName}`}
            </Heading>
          </Flex>

          <Flex gap={12}>
            <Anchor
              py={6}
              px={12}
              gap={4}
              fontSize={13}
              color={'white'}
              fontWeight={'medium'}
              to={'/app/marketplace'}
              borderColor={'transparent'}
              backgroundColor={'indigo-60'}
              _hover={{
                color: 'white',
                backgroundColor: 'indigo-70',
              }}
            >
              Trade
              <Iconify
                width={'20px'}
                color={'inherit'}
                icon={'ph:arrows-left-right-fill'}
              />
            </Anchor>
          </Flex>
        </Flex>
      </Container>

      <Divider backgroundColor={'gray-90'} />
    </Section>
  );
};

export default Header;
