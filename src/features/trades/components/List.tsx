import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
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
    case trades && trades.length === 0:
      return (
        <Flex
          mt={32}
          alignItems={'center'}
          flexDirection={'column'}
        >
          <Iconify
            width={'56px'}
            icon={'material-symbols-light:group-remove-rounded'}
          />
          <Heading
            mt={12}
            fontSize={21}
          >
            No trade event recorded
          </Heading>
        </Flex>
      );
    default:
      return (
        <Box
          notLastChild={{
            mb: 4,
          }}
        >
          {trades
            ? trades.map((trade: any) => {
                return (
                  <Anchor
                    px={8}
                    py={4}
                    key={trade._id}
                    color={'gray-50'}
                    display={'block'}
                    to={`/app/trade/${trade._id}`}
                    _hover={{
                      backgroundColor: 'gray-100',
                    }}
                  >
                    <Flex
                      gap={12}
                      width={'full'}
                      alignItems={'center'}
                    >
                      <Avatar
                        hasError
                        size={'24px'}
                        backgroundColor={'indigo-100'}
                      >
                        <Avatar.Fallback
                          color={'indigo-30'}
                          textTransform={'uppercase'}
                        >
                          {`${trade.offer.createdBy.firstName[0]}`}
                        </Avatar.Fallback>
                      </Avatar>

                      <Heading
                        as={'h3'}
                        fontSize={16}
                        textAlign={'left'}
                        letterSpacing={'xs'}
                        textTransform={'capitalize'}
                        css={{ flex: 1 }}
                      >
                        {`${trade.offer.createdBy.firstName} ${trade.offer.createdBy.lastName} — `}
                        <Text
                          fontSize={16}
                          color={'gray-60'}
                          fontWeight={'regular'}
                          textTransform={'capitalize'}
                        >{`${trade.offer.type} ${trade.amount} ${trade.offer.coinId}`}</Text>
                      </Heading>

                      <Button
                        py={2}
                        px={12}
                        size={'fit'}
                        rounded={'full'}
                        color={'gray-60'}
                        borderColor={'gray-95'}
                        backgroundColor={'gray-95'}
                        _hover={{
                          color: 'white',
                          backgroundColor: 'gray-80',
                          borderColor: 'gray-80',
                        }}
                      >
                        <Iconify
                          width={'20px'}
                          icon={'material-symbols-light:note-stack-rounded'}
                        />
                      </Button>
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
