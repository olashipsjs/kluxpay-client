import React from 'react';
import { Helmet } from 'react-helmet-async';
import Analytics from './components/Analytics';
import Divider from '@components/divider/Divider';
import Actions from './components/Actions';
import Options from './components/Options';
import AccountBalance from '@components/shared/crypto/AccountBalance';
import Heading from '@components/base/heading/Heading';
import CryptoPrice from '@components/shared/crypto/CryptoPrice';
import useUser from '@hooks/useUser';
import formatDecimal from '@utils/formatDecimal';
import Flex from '@components/base/flex/Flex';
import Text from '@components/base/text/Text';

const DashboardFeature = () => {
  const { user } = useUser();

  return (
    <React.Fragment>
      <Helmet>
        <title>Trade Ethereum Instantly</title>
      </Helmet>

      <Flex
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Text fontSize={13}>Total assets</Text>
        <AccountBalance>
          {({ balance }) => {
            return (
              <CryptoPrice coinId={1027}>
                {({ data }) => {
                  const price =
                    data?.quote?.[user?.fiat.symbol || 'USD']?.price || 0;
                  return (
                    <Heading
                      fontSize={24}
                      fontWeight={'semibold'}
                    >{`${user?.fiat.sign}${formatDecimal(
                      balance * price
                    )}`}</Heading>
                  );
                }}
              </CryptoPrice>
            );
          }}
        </AccountBalance>

        <Options />
      </Flex>

      <Divider my={24} />
      <Analytics />
      <Divider my={24} />
      <Actions />
    </React.Fragment>
  );
};

export default DashboardFeature;
