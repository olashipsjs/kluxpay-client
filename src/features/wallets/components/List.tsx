import Alert from '@components/alert/Alert';
import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Loader from '@components/base/button/Loader';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import Clipboard from '@components/clipboard/Clipboard';
import CoinPrice from '@components/shared/CoinPrice';
import coins from '@constants/coins';
import useUser from '@hooks/useUser';
import useWallet from '@hooks/useWallet';
import currencySymbol from '@utils/currencySymbol';
import formatDecimal from '@utils/formatDecimal';
import React from 'react';

const List = () => {
  const { wallets } = useWallet();
  const { user } = useUser();

  return (
    <Box>
      <Box>
        <Flex
          alignItems={'center'}
          flexDirection={'column'}
        >
          <Iconify
            p={12}
            border={1}
            width={'56px'}
            rounded={'full'}
            borderColor={'gray-80'}
            backgroundColor={'white'}
            icon={'fluent:layer-diagonal-24-regular'}
          />
          <Heading
            mt={12}
            as={'h2'}
            textAlign={'center'}
          >
            Manage Wallets
          </Heading>
        </Flex>

        <Loader
          mt={20}
          visible={wallets === undefined}
        />

        <Alert visible={wallets === null}>
          <Alert.Message>
            Could not fetch wallets. Try refreshing the page
          </Alert.Message>
        </Alert>

        <Box
          mt={20}
          border={1}
          rounded={16}
          borderColor={'gray-90'}
          backgroundColor={'white'}
          notLastChild={{
            borderBottom: 1,
            borderBottomColor: 'gray-90',
          }}
          boxShadow={'0px .75px 0px 0px rgba(var(--gray-90))'}
        >
          {wallets && wallets.length > 0
            ? wallets.map((wallet) => {
                const coin = coins.find(
                  (coin) => coin.name === wallet.platform
                )!;

                return (
                  <Flex
                    py={8}
                    px={16}
                    gap={12}
                    key={wallet._id}
                  >
                    <Avatar size={'36px'}>
                      <Avatar.Picture src={coin.image} />
                    </Avatar>

                    <Box css={{ flex: 1 }}>
                      <Heading
                        as={'h3'}
                        fontSize={14}
                        textTransform={'capitalize'}
                      >
                        {wallet.platform}
                      </Heading>
                      <Clipboard>
                        {({ handleCopy, copied }) => {
                          return (
                            <Flex
                              gap={6}
                              alignItems={'center'}
                            >
                              <Box display={{ initial: 'hidden', sm: 'block' }}>
                                <Text
                                  as={'p'}
                                  fontSize={13}
                                >
                                  {`${wallet.publicKey.substring(
                                    0,
                                    5
                                  )} ***** ${wallet.publicKey.substring(
                                    wallet.publicKey.length - 5
                                  )}`}
                                </Text>
                              </Box>
                              <Button
                                p={0}
                                width={'fit'}
                                size={'20px'}
                                rounded={'full'}
                                disabled={copied}
                                borderColor={'transparent'}
                                backgroundColor={'transparent'}
                                color={copied ? 'green-60' : 'gray-60'}
                                onClick={() => handleCopy(wallet.publicKey)}
                                _hover={{
                                  scale: 1.1,
                                  backgroundColor: 'transparent',
                                  color: copied ? 'green-60' : 'gray-10',
                                }}
                              >
                                <Iconify
                                  width={16}
                                  icon={
                                    copied
                                      ? 'fluent:checkmark-underline-circle-24-regular'
                                      : 'fluent:copy-24-regular'
                                  }
                                />
                              </Button>
                            </Flex>
                          );
                        }}
                      </Clipboard>
                    </Box>

                    <Box>
                      <CoinPrice
                        fiat={'ngn'}
                        coinId={'ethereum'}
                      >
                        {({ price }) => {
                          return (
                            <React.Fragment>
                              <Heading
                                as={'h4'}
                                fontSize={14}
                                textAlign={'right'}
                              >
                                {`${currencySymbol(
                                  user?.currency
                                )} ${formatDecimal(price * wallet.balance)}`}
                              </Heading>
                              <Text
                                mt={2}
                                as={'p'}
                                fontSize={13}
                                textAlign={'right'}
                              >
                                {`${formatDecimal(
                                  wallet.balance
                                )} ${coin.symbol.toUpperCase()}`}
                              </Text>
                            </React.Fragment>
                          );
                        }}
                      </CoinPrice>
                    </Box>
                  </Flex>
                );
              })
            : null}
        </Box>
      </Box>
    </Box>
  );
};

export default List;
