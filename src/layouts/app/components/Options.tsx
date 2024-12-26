import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import Divider from '@components/divider/Divider';
import Dropdown from '@components/dropdown/Dropdown';
import useAuth from '@hooks/useAuth';
import useUser from '@hooks/useUser';
import useWallet from '@hooks/useWallet';
import React from 'react';

const Options = () => {
  const { user } = useUser();
  const { setAuth } = useAuth();
  const { wallets, wallet, setWallets } = useWallet();

  return (
    <Dropdown minWidth={'240px'}>
      {({ setIsOpen }) => {
        return (
          <React.Fragment>
            <Dropdown.Trigger
              py={6}
              px={12}
              gap={12}
              rounded={2}
              color={'gray-10'}
              textAlign={'left'}
              justifyContent={'start'}
              borderColor={'transparent'}
              backgroundColor={'transparent'}
              _hover={{
                backgroundColor: 'gray-95',
              }}
            >
              <Avatar backgroundColor={'gray-90'}>
                <Avatar.Picture
                  src={
                    'https://finance-template.alignui.com/images/avatar/illustration/arthur.png'
                  }
                  alt={user?.firstName}
                />
              </Avatar>

              <Box css={{ flex: 1 }}>
                <Heading
                  fontSize={14}
                  lineHeight={'1'}
                  textTransform={'capitalize'}
                >{`${user?.firstName} ${user?.lastName}`}</Heading>
                <Text
                  mt={8}
                  as={'p'}
                  fontSize={13}
                  color={'gray-60'}
                >
                  {wallet?.name ||
                    `Wallet ${
                      wallets?.findIndex((w) => w._id === wallet?._id)! + 1
                    }`}
                </Text>
              </Box>

              <Iconify
                width={12}
                icon={'fluent:chevron-down-up-24-regular'}
              />
            </Dropdown.Trigger>

            <Dropdown.Content
              border={1}
              top={'64px'}
              rounded={12}
              left={'20px'}
              borderColor={'gray-90'}
              backgroundColor={'white'}
              p={4}
            >
              <Box>
                {wallets?.map((wallet, index) => {
                  return (
                    <Button
                      py={10}
                      key={wallet._id}
                      color={'gray-10'}
                      justifyContent={'between'}
                      borderColor={'transparent'}
                      backgroundColor={'transparent'}
                      _hover={{
                        backgroundColor: 'gray-95',
                      }}
                      onClick={() => {
                        setWallets({
                          type: 'SET_CURRENT_WALLET',
                          payload: { walletId: wallet._id },
                        });
                        setIsOpen(false);
                      }}
                    >
                      {wallet.name ? wallet.name : `Wallet ${index + 1}`}
                      <Text
                        fontSize={13}
                        color={'gray-60'}
                      >{`${wallet.publicKey.substring(
                        0,
                        2
                      )}****${wallet.publicKey.substring(
                        wallet.publicKey.length - 5
                      )}`}</Text>
                    </Button>
                  );
                })}
              </Box>

              <Divider my={8} />

              <Button
                py={8}
                backgroundColor={'red-60'}
                borderColor={'transparent'}
                _hover={{ backgroundColor: 'red-70' }}
                onClick={() => setAuth({ type: 'SET_LOGGED_OUT' })}
              >
                Logout
              </Button>
            </Dropdown.Content>
          </React.Fragment>
        );
      }}
    </Dropdown>
  );
};

export default Options;
