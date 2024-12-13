import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import React from 'react';

const Footer = () => {
  return (
    <React.Fragment>
      <Flex
        mt={20}
        alignItems={'center'}
        justifyContent={'between'}
      >
        <Flex gap={4}>
          {Array.from('abacdefgh').map((char) => {
            return (
              <Button
                p={0}
                key={char}
                size={'28px'}
                rounded={'full'}
                color={'gray-60'}
                borderColor={'gray-90'}
                backgroundColor={'transparent'}
                _hover={{
                  backgroundColor: 'gray-90',
                }}
              >
                {char}
              </Button>
            );
          })}
        </Flex>

        <Heading
          fontSize={13}
          letterSpacing={'xs'}
        >
          Showing 16 results of 105
        </Heading>
      </Flex>
    </React.Fragment>
  );
};

export default Footer;
