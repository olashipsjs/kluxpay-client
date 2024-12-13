import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import React from 'react';

const actions = [{ label: 'help', icon: 'solar:menu-dots-bold', overlay: '' }];

const ChatHeader = ({ trade }: { trade: any }) => {
  const { offer, rate, amount } = trade;

  return (
    <Flex
      gap={6}
      alignItems={'center'}
    >
      <Avatar
        hasError
        size={'24px'}
        backgroundColor={'gray-95'}
      >
        <Avatar.Fallback
          fontSize={13}
          color={'gray-40'}
          textTransform={'uppercase'}
        >
          {`${offer.createdBy.firstName[0]}`}
        </Avatar.Fallback>
      </Avatar>

      <Heading
        fontSize={17}
        letterSpacing={'xs'}
        textTransform={'capitalize'}
        css={{ flex: 1 }}
      >
        {`${offer.createdBy.firstName} ${offer.createdBy.lastName}`} —{' '}
        <Text
          color={'gray-60'}
          fontWeight={'regular'}
        >{`${offer.type} ${trade.amount} ${offer.coinId}`}</Text>
      </Heading>

      {actions.map((action, index) => {
        return (
          <Button
            p={'0px'}
            key={index}
            size={'28px'}
            rounded={'full'}
            color={'gray-60'}
            borderColor={'transparent'}
            backgroundColor={'transparent'}
            _hover={{
              color: 'gray-10',
              backgroundColor: 'gray-95',
            }}
          >
            <Iconify
              width={'1.25em'}
              icon={action.icon}
            />
          </Button>
        );
      })}
    </Flex>
  );
};

export default ChatHeader;
