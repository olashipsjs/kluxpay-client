import React from 'react';
import { Helmet } from 'react-helmet-async';
import useWallets from '@hooks/useWallets';
import Container from '@components/base/container/Container';
import Flex from '@components/base/flex/Flex';
import Image from '@components/base/image/Image';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import useUser from '@hooks/useUser';
import formatDecimal from '@utils/formatDecimal';
import Query from '@components/query/Query';
import { useParams } from 'react-router-dom';
import { GET_COIN_BY_NAME } from '@graphql/coin';
import Box from '@components/base/box/Box';
import CryptoBalance from '@components/shared/crypto/CryptoBalance';
import Iconify from '@components/base/iconify/Iconify';
import Overlay from '@components/overlay/Overlay';
import DepositFeature from '@features/shared/modals/deposit/Feature';
import WithdrawFeature from '@features/shared/modals/withdraw/Feature';
import Anchor from '@components/anchor/Anchor';

const TokenFeature = () => {
  const { user } = useUser();
  const { id } = useParams<{ id: string }>();
  const { token, wallet, setWallets } = useWallets();

  const QUOTE = token?.quote[user?.fiat.symbol || 'USD'];

  return (
    <React.Fragment>
      <Helmet>
        <title>Token - {id}</title>
      </Helmet>

      <Query
        query={GET_COIN_BY_NAME}
        onCompleted={(data) => {
          if (data && data.getCoinByName) {
            setWallets({
              type: 'SET_CURRENT_TOKEN',
              payload: { token: data.getCoinByName },
            });
          }
        }}
        keys={{ coinName: id, convert: user?.fiat?.symbol || 'USD' }}
      >
        <Query.Loader />
        <Query.Error>
          <Text
            fontSize={16}
            color={'red-60'}
          >
            Error fetching data.
          </Text>
        </Query.Error>
        <Query.Data mt={24}>
          {token ? (
            <Container maxWidth={'480px'}>
              <Flex
                gap={8}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Image
                  size={'20px'}
                  src={token.logo}
                  alt={token.name}
                />
                <Heading
                  fontSize={16}
                  lineHeight={'1'}
                  fontWeight={'semibold'}
                >
                  {token.name}
                </Heading>
              </Flex>

              <Box my={20}>
                <CryptoBalance
                  walletId={wallet?._id || ''}
                  contractAddress={token.platform?.token_address}
                >
                  {({ balance }) => {
                    return (
                      <React.Fragment>
                        <Heading
                          as={'p'}
                          lineHeight={'1'}
                          textAlign={'center'}
                          fontWeight={'semibold'}
                        >
                          {`${formatDecimal(balance || 0)} ${token.symbol}`}
                        </Heading>
                        <Text
                          mt={12}
                          as={'p'}
                          fontSize={14}
                          lineHeight={'1'}
                          textAlign={'center'}
                        >
                          {`= ${user?.fiat.sign}${formatDecimal(
                            balance * QUOTE.price
                          )}`}
                        </Text>
                      </React.Fragment>
                    );
                  }}
                </CryptoBalance>
              </Box>

              <Flex
                gap={32}
                justifyContent={'center'}
              >
                <Overlay
                  gap={10}
                  alignItems={'center'}
                  flexDirection={'column'}
                >
                  <Overlay.Trigger
                    py={4}
                    px={16}
                    rounded={'full'}
                    color={'gray-60'}
                    borderColor={'transparent'}
                    backgroundColor={'gray-95'}
                    _hover={{ color: 'gray-10', backgroundColor: 'gray-90' }}
                  >
                    <Iconify
                      width={20}
                      icon={'fluent:add-24-filled'}
                    />
                  </Overlay.Trigger>
                  <Heading
                    fontSize={13}
                    lineHeight={'1'}
                  >
                    Deposit
                  </Heading>
                  <DepositFeature />
                </Overlay>

                <Overlay
                  gap={10}
                  alignItems={'center'}
                  flexDirection={'column'}
                >
                  <Overlay.Trigger
                    py={4}
                    px={16}
                    rounded={'full'}
                    color={'gray-60'}
                    borderColor={'transparent'}
                    backgroundColor={'gray-95'}
                    _hover={{ color: 'gray-10', backgroundColor: 'gray-90' }}
                  >
                    <Iconify
                      width={20}
                      icon={'fluent:arrow-forward-24-filled'}
                    />
                  </Overlay.Trigger>
                  <Heading
                    fontSize={13}
                    lineHeight={'1'}
                  >
                    Withdraw
                  </Heading>
                  <WithdrawFeature />
                </Overlay>

                <Flex
                  gap={10}
                  alignItems={'center'}
                  flexDirection={'column'}
                >
                  <Anchor
                    py={4}
                    px={16}
                    rounded={'full'}
                    color={'gray-60'}
                    to={'/app/market'}
                    borderColor={'transparent'}
                    backgroundColor={'gray-95'}
                    _hover={{ color: 'gray-10', backgroundColor: 'gray-90' }}
                  >
                    <Iconify
                      width={20}
                      icon={'fluent:arrow-swap-24-filled'}
                    />
                  </Anchor>
                  <Heading
                    fontSize={13}
                    lineHeight={'1'}
                  >
                    Trade
                  </Heading>
                </Flex>
              </Flex>

              <Box mt={32}>
                <Heading fontSize={16}>Stats</Heading>
                <Box
                  p={4}
                  mt={8}
                  rounded={10}
                  notLastChild={{ mb: 2 }}
                  backgroundColor={'gray-100'}
                >
                  <Flex
                    py={8}
                    px={12}
                    rounded={8}
                    alignItems={'center'}
                    backgroundColor={'white'}
                    justifyContent={'between'}
                    boxShadow={'0px 0px 0px 1px rgba(var(--gray-95))'}
                  >
                    <Heading
                      fontSize={13}
                      color={'gray-60'}
                    >
                      Market Cap
                    </Heading>
                    <Heading
                      fontSize={13}
                      fontWeight={'semibold'}
                    >
                      {`${user?.fiat?.sign}${formatDecimal(QUOTE.market_cap)}`}
                    </Heading>
                  </Flex>
                  <Flex
                    py={8}
                    px={12}
                    rounded={8}
                    alignItems={'center'}
                    backgroundColor={'white'}
                    justifyContent={'between'}
                    boxShadow={'0px 0px 0px 1px rgba(var(--gray-95))'}
                  >
                    <Heading
                      fontSize={13}
                      color={'gray-60'}
                    >
                      Circulating supply
                    </Heading>
                    <Heading
                      fontSize={13}
                      fontWeight={'semibold'}
                    >
                      {formatDecimal(token.circulating_supply)}
                    </Heading>
                  </Flex>
                  <Flex
                    py={8}
                    px={12}
                    rounded={8}
                    alignItems={'center'}
                    backgroundColor={'white'}
                    justifyContent={'between'}
                    boxShadow={'0px 0px 0px 1px rgba(var(--gray-95))'}
                  >
                    <Heading
                      fontSize={13}
                      color={'gray-60'}
                    >
                      Total supply
                    </Heading>
                    <Heading
                      fontSize={13}
                      fontWeight={'semibold'}
                    >
                      {formatDecimal(token.total_supply)}
                    </Heading>
                  </Flex>
                  <Flex
                    py={8}
                    px={12}
                    rounded={8}
                    alignItems={'center'}
                    backgroundColor={'white'}
                    justifyContent={'between'}
                    boxShadow={'0px 0px 0px 1px rgba(var(--gray-95))'}
                  >
                    <Heading
                      fontSize={13}
                      color={'gray-60'}
                    >
                      Volume(24h)
                    </Heading>
                    <Heading
                      fontSize={13}
                      fontWeight={'semibold'}
                    >
                      {`${user?.fiat.sign}${formatDecimal(QUOTE.volume_24h)}`}
                    </Heading>
                  </Flex>
                </Box>
              </Box>
            </Container>
          ) : null}
        </Query.Data>
      </Query>
    </React.Fragment>
  );
};

export default TokenFeature;
