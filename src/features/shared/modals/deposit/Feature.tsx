import Overlay from '@components/overlay/Overlay';
import { useParams, useSearchParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import networks from '@constants/networks';
import Text from '@components/base/text/Text';
import Flex from '@components/base/flex/Flex';
import Button from '@components/base/button/Button';
import Clipboard from '@components/clipboard/Clipboard';
import Heading from '@components/base/heading/Heading';
import Box from '@components/base/box/Box';
import Alert from '@components/alert/Alert';

const DepositFeature = () => {
  const { token } = useParams<{ token: string }>();
  const [searchParams] = useSearchParams();
  const WALLET_NETWORK = searchParams.get('network') || '';
  const ADDRESS = searchParams.get('address') || '';
  const network = networks.find((network) => network.name === WALLET_NETWORK)!;

  const NAME = token ? token : network.name;

  const downloadQRCode = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;

    const pngUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = `${network.symbol}: ${ADDRESS}.png`;
    link.click();
  };

  const VALUE = `${network.symbol.toUpperCase()}:${ADDRESS}`;

  return (
    <Overlay.Panel justifyContent={'end'}>
      <Overlay.Background />

      <Overlay.Content
        mb={12}
        rounded={0}
        maxWidth={'fit'}
        backgroundColor={'transparent'}
      >
        <Overlay.Trigger
          py={6}
          color={'gray-60'}
          borderColor={'gray-90'}
          backgroundColor={'white'}
          _hover={{
            color: 'gray-10',
            backgroundColor: 'gray-100',
          }}
        >
          Cancel
        </Overlay.Trigger>
      </Overlay.Content>

      <Overlay.Content
        px={12}
        pt={24}
        pb={12}
        maxWidth={'400px'}
      >
        <Box
          p={12}
          border={1}
          mx={'auto'}
          rounded={12}
          size={'224px'}
          borderColor={'gray-90'}
          boxShadow={'0px .75px 0px 0px rgba(var(--gray-90))'}
        >
          {VALUE ? (
            <QRCodeCanvas
              size={200}
              level={'H'}
              value={VALUE}
              bgColor={'#ffffff'}
              fgColor={'#000000'}
              style={{ margin: 'auto' }}
            />
          ) : null}
        </Box>
        <Alert
          mt={16}
          visible
          timeout={0}
          justifyContent={'center'}
          backgroundColor={'orange-100'}
        >
          <Alert.Message
            as={'p'}
            fontSize={13}
            color={'orange-60'}
            textAlign={'center'}
          >
            Only send{' '}
            <Text
              color={'orange-30'}
              fontWeight={'semibold'}
              textTransform={'capitalize'}
            >
              {NAME}
            </Text>{' '}
            assets to this address
          </Alert.Message>
        </Alert>

        <Box mt={48}>
          <Heading
            mb={6}
            fontSize={16}
            textTransform={'capitalize'}
          >
            {NAME}
          </Heading>

          <Text
            fontSize={13}
            color={'gray-50'}
          >
            {ADDRESS}
          </Text>
        </Box>

        <Flex
          mt={24}
          gap={8}
        >
          <Clipboard>
            {({ handleCopy, copied }) => {
              return (
                <Button
                  color={'gray-60'}
                  borderColor={'gray-90'}
                  backgroundColor={'transparent'}
                  boxShadow={'0px .5px 0px 0px rgba(var(--gray-80))'}
                  onClick={() => handleCopy(ADDRESS)}
                  _hover={{
                    color: 'gray-10',
                    backgroundColor: 'gray-100',
                  }}
                >
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              );
            }}
          </Clipboard>

          <Button onClick={downloadQRCode}>Download</Button>
        </Flex>
      </Overlay.Content>
    </Overlay.Panel>
  );
};

export default DepositFeature;
