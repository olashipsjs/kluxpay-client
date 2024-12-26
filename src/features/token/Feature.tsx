import React from 'react';
import Chart from './components/Chart';
import { Helmet } from 'react-helmet-async';
import { useParams, useSearchParams } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import Information from './components/Information';
import Container from '@components/base/container/Container';
import CoinData from '@components/shared/CoinData';
import Box from '@components/base/box/Box';
import Heading from '@components/base/heading/Heading';
import Grid from '@components/base/grid/Grid';
import Overlay from '@components/overlay/Overlay';
import Iconify from '@components/base/iconify/Iconify';
import DepositFeature from '@features/shared/modals/deposit/Feature';
import WithdrawFeature from '@features/shared/modals/withdraw/Feature';

const TokenFeature = () => {
  const [searchParams] = useSearchParams();
  const { id, token } = useParams<{ id: string; token: string }>();

  const NETWORK = searchParams.get('network') || '';

  return (
    <React.Fragment>
      <Helmet>
        <title>Token - {token}</title>
      </Helmet>

      <CoinData
        id={token || ''}
        network={NETWORK}
      >
        {({ data, error }) => {
          return (
            <Container
              pt={24}
              maxWidth={'480px'}
              notLastChild={{
                mb: 24,
              }}
            >
              {error ? (
                <Box
                  py={6}
                  px={12}
                  border={1}
                  rounded={12}
                  borderColor={'gray-90'}
                  backgroundColor={'white'}
                  boxShadow={'0px .75px 0px 0px rgba(var(--gray-80))'}
                >
                  <Heading
                    fontSize={13}
                    color={'red-60'}
                  >
                    Unable to load resource. Try refreshing the page
                  </Heading>
                </Box>
              ) : null}
              {data ? (
                <React.Fragment>
                  {' '}
                  <Portfolio
                    image={data.image}
                    symbol={data.symbol}
                    contractAddress={data.contractAddress}
                  />
                  <Grid
                    gap={8}
                    gridTemplateColumns={'1fr 1fr'}
                  >
                    <Overlay>
                      <Overlay.Trigger
                        py={8}
                        color={'gray-60'}
                        borderColor={'gray-90'}
                        backgroundColor={'white'}
                        boxShadow={'0px .5px 0px 0px rgba(var(--gray-80))'}
                        _hover={{
                          color: 'gray-10',
                          backgroundColor: 'gray-100',
                        }}
                      >
                        <Iconify
                          width={'20px'}
                          icon={'fluent:arrow-download-24-regular'}
                        />
                        Deposit
                      </Overlay.Trigger>
                      <DepositFeature />
                    </Overlay>
                    <Overlay>
                      <Overlay.Trigger
                        py={8}
                        color={'gray-60'}
                        borderColor={'gray-90'}
                        backgroundColor={'white'}
                        boxShadow={'0px .5px 0px 0px rgba(var(--gray-80))'}
                        _hover={{
                          color: 'gray-10',
                          backgroundColor: 'gray-100',
                        }}
                      >
                        <Iconify
                          width={'20px'}
                          icon={'fluent:arrow-upload-24-regular'}
                        />
                        Withdraw
                      </Overlay.Trigger>
                      <WithdrawFeature
                        coin={{
                          symbol: data.symbol,
                          id: data.id,
                          name: data.name,
                        }}
                        walletId={id}
                        contractAddress={data.contractAddress}
                      />
                    </Overlay>
                  </Grid>
                  <Chart />
                  <Information
                    volume={data.volume}
                    dailyLow={data.dailyLow}
                    marketCap={data.marketCap}
                    dailyHigh={data.dailyHigh}
                    dailyChange={data.dailyChange}
                  />
                </React.Fragment>
              ) : null}
            </Container>
          );
        }}
      </CoinData>
    </React.Fragment>
  );
};

export default TokenFeature;
