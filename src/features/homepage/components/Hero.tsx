import Anchor from '@components/anchor/Anchor';
import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Container from '@components/base/container/Container';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';

const Hero = () => {
  return (
    <Container maxWidth={'800px'}>
      <Flex
        minHeight={'screen'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Flex
          mx={'auto'}
          alignItems={'center'}
          flexDirection={'column'}
          gap={{ initial: 20, sm: 24 }}
          maxWidth={{ initial: '80%', sm: 'full' }}
        >
          <Flex
            gap={16}
            alignItems={'center'}
          >
            <Avatar size={'48px'}>
              <Avatar.Picture
                loading={'lazy'}
                cursor={'pointer'}
                _hover={{
                  opacity: 80,
                  transition: '200',
                  transitionTimingFunction: 'ease',
                }}
                src={
                  'https://images.pexels.com/photos/5691039/pexels-photo-5691039.jpeg?auto=compress&cs=tinysrgb&w=600'
                }
              />
            </Avatar>
            <Box
              position={'relative'}
              notLastChild={{
                mb: 12,
              }}
            >
              <Avatar size={'56px'}>
                <Avatar.Picture
                  cursor={'pointer'}
                  loading={'lazy'}
                  _hover={{
                    opacity: 80,
                    transition: '200',
                    transitionTimingFunction: 'ease',
                  }}
                  src={
                    'https://images.pexels.com/photos/29771341/pexels-photo-29771341/free-photo-of-young-man-relaxing-by-airplane-window.jpeg?auto=compress&cs=tinysrgb&w=600'
                  }
                />
              </Avatar>
              <Avatar size={'40px'}>
                <Avatar.Picture
                  loading={'lazy'}
                  cursor={'pointer'}
                  _hover={{
                    opacity: 80,
                    transition: '200',
                    transitionTimingFunction: 'ease',
                  }}
                  src={
                    'https://images.pexels.com/photos/5588317/pexels-photo-5588317.jpeg?auto=compress&cs=tinysrgb&w=600'
                  }
                />
              </Avatar>
            </Box>
          </Flex>
          <Flex
            alignItems={'center'}
            flexDirection={'column'}
          >
            <Heading
              as={'h1'}
              lineHeight={'sm'}
              textAlign={'center'}
              letterSpacing={'lg'}
              fontWeight={'semibold'}
              fontSize={{ initial: 32, sm: 40 }}
            >
              Tap. Trade. Done{' '}
              <Iconify
                color={'green-60'}
                css={{ verticalAlign: 'bottom' }}
                icon={'material-symbols-light:check-circle-rounded'}
              />
              .
            </Heading>

            <Text
              mt={12}
              as={'p'}
              lineHeight={'lg'}
              textAlign={'center'}
              fontSize={{ initial: 17, sm: 19 }}
            >
              Trade with total privacy and complete control.
            </Text>

            <Anchor
              py={10}
              px={16}
              mt={24}
              color={'white'}
              to={'/auth/register/'}
              backgroundColor={'indigo-60'}
              _hover={{
                color: 'white',
                backgroundColor: 'indigo-70',
              }}
            >
              Get Started
            </Anchor>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Hero;
