import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Loader from '@components/base/button/Loader';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Anchor from '@components/anchor/Anchor';
import Text from '@components/base/text/Text';
import { GET_USER_TRADES } from '@graphql/trade';
import useApolloQuery from '@hooks/useApolloQuery';

const List = () => {
  const { loading, error, data } = useApolloQuery(GET_USER_TRADES);

  const trades = data?.getUserTrades;

  switch (true) {
    case loading:
      return (
        <Flex
          mt={32}
          alignItems={'center'}
          flexDirection={'column'}
        >
          <Loader
            visible
            width={'28px'}
            color={'indigo-60'}
          />
        </Flex>
      );
    case error !== undefined:
      return (
        <Flex
          mt={32}
          alignItems={'center'}
          flexDirection={'column'}
        >
          <Iconify
            width={'56px'}
            color={'red-60'}
            icon={'material-symbols-light:emoticon-rounded'}
          />
          <Heading
            mt={12}
            fontSize={21}
            lineHeight={'md'}
            textAlign={'center'}
          >
            {error?.message}
          </Heading>
        </Flex>
      );
    // case trades && trades.length === 0:
    //   return (
    //     <Flex
    //       mt={32}
    //       alignItems={'center'}
    //       flexDirection={'column'}
    //     >
    //       <Iconify
    //         width={'56px'}
    //         icon={'material-symbols-light:group-remove-rounded'}
    //       />
    //       <Heading
    //         mt={12}
    //         fontSize={21}
    //       >
    //         No trade event recorded
    //       </Heading>
    //     </Flex>
    //   );
    default:
      return (
        <Box
          notLastChild={{
            borderBottom: 1,
            borderBottomColor: 'gray-95',
          }}
        >
          {trades
            ? Array.from('abcdef').map((trade: any) => {
                return (
                  <Anchor
                    py={6}
                    px={20}
                    rounded={'none'}
                    key={trade._id}
                    color={'gray-50'}
                    display={'block'}
                    backgroundColor={'white'}
                    to={`/app/trade/${trade._id}`}
                    _hover={{
                      backgroundColor: 'gray-95',
                    }}
                  >
                    <Flex
                      gap={12}
                      width={'full'}
                      alignItems={'center'}
                    >
                      <Avatar
                        hasError
                        size={'28px'}
                        backgroundColor={'indigo-100'}
                      >
                        <Avatar.Fallback
                          color={'indigo-30'}
                          textTransform={'capitalize'}
                        >
                          {`Je`}
                        </Avatar.Fallback>
                      </Avatar>

                      <Heading
                        as={'h3'}
                        fontSize={16}
                        css={{ flex: 1 }}
                        textAlign={'left'}
                        fontWeight={'regular'}
                      >
                        {`Jeremiah Samael want to buy `}
                        <Text
                          fontSize={16}
                          color={'gray-10'}
                          fontWeight={'medium'}
                        >
                          {`32 USDT`}
                        </Text>
                      </Heading>

                      <Text
                        fontSize={13}
                        fontWeight={'medium'}
                      >
                        4 days ago
                      </Text>
                    </Flex>
                  </Anchor>
                );
              })
            : null}
        </Box>
      );
  }
};

export default List;
