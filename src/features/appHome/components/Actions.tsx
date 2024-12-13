import Badge from '@components/badge/Badge';
import Button from '@components/base/button/Button';
import Grid from '@components/base/grid/Grid';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';

const actions = [
  {
    name: 'Offers',
    label: 'Manage your offers',
    url: '/',
    icon: 'material-symbols:newsstand',
  },
  {
    name: 'Refer',
    label: 'Manage referrals',
    url: '/',
    icon: 'heroicons:users-16-solid',
  },
  {
    name: 'buy',
    label: 'P2P marketplace',
    url: '/',
    icon: 'line-md:arrow-small-down',
  },
  {
    name: 'sell',
    url: '/',
    label: 'P2P marketplace',
    icon: 'line-md:arrow-small-up',
  },
];

const Actions = () => {
  return (
    <Grid
      mt={32}
      gap={32}
      width={'full'}
      gridTemplateColumns={{ initial: '1fr 1fr', sm: '1fr 1fr 1fr 1fr' }}
    >
      {actions.map((action) => {
        return (
          <Button
            fontSize={13}
            height={'auto'}
            rounded={'12px'}
            color={'gray-50'}
            key={action.name}
            fontWeight={'regular'}
            flexDirection={'column'}
            borderColor={'transparent'}
            backgroundColor={'transparent'}
            _hover={{
              color: 'gray-10',
            }}
          >
            <Badge
              width={'48px'}
              height={'24px'}
              rounded={'full'}
              justifyContent={'center'}
              backgroundColor={'gray-95'}
            >
              <Badge.Icon
                width={'1.35em'}
                color={'inherit'}
                icon={action.icon}
              />
            </Badge>
            <Heading
              mt={8}
              as={'p'}
              fontSize={13}
              letterSpacing={'xs'}
              textAlign={'center'}
              fontWeight={'medium'}
              textTransform={'capitalize'}
            >
              {action.name}
            </Heading>
            <Text
              fontSize={12}
              lineHeight={'md'}
              color={'gray-60'}
            >
              {action.label}
            </Text>
          </Button>
        );
      })}
    </Grid>
  );
};

export default Actions;
