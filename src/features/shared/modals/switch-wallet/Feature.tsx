import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import Overlay from '@components/overlay/Overlay';
import CryptoBalance from '@components/shared/crypto/CryptoBalance';
import CryptoPrice from '@components/shared/crypto/CryptoPrice';
import useUser from '@hooks/useUser';
import useWallets from '@hooks/useWallets';
import formatDecimal from '@utils/formatDecimal';

const SwitchWalletFeature = () => {
  const { user } = useUser();
  const { wallets, wallet: currentWallet, setWallets } = useWallets();

  return (
    <Overlay.Panel justifyContent={'end'}>
      <Overlay.Background />
      <Overlay.Content
        px={20}
        py={12}
        gap={20}
        maxWidth={'400px'}
      >
        <Flex width={'full'}>
          <Heading fontSize={21}>Switch wallet</Heading>
        </Flex>

        <Box
          rounded={12}
          width={'full'}
          border={1}
          overflow={'hidden'}
          borderColor={'gray-80'}
          backgroundColor={'white'}
          notLastChild={{
            borderBottom: 1,
            borderBottomColor: 'gray-90',
          }}
        >
          {wallets && wallets.length > 0
            ? wallets.map((wallet) => {
                const isActive = wallet._id === currentWallet?._id;

                return (
                  <Button
                    py={8}
                    px={8}
                    gap={10}
                    rounded={0}
                    key={wallet._id}
                    color={'gray-10'}
                    textAlign={'left'}
                    justifyContent={'start'}
                    borderColor={'transparent'}
                    backgroundColor={'transparent'}
                    _hover={{ backgroundColor: 'gray-100' }}
                    onClick={() =>
                      setWallets({
                        type: 'SET_CURRENT_WALLET',
                        payload: { wallet },
                      })
                    }
                  >
                    <Avatar size={'16px'}>
                      <Avatar.Picture src={wallet.network.image} />
                    </Avatar>

                    <Box css={{ flex: 1 }}>
                      <Heading
                        fontSize={14}
                        lineHeight={'1'}
                        css={{ flex: 1 }}
                      >
                        {wallet.name}
                      </Heading>
                      <CryptoBalance walletId={wallet._id}>
                        {({ balance }) => {
                          return (
                            <CryptoPrice coinId={1027}>
                              {({ data }) => {
                                const price =
                                  data.quote[user?.fiat?.symbol || 'USD'].price;

                                return (
                                  <Text
                                    mt={6}
                                    as={'p'}
                                    fontSize={13}
                                    lineHeight={'1'}
                                  >
                                    {user?.fiat.sign}
                                    {`${formatDecimal(price * balance)}`}
                                  </Text>
                                );
                              }}
                            </CryptoPrice>
                          );
                        }}
                      </CryptoBalance>
                    </Box>

                    {isActive ? (
                      <Iconify
                        width={20}
                        color={'indigo-60'}
                        icon={'fluent:checkmark-24-filled'}
                      />
                    ) : null}
                  </Button>
                );
              })
            : null}
        </Box>

        <Overlay.Trigger
          py={8}
          width={'fit'}
          color={'orange-60'}
          borderColor={'transparent'}
          backgroundColor={'transparent'}
          _hover={{ color: 'orange-30', backgroundColor: 'orange-100' }}
        >
          Cancel
        </Overlay.Trigger>
      </Overlay.Content>
    </Overlay.Panel>
  );
};

export default SwitchWalletFeature;
