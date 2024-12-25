import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Overlay from '@components/overlay/Overlay';
import AssetBalance from '@components/shared/AssetBalance';
import CoinPrice from '@components/shared/CoinPrice';
import networks from '@constants/networks';
import UpdateWalletFeature from '@features/shared/modals/update-wallet/Feature';
import useUser from '@hooks/useUser';
import currencySymbol from '@utils/currencySymbol';
import formatDecimal from '@utils/formatDecimal';
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const Portfolio = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const { user } = useUser();

  const WALLET_NAME = searchParams.get('name') || '';
  const WALLET_NETWORK = searchParams.get('network') || '';

  const { symbol } = networks.find((n) => n.name === WALLET_NETWORK)!;

  return (
    <Box
      border={1}
      rounded={12}
      borderColor={'gray-90'}
      backgroundColor={'white'}
      boxShadow={'0px 1px 0px 0px rgba(var(--gray-80))'}
    >
      <Flex
        p={12}
        justifyContent={'between'}
      >
        <CoinPrice
          coinId={WALLET_NETWORK}
          fiat={user?.currency}
        >
          {({ price }) => {
            return (
              <AssetBalance
                walletId={id || ''}
                contractAddress={''}
              >
                {({ balance }) => {
                  return (
                    <React.Fragment>
                      <Box>
                        <Heading
                          fontSize={14}
                          lineHeight={'1'}
                        >
                          Portfolio Value
                        </Heading>
                        <Heading
                          mt={12}
                          fontSize={21}
                          lineHeight={'1'}
                        >{`${currencySymbol(user?.currency)}${formatDecimal(
                          price * balance
                        )}`}</Heading>
                      </Box>
                      <Box>
                        <Heading
                          fontSize={14}
                          color={'gray-60'}
                          textAlign={'right'}
                          fontWeight={'regular'}
                        >{`${formatDecimal(
                          balance
                        )} ${symbol.toUpperCase()}`}</Heading>
                      </Box>
                    </React.Fragment>
                  );
                }}
              </AssetBalance>
            );
          }}
        </CoinPrice>
      </Flex>

      <Flex
        p={12}
        mt={32}
        alignItems={'center'}
        justifyContent={'between'}
      >
        <Heading
          fontSize={14}
          lineHeight={'1'}
          textTransform={'capitalize'}
        >
          {WALLET_NAME}
        </Heading>

        <Overlay>
          <Overlay.Trigger
            py={4}
            fontSize={12}
            width={'fit'}
            color={'gray-60'}
            borderColor={'transparent'}
            backgroundColor={'gray-95'}
            _hover={{ color: 'gray-10', backgroundColor: 'gray-90' }}
          >
            Edit
          </Overlay.Trigger>
          <UpdateWalletFeature />
        </Overlay>
      </Flex>
    </Box>
  );
};

export default Portfolio;
