import Anchor from '@components/anchor/Anchor';
import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Grid from '@components/base/grid/Grid';
import Heading from '@components/base/heading/Heading';
import Image from '@components/base/image/Image';
import Text from '@components/base/text/Text';

const Actions = () => {
  const actions = [
    {
      path: 'my-offers',
      label: 'Manage offers',
      buttonLabel: 'Go to My Offers',
      title: 'Post your offers to start trading as a merchant',
      icon: 'https://img.icons8.com/?size=1000&id=13027&format=png',
    },
    {
      label: 'Buy or Sell',
      title: 'Visit Kluxpay Market to sell or buy cryptocurrencies',
      path: 'market',
      icon: 'https://img.icons8.com/?size=1000&id=114321&format=png',
      buttonLabel: 'Buy or Sell',
    },
    {
      path: 'referral',
      label: 'Invite & Earn',
      icon: 'https://img.icons8.com/?size=1000&id=12127&format=png',
      title: 'Invite your friends and earn up to 1 USDT',
      buttonLabel: 'Refer friends',
    },
  ];

  return (
    <Grid
      gap={12}
      gridTemplateColumns={{ initial: '', md: '1fr 1fr 1fr' }}
    >
      {actions.map((action, index) => {
        return (
          <Flex
            p={12}
            border={1}
            key={index}
            rounded={12}
            height={'32rem'}
            overflow={'clip'}
            position={'relative'}
            flexDirection={'column'}
            backgroundColor={'white'}
            borderColor={'gray-90'}
          >
            <Image
              width={'100%'}
              height={'40px'}
              objectFit={'contain'}
              src={action.icon}
            />

            <Text
              mt={24}
              as={'p'}
              fontSize={12}
              color={'gray-60'}
              textAlign={'center'}
              fontWeight={'medium'}
            >
              {action.label}
            </Text>

            <Box
              mx={'auto'}
              maxWidth={'80%'}
              css={{ flex: 1 }}
            >
              <Heading
                mt={12}
                fontSize={17}
                lineHeight={'1.25'}
                textAlign={'center'}
              >
                {action.title}
              </Heading>
            </Box>

            <Anchor
              py={10}
              border={1}
              to={action.path}
              color={'gray-40'}
              borderColor={'gray-90'}
              fontWeight={'semibold'}
              _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
            >
              {action.buttonLabel}
            </Anchor>
          </Flex>
        );
      })}
    </Grid>
  );
};

export default Actions;
