import Flex from '@components/base/flex/Flex';
import Anchor from '@components/anchor/Anchor';
import Button from '@components/base/button/Button';
import Iconify from '@components/base/iconify/Iconify';

const menu = [
  {
    url: '/app/',
    label: 'Home',
    icon: 'fluent:building-retail-more-24-regular',
  },
  {
    label: 'Wallets',
    url: '/app/wallets/',
    icon: 'fluent:layer-diagonal-24-regular',
  },
  {
    label: 'Trade',
    url: '/app/trades/',
    icon: 'fluent:arrow-repeat-1-24-regular',
  },
  {
    label: 'Offers',
    url: '/app/my-offers/',
    icon: 'fluent:layer-diagonal-person-24-regular',
  },
  {
    label: 'More',
    url: '/app/settings/',
    icon: 'fluent:options-24-regular',
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
      borderTopColor={'gray-90'}
      style={{ bottom: '0px' }}
      justifyContent={'center'}
      backgroundColor={'rgba(var(--white), 0.7)'}
      display={{ initial: 'flex', md: 'hidden' }}
    >
      {menu.map((item) => {
        return (
          <Anchor
            end
            key={item.label}
            to={item.url}
            display={'contents'}
          >
            {({ isActive }) => {
              return (
                <Button
                  pt={8}
                  pb={12}
                  px={12}
                  gap={8}
                  rounded={0}
                  width={'16.5%'}
                  height={'auto'}
                  border={'none'}
                  fontSize={'1rem'}
                  fontWeight={'medium'}
                  flexDirection={'column'}
                  backgroundColor={'transparent'}
                  color={isActive ? 'indigo-60' : 'gray-60'}
                  _hover={{ color: isActive ? '' : 'gray-10' }}
                >
                  <Iconify
                    width={'24px'}
                    icon={item.icon}
                  />
                  {item.label}
                </Button>
              );
            }}
          </Anchor>
        );
      })}
    </Flex>
  );
};

export default BottomBar;
