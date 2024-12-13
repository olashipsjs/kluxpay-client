import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Grid from '@components/base/grid/Grid';
import Iconify from '@components/base/iconify/Iconify';
import Link from '@components/anchor/Link';
import Text from '@components/base/text/Text';

const Actions = ({ id }: { id: string }) => {
  const actions = [
    {
      label: `Buy`,
      action: '',
      uri: '',
      caption: `${id}`,
      icon: 'tdesign:arrow-left',
    },
    {
      label: `Sell`,
      action: '',
      uri: '',
      caption: `${id}`,
      icon: 'tdesign:arrow-right',
    },
    {
      label: 'marketplace',
      action: '',
      uri: '',
      caption: 'All offers',
      icon: 'ph:storefront-fill',
    },
    {
      label: 'wallet',
      action: '',
      uri: '',
      caption: 'Balance',
      icon: 'ph:cards-three-fill',
    },
  ];

  return (
    <Grid
      mt={32}
      gap={8}
      width={'100%'}
      gridTemplateColumns={'1fr 1fr 1fr 1fr'}
    >
      {actions.map((action, index) => {
        return (
          <Link
            key={index}
            width={'full'}
          >
            <Button
              py={12}
              px={'0px'}
              fontSize={13}
              height={'auto'}
              color={'gray-10'}
              fontWeight={'medium'}
              justifyContent={'start'}
              flexDirection={'column'}
              textTransform={'capitalize'}
              borderColor={'transparent'}
              backgroundColor={'transparent'}
              _hover={{
                backgroundColor: 'gray-100',
              }}
            >
              <Flex
                py={'3px'}
                px={'10px'}
                rounded={'full'}
                alignItems={'center'}
                justifyContent={'center'}
                backgroundColor={'gray-95'}
              >
                <Iconify
                  width={'1.2em'}
                  color={'gray-10'}
                  icon={action.icon}
                />
              </Flex>
              <Text
                mt={12}
                as={'p'}
                lineHeight={'md'}
                color={'gray-10'}
                textAlign={'center'}
              >
                {action.label}
              </Text>
              <Text
                mt={2}
                fontSize={'1.1rem'}
                textAlign={'center'}
              >
                {action.caption}
              </Text>
            </Button>
          </Link>
        );
      })}
    </Grid>
  );
};

export default Actions;
