import Alert from '@components/alert/Alert';
import Anchor from '@components/anchor/Anchor';
import Box from '@components/base/box/Box';
import Loader from '@components/base/button/Loader';
import Flex from '@components/base/flex/Flex';
import Grid from '@components/base/grid/Grid';
import Heading from '@components/base/heading/Heading';
import Image from '@components/base/image/Image';
import Text from '@components/base/text/Text';
import SmallChart from '@components/charts/SmallChart';
import Divider from '@components/divider/Divider';
import AssetBalance from '@components/shared/AssetBalance';
import CoinChart from '@components/shared/CoinChart';
import CoinData from '@components/shared/CoinData';
import CoinList from '@components/shared/CoinList';
import networks from '@constants/networks';
import formatDecimal from '@utils/formatDecimal';
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const Assets = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();

  const WALLET_NAME = searchParams.get('name') || '';
  const WALLET_NETWORK = searchParams.get('network') || '';
  const WALLET_ADDRESS = searchParams.get('address') || '';

  const { categoryId } = networks.find((n) => n.name === WALLET_NETWORK)!;

  return (
    <CoinList category={categoryId}>
      {({ loading, data, error }) => {
        return (
          <Box
            border={1}
            rounded={12}
            borderColor={'gray-90'}
            backgroundColor={'white'}
            boxShadow={'0px 1px 0px 0px rgba(var(--gray-80))'}
          >
            <Flex
              px={12}
              py={8}
            >
              <Heading fontSize={14}>My assets</Heading>
            </Flex>

            <Alert
              m={8}
              timeout={0}
              visible={error !== null}
            >
              <Alert.Message>{error?.message}</Alert.Message>
            </Alert>

            <Divider backgroundColor={'gray-90'} />

            <Loader
              p={12}
              width={24}
              visible={loading}
              color={'gray-10'}
            />

            <Box
              notLastChild={{
                borderBottom: 1,
                borderBottomColor: 'gray-90',
              }}
            >
              {data
                ? data.map((token: any) => {
                    const URL = `/app/wallets/${id}/${token.id}/?name=${WALLET_NAME}&network=${WALLET_NETWORK}&address=${WALLET_ADDRESS}`;

                    return (
                      <Anchor
                        p={0}
                        to={URL}
                        rounded={0}
                        width={'full'}
                        key={token.id}
                        textAlign={'left'}
                        overflow={'hidden'}
                        display={'block'}
                        _hover={{
                          backgroundColor: 'gray-100',
                        }}
                      >
                        <Grid
                          px={12}
                          gap={0}
                          height={'52px'}
                          alignItems={'center'}
                          gridTemplateColumns={'1fr 4fr 2fr 4fr'}
                        >
                          <Image
                            p={6}
                            size={'28px'}
                            rounded={'full'}
                            src={token.image}
                            alt={token.name}
                            backgroundColor={'gray-95'}
                          />
                          <Box>
                            <Heading
                              fontSize={14}
                              lineHeight={'1'}
                              fontWeight={'regular'}
                            >{`${token.name}`}</Heading>
                            <Text
                              as={'p'}
                              mt={6}
                              fontSize={12}
                              lineHeight={'1'}
                              color={'gray-60'}
                              textTransform={'uppercase'}
                            >{`${token.symbol}`}</Text>
                          </Box>

                          <Flex
                            justifyContent={'center'}
                            css={{ flex: 1 }}
                          >
                            <CoinChart coinId={token.id}>
                              {({ prices }) => {
                                return prices ? (
                                  <SmallChart
                                    data={prices}
                                    dailyChange={token.dailyChange}
                                  />
                                ) : null;
                              }}
                            </CoinChart>
                          </Flex>

                          <CoinData
                            id={token.id}
                            network={WALLET_NETWORK}
                          >
                            {({ data }) => {
                              return (
                                <React.Fragment>
                                  <Flex
                                    alignItems={'end'}
                                    flexDirection={'column'}
                                  >
                                    {data ? (
                                      <AssetBalance
                                        walletId={id || ''}
                                        contractAddress={data.contractAddress}
                                      >
                                        {({ balance }) => {
                                          return (
                                            <Heading
                                              fontSize={13}
                                              lineHeight={'1'}
                                              textAlign={'right'}
                                            >{`${formatDecimal(
                                              balance
                                            )}`}</Heading>
                                          );
                                        }}
                                      </AssetBalance>
                                    ) : null}
                                    <Text
                                      mt={6}
                                      as={'p'}
                                      fontSize={12}
                                      lineHeight={'1'}
                                      textAlign={'right'}
                                      color={
                                        token.dailyChange < 0
                                          ? 'red-60'
                                          : 'green-60'
                                      }
                                    >{`${formatDecimal(
                                      token.dailyChange
                                    )}%`}</Text>
                                  </Flex>
                                </React.Fragment>
                              );
                            }}
                          </CoinData>
                        </Grid>
                      </Anchor>
                    );
                  })
                : null}
            </Box>
          </Box>
        );
      }}
    </CoinList>
  );
};

export default Assets;
