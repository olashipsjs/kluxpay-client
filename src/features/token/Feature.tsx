import React from 'react';
import Chart from './components/Chart';
import Actions from './components/Actions';
import { Helmet } from 'react-helmet-async';
import { useParams, useSearchParams } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import Information from './components/Information';
import Container from '@components/base/container/Container';
import CoinData from '@components/shared/CoinData';
import Box from '@components/base/box/Box';
import Heading from '@components/base/heading/Heading';

const TokenFeature = () => {
  const [searchParams] = useSearchParams();
  const { token } = useParams<{ token: string }>();

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
              mt={24}
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
                  <Actions />
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
