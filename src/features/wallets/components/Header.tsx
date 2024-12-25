import Anchor from '@components/anchor/Anchor';
import Box from '@components/base/box/Box';
import Container from '@components/base/container/Container';
import Heading from '@components/base/heading/Heading';
import Divider from '@components/divider/Divider';
import Tabs from '@components/tabs/Tabs';
import useWallet from '@hooks/useWallet';
import { useParams } from 'react-router-dom';

const WalletsTabs = () => {
  const { wallets, wallet } = useWallet();
  const { id } = useParams<{ id: string }>();

  return (
    <Tabs defaultValue={wallet?._id || ''}>
      <Tabs.List
        px={0}
        py={0}
        gap={0}
        width={'full'}
        borderBottom={1}
        borderBottomColor={'gray-80'}
      >
        {wallets?.map((wallet, index) => {
          const isActive = wallet._id === id;

          return (
            <Tabs.Trigger
              py={0}
              px={12}
              gap={10}
              width={'fit'}
              fontSize={14}
              key={wallet._id}
              rounded={'none'}
              value={wallet._id}
              flexDirection={'column'}
              borderColor={'transparent'}
              backgroundColor={'transparent'}
              color={isActive ? 'indigo-60' : 'gray-60'}
              _hover={{ color: isActive ? '' : 'gray-10' }}
            >
              <Anchor
                color={'inherit'}
                fontSize={'inherit'}
                to={`/app/wallets/${wallet._id}/?name=${
                  wallet.name ? wallet.name : `wallet ${index + 1}`
                }&network=${wallet.network}&address=${wallet.publicKey}`}
                _hover={{}}
              >
                {`${wallet.name ? wallet.name : 'Wallet'} ${index + 1}`}
              </Anchor>
              <Box
                height={'2px'}
                width={'full'}
                rounded={'full'}
                backgroundColor={isActive ? 'indigo-60' : 'transparent'}
              />
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>
    </Tabs>
  );
};

const Header = () => {
  return (
    <Container
      px={0}
      mt={24}
      maxWidth={'480px'}
    >
      <Box display={{ initial: 'block', md: 'hidden' }}>
        <Heading px={12}>Wallets</Heading>
        <Divider
          my={16}
          backgroundColor={'transparent'}
        />
        <WalletsTabs />
      </Box>
    </Container>
  );
};

export default Header;
