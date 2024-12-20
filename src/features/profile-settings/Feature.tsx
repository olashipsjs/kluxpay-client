import React from 'react';
import UpdateName from './components/UpdateName';
import UpdateDob from './components/UpdateDob';
import useUser from '@hooks/useUser';
import Flex from '@components/base/flex/Flex';
import Text from '@components/base/text/Text';
import Box from '@components/base/box/Box';
import Heading from '@components/base/heading/Heading';
import Overlay from '@components/overlay/Overlay';
import Divider from '@components/divider/Divider';
import Iconify from '@components/base/iconify/Iconify';

const ProfileSettingsFeature = () => {
  const { user } = useUser();

  const items = [
    {
      label: 'Update legal name',
      value: `${user?.firstName} ${user?.lastName}`,
      content: <UpdateName />,
    },
    {
      label: 'Date of Birth',
      value: `${user?.dateOfBirth}`,
      content: <UpdateDob />,
    },
  ];

  return (
    <React.Fragment>
      {items.map((item, index) => {
        return (
          <React.Fragment>
            <Flex justifyContent={'between'}>
              <Box>
                <Text
                  as={'p'}
                  fontSize={14}
                >
                  {item.label}
                </Text>
                <Heading
                  mt={8}
                  fontSize={17}
                  textTransform={'capitalize'}
                >
                  {item.value}
                </Heading>
              </Box>

              <Overlay>
                <Overlay.Trigger
                  py={8}
                  fontSize={13}
                  width={'fit'}
                  color={'gray-30'}
                  borderColor={'gray-90'}
                  backgroundColor={'transparent'}
                  _hover={{
                    backgroundColor: 'gray-100',
                  }}
                >
                  Change
                </Overlay.Trigger>
                <Overlay.Panel
                  justifyContent={{ initial: 'end', sm: 'center' }}
                >
                  <Overlay.Background />
                  <Overlay.Content
                    maxWidth={'400px'}
                    px={20}
                    py={16}
                  >
                    <Flex
                      alignItems={'center'}
                      justifyContent={'between'}
                    >
                      <Heading fontSize={21}>{item.label}</Heading>
                      <Overlay.Trigger
                        py={8}
                        width={'fit'}
                        color={'red-60'}
                        borderColor={'transparent'}
                        backgroundColor={'red-100'}
                        _hover={{
                          color: 'red-30',
                          backgroundColor: 'red-95',
                        }}
                      >
                        Close
                        <Iconify icon={''} />
                      </Overlay.Trigger>
                    </Flex>
                    <Divider my={12} />
                    {item.content}
                  </Overlay.Content>
                </Overlay.Panel>
              </Overlay>
            </Flex>
            {index < items.length - 1 && <Divider my={20} />}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default ProfileSettingsFeature;
