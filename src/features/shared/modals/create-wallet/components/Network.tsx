import Alert from '@components/alert/Alert';
import Button from '@components/base/button/Button';
import Loader from '@components/loader/Loader';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Iconify from '@components/base/iconify/Iconify';
import Image from '@components/base/image/Image';
import Radio from '@components/base/radio/Radio';
import Text from '@components/base/text/Text';
import Divider from '@components/divider/Divider';
import FormField from '@components/formfield/FormField';
import Overlay from '@components/overlay/Overlay';
import networks from '@constants/networks';
import { CREATE_WALLETS } from '@graphql/wallet';
import useApolloMutation from '@hooks/useApolloMutation';
import useStep from '@hooks/useStep';
import useWallets from '@hooks/useWallets';
import { Formik, Form } from 'formik';
import React from 'react';

const Network = () => {
  const { setWallets } = useWallets();
  const { data, next } = useStep<any>();
  const [createWallets, { loading, error }] = useApolloMutation(
    CREATE_WALLETS,
    {
      onCompleted: (res) => {
        setWallets({
          type: 'ADD_WALLET',
          payload: { wallets: res?.createWallets },
        });
        next(res?.createWallets);
      },
    }
  );

  const handleSubmit = async (values: typeof data) => {
    await createWallets({ variables: { payload: values } });
  };

  return (
    <React.Fragment>
      <Flex
        alignItems={'center'}
        justifyContent={'between'}
      >
        <Heading fontSize={16}>Choose network</Heading>
        <Overlay.Trigger
          py={6}
          size={'fit'}
          color={'gray-60'}
          borderColor={'gray-90'}
          backgroundColor={'transparent'}
          boxShadow={'0px .5px 0px 0px rgba(var(--gray-80))'}
          _hover={{
            color: 'gray-10',
            backgroundColor: 'gray-100',
          }}
        >
          Cancel
          <Iconify icon={'fluent:dismiss-24-regular'} />
        </Overlay.Trigger>
      </Flex>

      <Divider my={12} />

      <Text
        mb={12}
        as={'p'}
        fontSize={13}
      >
        Select a network to create a new wallet based on your network settings
      </Text>

      <Formik
        initialValues={data}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormField
            gap={0}
            border={1}
            rounded={12}
            name={'networks'}
            overflow={'hidden'}
            borderColor={'gray-90'}
            notLastChild={{ borderBottom: 1, borderBottomColor: 'gray-90' }}
          >
            {networks.map((network) => {
              return (
                <Radio
                  px={8}
                  gap={0}
                  key={network.name}
                  value={network.name}
                  justifyContent={'start'}
                  textTransform={'capitalize'}
                >
                  {({ isActive }) => {
                    return (
                      <React.Fragment>
                        <Image
                          me={8}
                          size={'20px'}
                          src={network.image}
                          alt={network.name}
                        />
                        <Text
                          css={{ flex: 1 }}
                          textAlign={'left'}
                        >
                          {network.name}
                        </Text>
                        <Radio.Switch color={isActive ? 'indigo-60' : ''} />
                      </React.Fragment>
                    );
                  }}
                </Radio>
              );
            })}
          </FormField>

          <Button
            mt={16}
            type={'submit'}
            disabled={loading}
          >
            <Loader visible={loading} />
            Create Wallet
          </Button>

          <Alert
            mt={12}
            visible={error !== undefined}
          >
            <Alert.Icon />
            <Alert.Message>{error?.message}</Alert.Message>
          </Alert>
        </Form>
      </Formik>
    </React.Fragment>
  );
};

export default Network;
