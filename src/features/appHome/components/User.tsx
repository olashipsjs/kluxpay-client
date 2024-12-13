import React from 'react';
import Box from '@components/base/box/Box';
import Heading from '@components/base/heading/Heading';
import Text from '@components/base/text/Text';
import { useStore } from '@nanostores/react';
import { userStore } from 'src/stores/userStore';
import useBalance from 'src/hooks/useGetAssetBalance';

const User = () => {
  const { balance, loading, error } = useBalance({ platform: 'ethereum' });
  const { user } = useStore(userStore);

  const formattedBalance = balance
    ? new Intl.NumberFormat('en-US', {
        style: 'decimal',
        maximumFractionDigits: 2,
      }).format(balance)
    : '0.00';

  return (
    <Box mt={16}>
      <Heading
        textAlign={'center'}
        letterSpacing={'sm'}
        textTransform={'capitalize'}
      >
        {`${user?.firstName} ${user?.lastName}`}
      </Heading>

      <Text
        mt={12}
        as={'p'}
        fontSize={24}
        lineHeight={'1em'}
        letterSpacing={'sm'}
        fontWeight={'medium'}
        textAlign={'center'}
        color={'gray-10'}
      >
        ${formattedBalance}
      </Text>
      <Text
        mt={4}
        as={'p'}
        fontSize={13}
        color={'gray-50'}
        textAlign={'center'}
        fontWeight={'medium'}
      >
        No asset found
      </Text>
    </Box>
  );
};

export default User;
