import React from 'react';
import Grid from '@components/base/grid/Grid';
import Anchor from '@components/anchor/Anchor';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Box from '@components/base/box/Box';
import useUser from '@hooks/useUser';

const groups = {
  trader: [
    {
      to: 'general',
      label: 'General',
      icon: 'fluent:globe-24-regular',
    },
    {
      label: 'Profile',
      to: 'profile',
      icon: 'fluent:person-24-regular',
    },
    {
      label: 'Security',
      to: 'security',
      icon: 'fluent:shield-keyhole-24-regular',
    },
    {
      label: 'Authentication',
      to: 'authentication',
      icon: 'fluent:key-multiple-24-regular',
    },
    {
      label: 'Payments',
      to: 'payments',
      icon: 'fluent:card-ui-24-regular',
    },
  ],

  administrator: [
    {
      to: 'tickets',
      label: 'All tickets',
      icon: 'fluent:chat-multiple-24-regular',
    },
  ],
};

const Main = () => {
  const { user } = useUser();

  return (
    <React.Fragment>
      <Heading>Settings</Heading>

      <Box notLastChild={{ mb: 48 }}>
        {Object.keys(groups).map((key: any) => {
          const routes = groups[key as keyof typeof groups];

          if (user?.role === key || key === 'trader') {
            return (
              <Box
                key={key}
                notLastChild={{ mb: 12 }}
              >
                <Heading
                  fontSize={14}
                  fontWeight={'semibold'}
                  textTransform={'capitalize'}
                >
                  {key}
                </Heading>

                <Grid
                  gap={8}
                  gridTemplateColumns={{
                    sm: '1fr 1fr',
                    initial: '1fr',
                    md: '1fr 1fr 1fr 1fr',
                  }}
                >
                  {routes.map((route, index) => {
                    return (
                      <Anchor
                        gap={8}
                        border={1}
                        key={index}
                        width={'full'}
                        color={'gray-10'}
                        fontWeight={'medium'}
                        borderColor={'gray-90'}
                        backgroundColor={'white'}
                        py={{ initial: 12, sm: 8 }}
                        px={{ initial: 12, sm: 12 }}
                        to={`/app/settings/${route.to}/`}
                        _hover={{ backgroundColor: 'gray-100' }}
                        justifyContent={{ initial: 'start', md: 'start' }}
                      >
                        <Iconify
                          width={20}
                          color={'gray-60'}
                          icon={route.icon}
                        />
                        {route.label}
                      </Anchor>
                    );
                  })}
                </Grid>
              </Box>
            );
          }
        })}
      </Box>
    </React.Fragment>
  );
};

export default Main;
