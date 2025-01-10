import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import { useSearchParams } from 'react-router-dom';
import Fiats from './Fiats';

const types = [
  { path: '', value: 'sell', label: 'Purchase' },
  { path: '', value: 'buy', label: 'Sell' },
];

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('type') || types[0].value;

  const handleTabClick = (tabPath: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('type', tabPath);
    setSearchParams(newSearchParams);
  };

  return (
    <Box>
      <Heading fontWeight={'semibold'}>Market</Heading>

      <Flex
        mt={32}
        gap={12}
        alignItems={'start'}
      >
        {types.map((tab, index) => {
          const isActive = activeTab === tab.value;

          return (
            <Button
              py={12}
              px={20}
              key={index}
              fontSize={16}
              width={'fit'}
              borderColor={'transparent'}
              color={isActive ? 'gray-10' : 'gray-60'}
              onClick={() => handleTabClick(tab.value)}
              backgroundColor={isActive ? 'gray-95' : 'transparent'}
              _hover={{ backgroundColor: isActive ? '' : 'gray-95' }}
            >
              {tab.label}
            </Button>
          );
        })}

        <Fiats />
      </Flex>
    </Box>
  );
};

export default Header;
