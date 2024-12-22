import Anchor from '@components/anchor/Anchor';
import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Container from '@components/base/container/Container';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Section from '@components/base/section/Section';
import { useLocation } from 'react-router-dom';

const routes = [
  {
    label: 'General',
    to: '/app/settings/general/',
    icon: 'fluent:wrench-settings-24-regular',
  },
  {
    label: 'Profile',
    to: '/app/settings/profile/',
    icon: 'fluent:person-head-hint-24-regular',
  },
  {
    label: 'Security',
    to: '/app/settings/security/',
    icon: 'fluent:shield-keyhole-24-regular',
  },
  {
    label: 'Authentication',
    to: '/app/settings/authentication/',
    icon: 'fluent:key-multiple-24-regular',
  },
  {
    label: 'Payments',
    to: '/app/settings/payments/',
    icon: 'fluent:card-ui-24-regular',
  },
];

const Sidebar = () => {
  const location = useLocation();

  const isIndex = location.pathname === '/app/settings/';

  return (
    <Section
      width={'fit'}
      borderRight={1}
      height={'full'}
      position={'fixed'}
      borderRightColor={'gray-90'}
      display={{ initial: isIndex ? 'block' : 'hidden', sm: 'block' }}
    >
      <Container
        mx={0}
        ps={0}
        py={20}
        pe={{ initial: 0, sm: 20 }}
        width={{ initial: '100vw', sm: '240px' }}
      >
        <Heading>Settings</Heading>

        <Box
          mt={16}
          notLastChild={{
            mb: 4,
          }}
        >
          {routes.map((route, index) => {
            return (
              <Anchor
                end
                key={index}
                to={route.to}
                width={'full'}
              >
                {({ isActive }) => {
                  return (
                    <Button
                      py={6}
                      px={8}
                      gap={12}
                      border={1}
                      justifyContent={'start'}
                      color={isActive ? 'gray-10' : 'gray-60'}
                      boxShadow={
                        isActive ? '0px .75px 0px 0px rgba(var(--gray-90))' : ''
                      }
                      borderColor={isActive ? 'gray-90' : 'transparent'}
                      backgroundColor={isActive ? 'white' : 'transparent'}
                      _hover={{ backgroundColor: 'white' }}
                    >
                      <Iconify
                        width={20}
                        icon={route.icon}
                      />
                      {route.label}
                    </Button>
                  );
                }}
              </Anchor>
            );
          })}
        </Box>
      </Container>
    </Section>
  );
};

export default Sidebar;
