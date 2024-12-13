import Anchor from '@components/anchor/Anchor';
import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Container from '@components/base/container/Container';
import Flex from '@components/base/flex/Flex';
import Section from '@components/base/section/Section';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Section>
      <Container
        py={24}
        mt={{ initial: 16, sm: 80 }}
        maxWidth={{ initial: 'full', sm: '400px' }}
      >
        <Box
          border={1}
          rounded={20}
          minHeight={'540px'}
          p={{ initial: 12, sm: 24 }}
          borderColor={{ initial: 'transparent', sm: 'gray-90' }}
        >
          <Avatar
            mb={32}
            rounded={'full'}
            size={'40px'}
            mx={'auto'}
          >
            <Avatar.Picture
              alt={'logo'}
              src={'https://alignui.com/images/logo/phoenix.svg'}
            />
          </Avatar>

          <Outlet />
        </Box>
        <Flex
          mt={40}
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
