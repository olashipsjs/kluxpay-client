import useWallets from '@hooks/useWallets';
import Box from '@components/base/box/Box';
import Toast from '@components/toast/Toast';
import { QRCodeCanvas } from 'qrcode.react';
import Text from '@components/base/text/Text';
import Flex from '@components/base/flex/Flex';
import Image from '@components/base/image/Image';
import Button from '@components/base/button/Button';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Clipboard from '@components/clipboard/Clipboard';

const Data = () => {
  const { wallet, token } = useWallets();

  const ADDRESS = `${token?.platform?.token_address || wallet?.publicKey}`;

  const VALUE = `${token?.platform?.symbol || 'ETH'}:${ADDRESS}`;

  const downloadQRCode = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;

    const pngUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = `${wallet?.network.symbol}: ${VALUE}.png`;
    link.click();
  };

  return (
    <Box>
      <Flex
        py={12}
        px={16}
        gap={8}
        alignItems={'center'}
        backgroundColor={'orange-100'}
      >
        <Iconify
          width={16}
          color={'orange-40'}
          icon={'fluent:warning-24-filled'}
        />
        <Text
          fontSize={12}
          css={{ flex: 1 }}
          color={'orange-40'}
          fontWeight={'medium'}
        >
          Only send{' '}
          {`${token.name} (${token.symbol}) assets to this address. Other assets will be lost forever.`}
        </Text>
      </Flex>

      <Flex
        gap={6}
        my={24}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Image
          size={'20px'}
          src={token.logo}
        />
        <Heading
          fontSize={16}
          lineHeight={'1'}
        >
          {token.symbol}
        </Heading>
      </Flex>

      <Flex
        alignItems={'center'}
        flexDirection={'column'}
      >
        <Flex
          border={1}
          rounded={8}
          width={'240px'}
          overflow={'clip'}
          borderColor={'gray-90'}
          flexDirection={'column'}
          backgroundColor={'white'}
        >
          <QRCodeCanvas
            size={240}
            level={'H'}
            value={VALUE}
            bgColor={'#ffffff'}
            fgColor={'#000000'}
            style={{ margin: 'auto', padding: 12 }}
          />
        </Flex>
      </Flex>

      <Flex
        mt={32}
        gap={24}
        mx={'auto'}
        width={'60%'}
        justifyContent={'evenly'}
      >
        <Flex
          gap={8}
          flexDirection={'column'}
          justifyContent={'center'}
        >
          <Clipboard>
            {({ handleCopy, copied }) => {
              return (
                <Button
                  p={0}
                  size={'40px'}
                  rounded={'full'}
                  color={'gray-60'}
                  borderColor={'gray-90'}
                  backgroundColor={'gray-100'}
                  onClick={() => handleCopy(ADDRESS || '')}
                  _hover={{ color: 'gray-10', backgroundColor: 'gray-95' }}
                >
                  <Iconify
                    width={20}
                    icon={'material-symbols:content-copy-sharp'}
                  />
                  <Toast visible={copied}>
                    <Toast.Panel
                      backgroundColor={'white'}
                      boxShadow={'0px 1px 12px 1px rgba(var(--gray-90))'}
                    >
                      <Toast.TextContext color={'gray-10'}>
                        Address copied
                      </Toast.TextContext>
                    </Toast.Panel>
                  </Toast>
                </Button>
              );
            }}
          </Clipboard>
          <Heading
            fontSize={13}
            textAlign={'center'}
          >
            Copy
          </Heading>
        </Flex>

        <Flex
          gap={8}
          flexDirection={'column'}
          justifyContent={'center'}
        >
          <Button
            p={0}
            size={'40px'}
            rounded={'full'}
            color={'gray-60'}
            borderColor={'gray-90'}
            backgroundColor={'gray-100'}
            onClick={() => downloadQRCode()}
            _hover={{ color: 'gray-10', backgroundColor: 'gray-95' }}
          >
            <Iconify
              width={20}
              icon={'fluent:arrow-download-24-filled'}
            />
          </Button>
          <Heading
            fontSize={13}
            textAlign={'center'}
          >
            Save
          </Heading>
        </Flex>

        <Flex
          gap={8}
          flexDirection={'column'}
          justifyContent={'center'}
        >
          <Button
            p={0}
            size={'40px'}
            rounded={'full'}
            color={'gray-60'}
            borderColor={'gray-90'}
            backgroundColor={'gray-100'}
            _hover={{ color: 'gray-10', backgroundColor: 'gray-95' }}
          >
            <Iconify
              width={20}
              icon={'material-symbols:content-copy-sharp'}
            />
          </Button>
          <Heading
            fontSize={13}
            textAlign={'center'}
          >
            Copy
          </Heading>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Data;
