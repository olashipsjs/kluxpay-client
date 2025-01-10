import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Overlay from '@components/overlay/Overlay';
import TokenBalance from '@components/shared/crypto/CryptoBalance';
import CoinPrice from '@components/shared/crypto/CryptoPrice';
import networks from '@constants/networks';
import UpdateWalletFeature from '@features/shared/modals/update-wallet/Feature';
import useUser from '@hooks/useUser';
import useWallets from '@hooks/useWallets';
import currencySymbol from '@utils/currencySymbol';
import formatDecimal from '@utils/formatDecimal';
import React from 'react';

const Portfolio = () => {
  const { user } = useUser();
  const { wallet } = useWallets();

  const { symbol } = networks.find((n) => n.name === wallet?.network)!;

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
          coinId={wallet?.network || ''}
          fiat={user?.currency}
        >
          {({ price }) => {
            return (
              <TokenBalance
                contractAddress={''}
                walletId={wallet?._id || ''}
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
              </TokenBalance>
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
          {wallet?.name || 'No name'}
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
