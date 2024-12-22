import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Overlay from '@components/overlay/Overlay';
import Text from '@components/base/text/Text';
import React from 'react';

const Success = () => {
  return (
    <React.Fragment>
      <Flex
        px={20}
        flexDirection={'column'}
      >
        <Iconify
          width={'4em'}
          color={'green-60'}
          icon={'fluent:arrow-sync-checkmark-24-filled'}
        />

        <Heading
          mt={16}
          as={'h3'}
          fontSize={21}
          lineHeight={'md'}
        >
          Great job! Your offer has been updated
        </Heading>

        <Text
          mt={8}
          as={'p'}
          fontSize={14}
          lineHeight={'lg'}
        ></Text>

        <Heading
          mt={20}
          fontSize={14}
        >
          Guidelines
        </Heading>
        <Box
          px={32}
          py={12}
          mt={8}
          as={'ul'}
          rounded={6}
          width={'full'}
          backgroundColor={'orange-100'}
          notLastChild={{
            mb: 8,
          }}
        >
          <Text
            as={'li'}
            fontSize={13}
            lineHeight={'lg'}
            color={'orange-30'}
            listStyleType={'number'}
          >
            If your balance is lower than the specified offer amount, your offer
            will not be listed or made visible to other traders.
          </Text>
          <Text
            as={'li'}
            fontSize={13}
            lineHeight={'lg'}
            color={'orange-30'}
            listStyleType={'number'}
          >
            Any pending or unlisted offers will remain inactive until your
            balance meets the required amount for the offer.
          </Text>
          <Text
            as={'li'}
            fontSize={13}
            lineHeight={'lg'}
            color={'orange-30'}
            listStyleType={'number'}
          >
            Always monitor your balance and update your offer settings to
            reflect your available funds to ensure uninterrupted trading.
          </Text>
        </Box>

        <Overlay.Trigger mt={24}>Okay I understand</Overlay.Trigger>
      </Flex>
    </React.Fragment>
  );
};

export default Success;
