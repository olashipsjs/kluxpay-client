import React from 'react';
import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';

const features = [
  {
    title: 'P2P trading',
    detail:
      'Enjoy freedom from intermediaries and fees trading your tokens with other users.',
    icon: 'solar:users-group-rounded-bold',
  },
  {
    title: 'Personalized wallets',
    detail:
      'Access tools and analytics to make investment decisions and grow your wallet with confidence.',
    icon: 'material-symbols-light:wallet',
  },
  {
    title: 'Secure',
    detail:
      'Advanced encryption protocols to ensure your assets remain safe and secure.',
    icon: 'material-symbols:lock-reset',
  },
];

const Main = () => {
  return (
    <Box css={{ marginTop: 64, flex: 1, height: '100%' }}>
      <Heading lineHeight={'lg'}>
        Trade 100<sup>+</sup> digital assets
      </Heading>

      <Box
        mt={48}
        notLastChild={{
          mb: 24,
        }}
      >
        {features.map((feature: (typeof features)[number], index) => {
          return (
            <Flex key={index}>
              <Iconify
                width={'2em'}
                icon={feature.icon}
                color={'rgb(var(--indigo-60))'}
              />
              <Box
                ms={10}
                css={{ flex: 1 }}
                alignItems={'center'}
              >
                <Heading css={{ fontSize: 17, fontWeight: 500 }}>
                  {feature.title}
                </Heading>
                <Text
                  mt={12}
                  as={'p'}
                  fontSize={13}
                  color={'gray-30'}
                  lineHeight={'md'}
                >
                  {feature.detail}
                </Text>
              </Box>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
};

export default Main;
