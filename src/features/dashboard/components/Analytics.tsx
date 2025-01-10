import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Grid from '@components/base/grid/Grid';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import useUser from '@hooks/useUser';
import { formatDistanceToNow } from 'date-fns';

const Analytics = () => {
  const { user } = useUser();

  const analytics = [
    {
      title: 'trades',
      icon: 'fluent:coin-multiple-24-regular',
      amount: user?.trades || 0,
    },
    {
      title: 'offers',
      icon: 'fluent:fire-24-regular',
      amount: user?.offers || 0,
    },
    {
      title: 'payments',
      icon: 'fluent:briefcase-24-regular',
      amount: user?.payments || 0,
    },
    {
      title: 'referrals',
      icon: 'fluent:people-community-24-regular',
      amount: user?.referrals || 0,
    },
  ];

  return (
    <Grid
      gap={12}
      gridTemplateColumns={{ initial: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }}
    >
      {analytics.map((analytic, index) => {
        return (
          <Box
            py={16}
            px={16}
            border={1}
            key={index}
            rounded={8}
            borderColor={'gray-90'}
            notLastChild={{ mb: 16 }}
            backgroundColor={'white'}
          >
            <Flex
              alignItems={'center'}
              justifyContent={'between'}
            >
              <Heading
                fontSize={14}
                lineHeight={'1'}
                textTransform={'capitalize'}
              >
                {analytic.title}
              </Heading>

              <Iconify
                width={20}
                color={'indigo-60'}
                icon={analytic.icon}
              />
            </Flex>

            <Heading
              fontSize={24}
              lineHeight={'1'}
            >
              {analytic.amount}
            </Heading>

            <Text
              fontSize={13}
              color={'gray-60'}
            >
              Member since{' '}
              <Text
                color={'gray-10'}
                fontWeight={'semibold'}
              >
                {formatDistanceToNow(user!.createdAt)}
              </Text>
            </Text>
          </Box>
        );
      })}
    </Grid>
  );
};

export default Analytics;
