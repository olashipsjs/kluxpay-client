import Anchor from '@components/anchor/Anchor';
import Avatar from '@components/avatar/Avatar';
import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Text from '@components/base/text/Text';
import AssetBalance from '@components/shared/AssetBalance';
import CoinPrice from '@components/shared/CoinPrice';
import useUser from '@hooks/useUser';
import currencySymbol from '@utils/currencySymbol';
import formatDecimal from '@utils/formatDecimal';
import React from 'react';
import { useParams } from 'react-router-dom';

type Props = {
  image: any;
  symbol: string;
  contractAddress: string;
};

const Portfolio = ({ image, symbol, contractAddress }: Props) => {
  const { user } = useUser();
  const { id } = useParams<{ id: string }>();
  const { token } = useParams<{ token: string }>();

  return (
    <Box
      p={12}
      border={1}
      rounded={12}
      borderColor={'gray-90'}
      backgroundColor={'white'}
      boxShadow={'0px .75px 0px 0px rgba(var(--gray-80))'}
    >
      <Flex
        gap={12}
        alignItems={'center'}
      >
        <Avatar
          p={2}
          size={'24px'}
          backgroundColor={'gray-95'}
        >
          <Avatar.Picture src={image.small} />
          <Avatar.Fallback
            fontSize={12}
            color={'white'}
            textTransform={'capitalize'}
          >
            {token?.substring(0, 2)}
          </Avatar.Fallback>
        </Avatar>
        <Heading
          fontSize={19}
          lineHeight={'1'}
          css={{ flex: 1 }}
          textTransform={'capitalize'}
        >{`${token}`}</Heading>

        <Anchor to={'/app/settings/general/'}>
          <Button
            py={4}
            fontSize={13}
            color={'indigo-60'}
            borderColor={'transparent'}
            backgroundColor={'indigo-100'}
            _hover={{
              backgroundColor: 'indigo-95',
            }}
          >
            {`${user?.currency?.toUpperCase()}`}
            <Iconify
              width={20}
              icon={'fluent:text-paragraph-settings-24-regular'}
            />
          </Button>
        </Anchor>
      </Flex>

      <Flex
        mt={40}
        alignItems={'baseline'}
        justifyContent={'between'}
      >
        <AssetBalance
          walletId={id || ''}
          contractAddress={contractAddress}
        >
          {({ balance }) => {
            return (
              <CoinPrice
                coinId={token || ''}
                fiat={user?.currency}
              >
                {({ price }) => {
                  const CURRENCY_SYMBOL = currencySymbol(user?.currency);

                  return (
                    <React.Fragment>
                      <Heading
                        fontSize={24}
                        lineHeight={'1'}
                        textTransform={'capitalize'}
                      >
                        {`${CURRENCY_SYMBOL}${formatDecimal(price * balance)}`}
                      </Heading>

                      <Text
                        fontSize={13}
                        lineHeight={'1'}
                      >
                        {`${formatDecimal(balance)} ${symbol.toUpperCase()}`}
                      </Text>
                    </React.Fragment>
                  );
                }}
              </CoinPrice>
            );
          }}
        </AssetBalance>
      </Flex>
    </Box>
  );
};

export default Portfolio;
