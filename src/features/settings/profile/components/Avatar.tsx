import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Grid from '@components/base/grid/Grid';
import Heading from '@components/base/heading/Heading';
import Image from '@components/base/image/Image';
import FormField from '@components/formfield/FormField';
import useAsync from '@hooks/useAsync';
import { Form, Formik } from 'formik';
import React from 'react';
import useChangeAvatar from '../hooks/useChangeAvatar';
import useUser from '@hooks/useUser';
import Toast from '@components/toast/Toast';
import Iconify from '@components/base/iconify/Iconify';

const Avatar = () => {
  const { user, setUser } = useUser();
  const { changeAvatar } = useChangeAvatar();

  const [async, { loading, error, data }] = useAsync(changeAvatar, {
    onCompleted: (data: any) => {
      if (data) {
        setUser({ type: 'UPDATE_USER', payload: { user: data.user } });
      }
    },
  });
  const fileRef = React.useRef<HTMLInputElement>(null!);

  const openStorage = () => {
    fileRef.current.click();
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    const { file } = values;
    await async({ file });

    resetForm();
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ file: '' }}
    >
      {({ setFieldValue, values }) => {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setFieldValue('file', file);
          }

          event.target.value = '';
        };

        return (
          <Form>
            <Grid
              gap={12}
              alignItems={'center'}
              gridTemplateColumns={{ sm: '1fr 1fr 1fr' }}
            >
              <Heading
                fontSize={14}
                fontWeight={'semibold'}
              >
                Avatar
              </Heading>

              <FormField
                name={'file'}
                display={'hidden'}
              >
                <input
                  type={'file'}
                  ref={fileRef}
                  onChange={handleChange}
                />
              </FormField>

              <Button
                p={0}
                _hover={{}}
                size={'fit'}
                rounded={'full'}
                position={'relative'}
                onClick={openStorage}
                borderColor={'transparent'}
                backgroundColor={'transparent'}
              >
                <Flex
                  opacity={'0'}
                  width={'full'}
                  height={'full'}
                  rounded={'full'}
                  position={'absolute'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  transition={'all 0.2s ease-in-out'}
                  backgroundColor={'rgba(var(--gray-10), 0)'}
                  _hover={{
                    opacity: 100,
                    backgroundColor: 'rgba(var(--gray-10), 0.3)',
                  }}
                >
                  <Iconify
                    width={24}
                    color={'gray-90'}
                    icon={'fluent:image-circle-24-filled'}
                  />
                </Flex>
                <Image
                  width={'64px'}
                  height={'64px'}
                  rounded={'full'}
                  src={
                    user?.avatar?.url
                      ? user.avatar.url
                      : '/assets/images/avatar.png'
                  }
                />
              </Button>

              <Flex
                flexDirection={'column'}
                alignItems={{ sm: 'end' }}
              >
                <Button
                  py={6}
                  px={10}
                  width={'fit'}
                  fontSize={13}
                  type={'submit'}
                  color={'gray-40'}
                  fontWeight={'semibold'}
                  borderColor={'gray-80'}
                  backgroundColor={'transparent'}
                  disabled={loading || !values.file}
                  _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
                >
                  <Button.Loader
                    color={'gray-10'}
                    visible={loading}
                  />
                  Change
                </Button>
              </Flex>

              {/* error toast */}
              <Toast visible={error !== undefined}>
                <Toast.Panel>
                  <Toast.TextContext>{error?.message}</Toast.TextContext>
                </Toast.Panel>
              </Toast>

              {/* success toast */}
              <Toast visible={data && data.user}>
                <Toast.Panel backgroundColor={'green-60'}>
                  <Toast.TextContext>
                    User profile picture updated successfully
                  </Toast.TextContext>
                </Toast.Panel>
              </Toast>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Avatar;
