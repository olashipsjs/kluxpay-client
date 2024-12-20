import Anchor from '@components/anchor/Anchor';
import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Grid from '@components/base/grid/Grid';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import Divider from '@components/divider/Divider';
import useApolloQuery from '@hooks/useApolloQuery';
import { GET_BALANCE } from '@graphql/wallet';

const actions = [
  {
    uri: '',
    icon: 'ph:coins-fill',
    headline: 'Manage Offers',
    caption: 'Create, edit, and view your buy or sell offers with ease.',
  },
  {
    uri: '',
    icon: 'ph:stack-simple-fill',
    headline: 'Start a Trade',
    caption:
      'Initiate secure, fast and low-fees peer-to-peer trades instantly.',
  },
  {
    uri: '',
    icon: 'ph:cards-three-fill',
    headline: 'Manage payments',
    caption: 'Set up and manage your payment methods for smooth transactions.',
  },
];

const QuickActions = () => {
  return (
    <Box
      p={20}
      mt={32}
      rounded={20}
      backgroundColor={'white'}
    >
      <Heading fontSize={17}>Quick actions</Heading>

      <Grid
        mt={20}
        gap={{ initial: 8, md: 20 }}
        gridTemplateColumns={{ initial: '1fr', md: '1fr 1fr 1fr' }}
      >
        {actions.map((action, index) => {
          return (
            <Box
              key={index}
              rounded={12}
              overflow={'clip'}
            >
              <Anchor
                py={12}
                px={20}
                rounded={0}
                width={'full'}
                to={action.uri}
                cursor={'pointer'}
                alignItems={'start'}
                justifyContent={'start'}
                backgroundColor={'gray-95'}
                gap={{ initial: 12, sm: 12 }}
                _hover={{
                  px: 24,
                  backgroundColor: 'gray-100',
                }}
              >
                <Iconify
                  width={'20px'}
                  color={'gray-10'}
                  icon={action.icon}
                />

                <Box css={{ flex: 1, textAlign: 'left' }}>
                  <Heading
                    fontSize={14}
                    fontWeight={'regular'}
                  >
                    {action.headline}
                  </Heading>
                  <Text
                    mt={6}
                    as={'p'}
                    fontSize={13}
                    lineHeight={'lg'}
                    color={'gray-40'}
                    fontWeight={'medium'}
                  >
                    {action.caption}
                  </Text>
                </Box>
              </Anchor>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};

const Offers = () => {
  return (
    <Box
      p={20}
      mt={32}
      rounded={20}
      backgroundColor={'white'}
    >
      <Flex
        alignItems={'center'}
        justifyContent={'between'}
      >
        <Heading fontSize={17}>Active offers</Heading>
        <Anchor
          py={8}
          px={16}
          fontSize={14}
          to={'/app/my-offers/'}
          backgroundColor={'gray-95'}
          _hover={{
            color: 'gray-10',
            backgroundColor: 'gray-90',
          }}
        >
          View all
        </Anchor>
      </Flex>

      <Divider
        my={12}
        backgroundColor={'gray-95'}
      />

      <Flex
        height={'6rem'}
        alignItems={'center'}
        justifyContent={'between'}
      >
        <Box>
          <Heading fontSize={17}>0 offers</Heading>
          <Text
            mt={6}
            as={'p'}
            fontSize={13}
          >
            Found on your account
          </Text>
        </Box>

        <Iconify
          width={'32px'}
          color={'orange-60'}
          icon={'ph:warning-fill'}
        />
      </Flex>
    </Box>
  );
};

const Segment = () => {
  const { data } = useApolloQuery(GET_BALANCE);

  return (
    <Box gridColumn={2}>
      <Flex
        mt={20}
        gap={0}
        rounded={20}
        width={'full'}
        justifyContent={'between'}
        backgroundColor={'white'}
        flexDirection={{ initial: 'column', md: 'row' }}
      >
        <Flex
          p={20}
          justifyContent={'between'}
          flexDirection={'column'}
          width={{ initial: 'full', sm: '70%' }}
        >
          <Flex
            width={'full'}
            justifyContent={'between'}
          >
            <Box css={{ flex: 1 }}>
              <Heading
                as={'p'}
                fontSize={17}
              >
                Your balance
              </Heading>
              <Text
                mt={8}
                as={'p'}
                fontSize={13}
                color={'gray-40'}
              >
                Today, 3:58 PM
              </Text>
            </Box>
            <Text
              as={'p'}
              fontSize={13}
              color={'gray-40'}
            >
              Found {`${data?.getBalance?.wallets?.length || 0}`} wallets
            </Text>
          </Flex>

          <Heading
            mt={40}
            fontSize={32}
            letterSpacing={'lg'}
          >
            {`${data?.getBalance?.balance || 0} ETH`}
          </Heading>

          <Flex
            mt={40}
            gap={8}
          >
            <Anchor
              py={10}
              px={16}
              border={1}
              fontSize={14}
              color={'white'}
              to={'/app/transfer/'}
              fontWeight={'medium'}
              borderColor={'gray-10'}
              backgroundColor={'gray-10'}
              _hover={{
                color: 'white',
                borderColor: 'gray-40',
                backgroundColor: 'gray-40',
              }}
            >
              Send token
            </Anchor>

            <Anchor
              py={10}
              px={16}
              border={1}
              fontSize={14}
              color={'gray-30'}
              to={'/app/transfer/'}
              fontWeight={'medium'}
              borderColor={'gray-90'}
              backgroundColor={'transparent'}
              _hover={{
                color: 'gray-10',
                backgroundColor: 'gray-95',
              }}
            >
              Receive token
            </Anchor>
          </Flex>
        </Flex>

        <Divider
          width={'1px'}
          height={'300px'}
          backgroundColor={'gray-90'}
          display={{ initial: 'hidden', md: 'block' }}
        />

        <Box
          px={16}
          py={12}
          notLastChild={{ mb: 4 }}
          width={{ initial: 'full', sm: '30%' }}
          display={{ initial: 'hidden', md: 'block' }}
        >
          {data?.getBalance?.wallets?.map((wallet: any) => {
            return (
              <Anchor
                py={6}
                px={8}
                gap={12}
                to={'/app/'}
                width={'full'}
                key={wallet._id}
                justifyContent={'start'}
                _hover={{
                  backgroundColor: 'gray-95',
                }}
              >
                <Avatar size={'32px'}>
                  <Avatar.Picture
                    src={`https://images.pexels.com/photos/7130546/pexels-photo-7130546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
                  />
                </Avatar>

                <Box css={{ flex: 1 }}>
                  <Heading
                    fontSize={14}
                    textAlign={'left'}
                    textTransform={'capitalize'}
                  >
                    {wallet?.platform}
                  </Heading>
                  <Text
                    mt={6}
                    as={'p'}
                    fontSize={12}
                    color={'gray-40'}
                    textAlign={'left'}
                  >
                    {`${wallet?.publicKey?.substring(
                      0,
                      6
                    )}****${wallet?.publicKey?.substring(
                      wallet?.publicKey.length - 6
                    )}`}
                  </Text>
                </Box>
              </Anchor>
            );
          })}
        </Box>
      </Flex>

      <QuickActions />

      <Offers />
    </Box>
  );
};

export default Segment;
