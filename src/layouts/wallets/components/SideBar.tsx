import Anchor from '@components/anchor/Anchor';
import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Loader from '@components/base/button/Loader';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Image from '@components/base/image/Image';
import Text from '@components/base/text/Text';
import Clipboard from '@components/clipboard/Clipboard';
import Divider from '@components/divider/Divider';
import Overlay from '@components/overlay/Overlay';
import CoinPrice from '@components/shared/CoinPrice';
import networks from '@constants/networks';
import CreateWalletFeature from '@features/shared/modals/create-wallet/Feature';
import useUser from '@hooks/useUser';
import useWallet from '@hooks/useWallet';
import currencySymbol from '@utils/currencySymbol';
import formatDecimal from '@utils/formatDecimal';

const List = () => {
  const { user } = useUser();
  const { wallets } = useWallet();

  switch (true) {
    case wallets === undefined:
      return (
        <Loader
          p={20}
          visible
          width={'20px'}
          color={'gray-10'}
        />
      );
    case wallets === null:
      return (
        <Box
          m={8}
          py={6}
          px={12}
          border={1}
          borderColor={'gray-90'}
          backgroundColor={'white'}
          boxShadow={'0px .75px 0px 0px rgba(var(--gray-80))'}
        >
          <Text
            color={'red-60'}
            fontSize={13}
          >
            Unable to fetch user wallets
          </Text>
        </Box>
      );

    default:
      return (
        <Box
          m={8}
          border={1}
          rounded={12}
          overflow={'hidden'}
          borderColor={'gray-90'}
          backgroundColor={'white'}
          boxShadow={'0px .75px 0px 0px rgba(var(--gray-80))'}
          notLastChild={{
            borderBottom: 1,
            borderBottomColor: 'gray-90',
          }}
        >
          {wallets && wallets.length > 0
            ? wallets.map((wallet, index) => {
                const network = networks.find(
                  (network) => network.name === wallet.network
                )!;

                const URL = `/app/wallets/${wallet._id}/?name=${
                  wallet.name ? wallet.name : `wallet ${index + 1}`
                }&network=${wallet.network}&address=${wallet.publicKey}`;

                return (
                  <Anchor
                    p={12}
                    gap={12}
                    to={URL}
                    rounded={0}
                    width={'full'}
                    key={wallet._id}
                    alignItems={'start'}
                    flexDirection={'column'}
                    borderColor={'transparent'}
                    _hover={{
                      color: 'inherit',
                      backgroundColor: 'gray-100',
                    }}
                  >
                    <Flex
                      gap={8}
                      width={'full'}
                      alignItems={'center'}
                    >
                      <Image
                        size={'20px'}
                        src={network.image}
                        alt={network.name}
                      />
                      <Heading
                        as={'h2'}
                        fontSize={14}
                        lineHeight={'1'}
                        textAlign={'left'}
                        textTransform={'capitalize'}
                        css={{ flex: 1 }}
                      >
                        {wallet.name ? wallet.name : `Wallet ${index + 1}`}
                      </Heading>

                      <Clipboard>
                        {({ handleCopy, copied }) => {
                          return (
                            <Flex
                              gap={4}
                              alignItems={'center'}
                            >
                              <Text
                                as={'p'}
                                fontSize={13}
                              >
                                {`${wallet.publicKey.substring(
                                  0,
                                  2
                                )} **** ${wallet.publicKey.substring(
                                  wallet.publicKey.length - 4
                                )}`}
                              </Text>
                              <Button
                                p={0}
                                width={'fit'}
                                size={'20px'}
                                rounded={'full'}
                                disabled={copied}
                                borderColor={'transparent'}
                                backgroundColor={'transparent'}
                                color={copied ? 'green-60' : 'gray-60'}
                                onClick={() => handleCopy(wallet.publicKey)}
                                _hover={{
                                  scale: 1.1,
                                  backgroundColor: 'transparent',
                                  color: copied ? 'green-60' : 'gray-10',
                                }}
                              >
                                <Iconify
                                  width={16}
                                  icon={
                                    copied
                                      ? 'fluent:checkmark-underline-circle-24-regular'
                                      : 'fluent:copy-24-regular'
                                  }
                                />
                              </Button>
                            </Flex>
                          );
                        }}
                      </Clipboard>
                    </Flex>

                    <CoinPrice
                      coinId={wallet.network}
                      fiat={user?.currency || 'usd'}
                    >
                      {({ price }) => {
                        return (
                          <Flex
                            width={'full'}
                            alignItems={'center'}
                            justifyContent={'between'}
                          >
                            <Heading
                              as={'h4'}
                              fontSize={13}
                              lineHeight={'1'}
                              textAlign={'right'}
                            >
                              {`${currencySymbol(
                                user?.currency
                              )}${formatDecimal(price * wallet.balance)}`}
                            </Heading>
                            <Text
                              as={'p'}
                              fontSize={13}
                              lineHeight={'1'}
                              textAlign={'right'}
                            >
                              {`${formatDecimal(
                                wallet.balance
                              )} ${network.symbol.toUpperCase()}`}
                            </Text>
                          </Flex>
                        );
                      }}
                    </CoinPrice>
                  </Anchor>
                );
              })
            : null}
        </Box>
      );
  }
};

const SideBar = () => {
  return (
    <Box
      width={'400px'}
      borderRight={1}
      minHeight={'full'}
      position={'fixed'}
      borderRightColor={'gray-80'}
      display={{ initial: 'hidden', md: 'block' }}
    >
      <Flex
        py={12}
        px={20}
        alignItems={'center'}
        justifyContent={'between'}
      >
        <Heading fontSize={21}>Wallets</Heading>
        <Overlay>
          <Overlay.Trigger
            py={6}
            px={12}
            color={'gray-60'}
            backgroundColor={'white'}
            borderColor={'transparent'}
            _hover={{
              color: 'gray-10',
              borderColor: 'gray-90',
              boxShadow: '0px .25px 0px 0px rgba(var(--gray-80))',
            }}
          >
            <Iconify
              width={16}
              icon={'fluent:add-24-regular'}
            />{' '}
            Create
          </Overlay.Trigger>
          <CreateWalletFeature />
        </Overlay>
      </Flex>
      <Divider backgroundColor={'gray-90'} />
      <List />
    </Box>
  );
};

export default SideBar;
