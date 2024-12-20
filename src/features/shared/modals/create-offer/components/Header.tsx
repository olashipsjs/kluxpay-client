import Box from '@components/base/box/Box';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import useStep from '@hooks/useStep';

const Header = () => {
  const { step } = useStep();
  const percentage = ((step + 1) / 4) * 100;

  return (
    <Flex
      py={12}
      px={12}
      gap={8}
      alignItems={'center'}
    >
      <Iconify
        width={'24px'}
        icon={'ph:hand-deposit-fill'}
      />
      <Heading
        as={'h2'}
        fontSize={16}
        lineHeight={'md'}
        fontWeight={'regular'}
        css={{ flex: 1 }}
      >
        Post offer
      </Heading>

      <Flex
        width={'40px'}
        height={'4px'}
        rounded={'full'}
        overflow={'clip'}
        alignItems={'center'}
        position={'relative'}
        backgroundColor={'gray-90'}
      >
        <Box
          height={'4px'}
          width={`${percentage}%`}
          backgroundColor={'gray-10'}
          css={{
            transition: 'width 0.3s ease',
          }}
        />
      </Flex>
    </Flex>
  );
};

export default Header;
