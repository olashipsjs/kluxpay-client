import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import Overlay from '@components/overlay/Overlay';
import CryptoPrice from '@components/shared/crypto/CryptoPrice';
import CryptoBalance from '@components/shared/crypto/CryptoBalance';
import CryptoList from '@components/shared/crypto/CryptoList';
import useUser from '@hooks/useUser';
import useWallets from '@hooks/useWallets';
import formatDecimal from '@utils/formatDecimal';
import React from 'react';
import Anchor from '@components/anchor/Anchor';
import Image from '@components/base/image/Image';
import DepositFeature from '@features/shared/modals/deposit/Feature';
import WithdrawFeature from '@features/shared/modals/withdraw/Feature';

const Information = () => {
  const { user } = useUser();
  const { wallet } = useWallets();

  return (
    <React.Fragment>
      <Flex
        gap={20}
        alignItems={'start'}
        justifyContent={'between'}
        flexDirection={{ initial: 'column', sm: 'row' }}
      >
        <CryptoBalance walletId={wallet?._id || ''}>
          {({ balance }) => {
            return (
              <CryptoPrice
                coinId={1027}
                convert={user?.fiat.symbol}
              >
                {({ data }) => {
                  const price =
                    data?.quote?.[user?.fiat.symbol || '']?.price || 0;

                  return (
                    <Box>
                      <Text
                        fontSize={14}
                        lineHeight={'1'}
                      >
                        My balance
                      </Text>
                      <Flex
                        my={8}
                        gap={8}
                      >
                        <Heading
                          fontSize={32}
                          lineHeight={'1'}
                          fontWeight={'semibold'}
                        >
                          {`${user?.fiat.sign}`}
                          {`${formatDecimal(price * balance)}`}
                        </Heading>
                        <Image
                          size={'16px'}
                          src={data?.logo}
                          alt={data?.name}
                        />
                      </Flex>
                      <Text
                        fontSize={14}
                        lineHeight={'1'}
                      >
                        {`${formatDecimal(balance)} ${data.symbol}`}
                      </Text>
                    </Box>
                  );
                }}
              </CryptoPrice>
            );
          }}
        </CryptoBalance>
        <Flex gap={6}>
          <Overlay>
            <Overlay.Trigger
              py={4}
              px={16}
              fontSize={16}
              color={'white'}
              rounded={'full'}
              fontWeight={'regular'}
              _hover={{
                scale: 1.1,
                borderColor: 'indigo-70',
                backgroundColor: 'indigo-70',
              }}
            >
              <Iconify
                width={20}
                icon={'fluent:add-24-filled'}
              />
            </Overlay.Trigger>
            <DepositFeature />
          </Overlay>
          <Overlay>
            <Overlay.Trigger
              py={4}
              px={16}
              fontSize={16}
              rounded={'full'}
              color={'gray-40'}
              fontWeight={'regular'}
              borderColor={'gray-90'}
              backgroundColor={'transparent'}
              _hover={{
                scale: 1.1,
                color: 'gray-10',
                backgroundColor: 'gray-100',
              }}
            >
              <Iconify
                width={20}
                icon={'fluent:arrow-forward-24-filled'}
              />
            </Overlay.Trigger>
            <WithdrawFeature />
          </Overlay>
        </Flex>
      </Flex>
    </React.Fragment>
  );
};

const Tokens = () => {
  const { user } = useUser();

  return (
    <Box
      rounded={12}
      backgroundColor={'white'}
      notLastChild={{ mb: 12 }}
    >
      <Box py={8}>
        <Heading
          fontSize={17}
          lineHeight={'1'}
        >
          Assets
        </Heading>
      </Box>
      <Box
        p={2}
        rounded={10}
        backgroundColor={'gray-100'}
      >
        <CryptoList>
          {({ coins }) => {
            return (
              <React.Fragment>
                {coins?.map((coin: any) => {
                  const hourChange =
                    coin.quote?.[user?.fiat?.symbol || 'USD']
                      ?.percent_change_1h;

                  const price = coin.quote[user?.fiat?.symbol || 'USD'].price;

                  return (
                    <Anchor
                      px={16}
                      py={10}
                      gap={16}
                      rounded={8}
                      key={coin.id}
                      width={'full'}
                      textAlign={'left'}
                      alignItems={'start'}
                      justifyContent={'start'}
                      to={`/app/wallets/${coin.slug}`}
                      _hover={{
                        backgroundColor: 'white',
                        boxShadow: '0px 0px 0px 1px rgba(var(--gray-95))',
                      }}
                    >
                      <Avatar size={'24px'}>
                        <Avatar.Picture src={coin.logo} />
                      </Avatar>

                      <Box css={{ flex: 1 }}>
                        <Heading
                          fontSize={13}
                          lineHeight={'1'}
                          textTransform={'uppercase'}
                        >
                          {coin.symbol}
                        </Heading>
                        <Text
                          mt={6}
                          as={'p'}
                          fontSize={13}
                          lineHeight={'1'}
                          color={'gray-60'}
                        >
                          {`${user?.fiat.sign}${formatDecimal(price, {
                            minFraction: 2,
                            maxFraction: 3,
                          })}`}
                          <Text
                            ms={8}
                            color={hourChange > 0 ? 'green-50' : 'red-50'}
                          >
                            {formatDecimal(hourChange, {
                              minFraction: 2,
                              maxFraction: 2,
                            })}
                          </Text>
                        </Text>
                      </Box>

                      <Box>
                        <Heading
                          fontSize={13}
                          lineHeight={'1'}
                          textAlign={'right'}
                          fontWeight={'bold'}
                          textTransform={'uppercase'}
                        >
                          {/* <CryptoBalance
                          walletId={wallet?._id || ''}
                          contractAddress={coin.platform?.token_address}
                        >
                          {({ balance }) => {
                            return `${formatDecimal(balance || 0.0, {
                              maxFraction: 5,
                              minFraction: 2,
                            })} ${coin.symbol}`;
                          }}
                        </CryptoBalance> */}
                        </Heading>
                      </Box>
                    </Anchor>
                  );
                })}
              </React.Fragment>
            );
          }}
        </CryptoList>
      </Box>
    </Box>
  );
};

const Main = () => {
  return (
    <Box notLastChild={{ mb: 32 }}>
      <Heading>Wallets</Heading>
      <Information />
      <Tokens />
    </Box>
  );
};

export default Main;
