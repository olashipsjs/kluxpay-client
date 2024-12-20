import Anchor from '@components/anchor/Anchor';
import Avatar from '@components/avatar/Avatar';
import Container from '@components/base/container/Container';
import Flex from '@components/base/flex/Flex';
import Section from '@components/base/section/Section';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Section backgroundColor={'gray-95'}>
      <Container
        py={24}
        maxWidth={{ initial: 'full', sm: '400px' }}
      >
        <Flex
          rounded={20}
          minHeight={'92vh'}
          flexDirection={'column'}
          p={{ initial: 12, sm: 24 }}
        >
          <Anchor to={'/'}>
            <Avatar
              mb={24}
              mx={'auto'}
              size={'40px'}
              rounded={'full'}
            >
              <Avatar.Picture
                alt={'logo'}
                src={'/logo.jpg'}
              />
            </Avatar>
          </Anchor>
          <Outlet />
        </Flex>

        <Flex
          gap={24}
          justifyContent={'center'}
        >
          <Anchor to='cookies'>Cookies</Anchor>
          <Anchor to='terms'>Terms</Anchor>
          <Anchor to='privacy'>Privacy</Anchor>
        </Flex>
      </Container>
    </Section>
  );
};

export default AuthLayout;
