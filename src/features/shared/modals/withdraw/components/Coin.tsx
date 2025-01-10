import Box from '@components/base/box/Box';
import Image from '@components/base/image/Image';
import CryptoList from '@components/shared/crypto/CryptoList';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
// import CryptoBalance from '@components/shared/crypto/CryptoBalance';
import useWallets from '@hooks/useWallets';
import Button from '@components/base/button/Button';
import useStep from '@hooks/useStep';
// import useUser from '@hooks/useUser';
// import formatDecimal from '@utils/formatDecimal';

const Coin = () => {
  const { next } = useStep();
  //   const { user } = useUser();
  const { setWallets } = useWallets();

  return (
    <Box>
      <CryptoList>
        {({ coins }) => {
          return coins?.map((coin: any) => {
            // const price = coin.quote[user?.fiat?.symbol || 'USD'].price;

            return (
              <Button
                py={10}
                gap={12}
                value={coin}
                key={coin.id}
                type={'submit'}
                rounded={'none'}
                color={'gray-60'}
                textAlign={'left'}
                alignItems={'start'}
                fontWeight={'regular'}
                backgroundColor={'transparent'}
                onClick={() => {
                  setWallets({
                    type: 'SET_CURRENT_TOKEN',
                    payload: { token: coin },
                  });
                  next({});
                }}
                justifyContent={'start'}
                borderColor={'transparent'}
                _hover={{ backgroundColor: 'gray-100' }}
              >
                <Image
                  size={'24px'}
                  src={coin.logo}
                  rounded={'full'}
                />

                <Box css={{ flex: 1 }}>
                  <Heading
                    mb={6}
                    fontSize={13}
                    lineHeight={'1'}
                  >
                    {coin.symbol}
                  </Heading>
                  <Text lineHeight={'1'}>{coin.name}</Text>
                </Box>

                {/* <Box>
                          <CryptoBalance
                            walletId={wallet?._id || ''}
                            contractAddress={coin.platform?.token_address}
                          >
                            {({ balance }) => {
                              return (
                                <React.Fragment>
                                  <Heading
                                    mb={6}
                                    fontSize={13}
                                    lineHeight={'1'}
                                    textAlign={'right'}
                                  >
                                    {`${formatDecimal(balance || 0)}`}
                                  </Heading>
                                </React.Fragment>
                              );
                            }}
                          </CryptoBalance>
                          <Text
                            fontSize={13}
                            textAlign={'right'}
                          >{`${user?.fiat?.sign}${formatDecimal(price, {
                            minFraction: 2,
                            maxFraction: 3,
                          })}`}</Text>
                        </Box> */}
              </Button>
            );
          });
        }}
      </CryptoList>
    </Box>
  );
};

export default Coin;
