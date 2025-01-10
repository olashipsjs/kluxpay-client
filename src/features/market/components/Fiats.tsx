import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import Overlay from '@components/overlay/Overlay';
import Query from '@components/query/Query';
import { GET_ALL_FIATS } from '@graphql/fiat';
import { useSearchParams } from 'react-router-dom';

const Fiats = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('fiat') || 'NGN';

  const handleTabClick = (tabPath: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('fiat', tabPath);
    setSearchParams(newSearchParams);
  };

  return (
    <Overlay
      css={{ flex: 1 }}
      justifyContent={'end'}
    >
      <Overlay.Trigger
        py={12}
        px={20}
        fontSize={16}
        width={'fit'}
        color={'gray-40'}
        borderColor={'gray-90'}
        backgroundColor={'transparent'}
        _hover={{ backgroundColor: 'gray-100' }}
      >
        {activeTab}
        <Iconify
          width={20}
          icon={'fluent:chevron-down-24-regular'}
        />
      </Overlay.Trigger>
      <Overlay.Panel
        justifyContent={'end'}
        flexDirection={'column'}
      >
        <Overlay.Background />
        <Overlay.Content
          height={'88vh'}
          maxWidth={'400px'}
          overflowY={'scroll'}
        >
          <Flex
            py={10}
            px={12}
            top={'0px'}
            borderBottom={1}
            position={'sticky'}
            alignItems={'center'}
            backgroundColor={'white'}
            justifyContent={'between'}
            borderBottomColor={'gray-90'}
          >
            <Heading
              fontSize={21}
              fontWeight={'semibold'}
            >
              Fiats
            </Heading>

            <Overlay.Trigger
              p={'0'}
              size={'24px'}
              rounded={'full'}
              color={'gray-60'}
              borderColor={'transparent'}
              backgroundColor={'gray-95'}
              _hover={{
                backgroundColor: 'gray-90',
              }}
            >
              <Iconify
                width={16}
                icon={'fluent:dismiss-24-filled'}
              />
            </Overlay.Trigger>
          </Flex>

          <Query query={GET_ALL_FIATS}>
            <Query.Loader />
            <Query.Error>
              <Text
                fontSize={14}
                color={'red-60'}
              >
                Server error. We were unable to fetch fiats
              </Text>
            </Query.Error>
            <Query.Data>
              {({ data }) => {
                const fiats = data?.getAllFiats;

                return fiats?.map((fiat: any) => {
                  return (
                    <Overlay.Trigger
                      py={8}
                      key={fiat.id}
                      rounded={'none'}
                      color={'gray-60'}
                      textAlign={'left'}
                      fontWeight={'regular'}
                      justifyContent={'start'}
                      borderColor={'transparent'}
                      backgroundColor={'transparent'}
                      _hover={{ backgroundColor: 'gray-95' }}
                      onClick={() => handleTabClick(fiat.symbol)}
                    >
                      <Box css={{ flex: 1 }}>
                        <Heading
                          mb={4}
                          fontSize={14}
                          lineHeight={'1'}
                        >
                          {fiat.name}
                        </Heading>
                        <Text
                          lineHeight={'1'}
                          fontSize={12}
                        >
                          {fiat.symbol}
                        </Text>
                      </Box>

                      <Text>{fiat.sign}</Text>
                    </Overlay.Trigger>
                  );
                });
              }}
            </Query.Data>
          </Query>
        </Overlay.Content>
      </Overlay.Panel>
    </Overlay>
  );
};

export default Fiats;
