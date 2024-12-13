import Flex from '@components/base/flex/Flex';
import Anchor from '@components/anchor/Anchor';
import Button from '@components/base/button/Button';
import Iconify from '@components/base/iconify/Iconify';

const menu = [
  { label: 'Home', icon: 'material-symbols-light:home', url: '/app/' },
  {
    label: 'Assets',
    url: '/app/assets/',
    icon: 'material-symbols-light:bar-chart-rounded',
  },
  {
    label: 'Trade',
    url: '/app/offers/',
    icon: 'material-symbols-light:candlestick-chart-rounded',
  },
  {
    label: 'Offers',
    url: '/app/my-offers/',
    icon: 'material-symbols-light:modeling-sharp',
  },
  {
    label: 'More',
    url: '/app/more/',
    icon: 'material-symbols-light:featured-play-list',
  },
];

const BottomBar = () => {
  return (
    <Flex
      zIndex={'9'}
      width={'full'}
      borderTop={1}
      position={'fixed'}
      backdropBlur={'md'}
      borderColor={'gray-95'}
      style={{ bottom: '0px' }}
      justifyContent={'center'}
      backgroundColor={'rgba(var(--white), 0.9)'}
      display={{ initial: 'flex', md: 'hidden' }}
    >
      {menu.map((item) => {
        return (
          <Anchor
            key={item.label}
            to={item.url}
            display={'contents'}
          >
            <Button
              py={6}
              px={12}
              gap={4}
              width={'23%'}
              height={'auto'}
              color={'gray-50'}
              fontSize={'1.15rem'}
              fontWeight={'medium'}
              flexDirection={'column'}
              borderColor={'transparent'}
              backgroundColor={'transparent'}
              _hover={{
                color: 'gray-10',
              }}
            >
              <Iconify
                width={'2.2em'}
                icon={item.icon}
              />
              {item.label}
            </Button>
          </Anchor>
        );
      })}
    </Flex>
  );
};

export default BottomBar;
