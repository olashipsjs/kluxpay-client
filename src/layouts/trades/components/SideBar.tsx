import Anchor from '@components/anchor/Anchor';
import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import Divider from '@components/divider/Divider';
import Tabs from '@components/tabs/Tabs';
import { GET_USER_TRADES } from '@graphql/trade';
import useApolloQuery from '@hooks/useApolloQuery';
import React from 'react';
import { useLocation } from 'react-router-dom';

const List = () => {
  const { data, error } = useApolloQuery(GET_USER_TRADES);

  if (error) {
    return <Heading fontSize={16}>Unable to fetch user trades</Heading>;
  }

  if (!data || !data?.getUserTrades) return null;

  const trades = data.getUserTrades;

  return (
    <Box
      border={1}
      rounded={12}
      width={'full'}
      overflow={'clip'}
      borderColor={'gray-90'}
      backgroundColor={'white'}
      boxShadow={'0px .5px 0px 0px rgba(var(--gray-80))'}
    >
      <Flex
        py={8}
        px={12}
      >
        <Heading
          as={'h3'}
          fontSize={14}
        >{`Found ${trades.length} trades`}</Heading>
      </Flex>

      {trades?.map((trade: any) => {
        return (
          <Anchor
            py={10}
            px={12}
            gap={12}
            rounded={0}
            width={'full'}
            key={trade._id}
            textAlign={'left'}
            justifyContent={'start'}
            to={`/app/trades/${trade._id}`}
            _hover={{ backgroundColor: 'gray-100' }}
          >
            <Avatar
              size={'32px'}
              backgroundColor={'purple-95'}
            >
              <Avatar.Picture
                src={
                  'https://hr-template.alignui.com/images/avatar/illustration/sophia.png'
                }
                alt={''}
              />
            </Avatar>

            <Box
              width={'full'}
              css={{ flex: 1 }}
            >
              <Flex
                alignItems={'center'}
                justifyContent={'between'}
              >
                <Heading
                  lineHeight={'1'}
                  fontSize={14}
                >
                  Alan Hunt
                </Heading>
                <Text
                  lineHeight={'1'}
                  fontSize={12}
                >
                  8:21 AM
                </Text>
              </Flex>

              <Box mt={4}>
                <Text
                  lineHeight={'1'}
                  fontSize={12}
                >
                  Buy 20 USDT
                </Text>
              </Box>
            </Box>
          </Anchor>
        );
      })}
    </Box>
  );
};

const typeTabs = [
  { label: 'Sell', value: 'sell' },
  { label: 'Buy', value: 'buy' },
];

const SideBar = () => {
  const location = useLocation();

  const CURRENT_PATH = location.pathname;
  const isParentRoute = CURRENT_PATH === '/app/trades/';

  return (
    <Box
      py={12}
      borderRight={1}
      position={'fixed'}
      minHeight={'full'}
      borderColor={'gray-80'}
      width={{ initial: 'full', md: '360px' }}
      display={{ initial: isParentRoute ? 'block' : 'hidden', md: 'block' }}
    >
      <Box px={12}>
        <Heading>Trades</Heading>
      </Box>

      <Divider
        my={4}
        backgroundColor={'transparent'}
      />

      <Tabs
        px={12}
        flexDirection={'column'}
        defaultTab={typeTabs[0].value}
      >
        {({ tab }) => {
          return (
            <React.Fragment>
              <Tabs.List
                gap={6}
                width={'full'}
              >
                {typeTabs.map((type) => {
                  const isActive = type.value === tab;

                  return (
                    <Tabs.Trigger
                      py={8}
                      key={type.value}
                      value={type.value}
                      color={isActive ? 'gray-10' : 'gray-60'}
                      borderColor={isActive ? 'gray-90' : 'transparent'}
                      backgroundColor={isActive ? 'white' : 'transparent'}
                      boxShadow={
                        isActive ? '0px .5px 0px 0px rgba(var(--gray-90))' : ''
                      }
                      _hover={{
                        color: 'gray-10',
                        backgroundColor: isActive ? 'white' : 'gray-100',
                      }}
                    >
                      {type.label}
                    </Tabs.Trigger>
                  );
                })}
              </Tabs.List>

              <Tabs.Panel
                mt={24}
                value={tab}
              >
                <List />
              </Tabs.Panel>
            </React.Fragment>
          );
        }}
      </Tabs>
    </Box>
  );
};

export default SideBar;
