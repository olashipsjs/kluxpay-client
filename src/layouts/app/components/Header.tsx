import Anchor from '@components/anchor/Anchor';
import Container from '@components/base/container/Container';
import Flex from '@components/base/flex/Flex';
import Iconify from '@components/base/iconify/Iconify';
import Section from '@components/base/section/Section';
import Divider from '@components/divider/Divider';
import useUser from '@hooks/useUser';
import Options from './Options';

const Header = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <Section
      zIndex={2}
      top={'0px'}
      position={'sticky'}
      backgroundColor={'white'}
      display={{ md: 'hidden' }}
    >
      <Container
        maxWidth={'full'}
        px={{ initial: 12, sm: 16 }}
      >
        <Flex
          height={'48px'}
          alignItems={'center'}
          justifyContent={'between'}
        >
          <Options />

          <Flex gap={12}>
            <Anchor
              py={6}
              px={12}
              gap={4}
              fontSize={13}
              color={'white'}
              fontWeight={'medium'}
              to={'/app/'}
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
