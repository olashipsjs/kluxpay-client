import Box from '@components/base/box/Box';
import Loader from '@components/loader/Loader';
import Dropdown from '@components/dropdown/Dropdown';
import FormField from '@components/formfield/FormField';
import Iconify from '@components/base/iconify/Iconify';
import Switch from '@components/switch/Switch';
import { UPDATE_OFFER } from '@graphql/offer';
import useApolloMutation from '@hooks/useApolloMutation';
import { Form, Formik } from 'formik';
import React from 'react';

type Props = {
  offerId: string;
  isActive: boolean;
};

const ChangeVisibility = ({ offerId, isActive }: Props) => {
  const [updateOffer, { loading }] = useApolloMutation(UPDATE_OFFER, {
    onCompleted: () => {},
  });

  const handleSubmit = (values: { isActive: boolean }) => {
    updateOffer({
      variables: {
        id: offerId,
        payload: { isActive: values.isActive },
      },
    });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      enableReinitialize={true}
      initialValues={{ isActive }}
    >
      {({ handleSubmit }) => {
        return (
          <Form>
            <FormField
              name={'isActive'}
              alignItems={'center'}
              position={'relative'}
              flexDirection={'row'}
            >
              {({ field }) => {
                return (
                  <React.Fragment>
                    <Dropdown.Item color={isActive ? 'green-50' : 'red-60'}>
                      <Iconify
                        width={'1.6em'}
                        icon={
                          isActive
                            ? 'material-symbols-light:visibility-rounded'
                            : 'material-symbols-light:visibility-lock-rounded'
                        }
                      />
                      {isActive ? 'Public' : 'Suspended'}
                    </Dropdown.Item>
                    <Box
                      right={'12px'}
                      position={'absolute'}
                    >
                      <Loader
                        width={'1.25em'}
                        color={'gray-60'}
                        visible={loading}
                      />
                      <Switch
                        value={field.value as boolean}
                        onClick={() => {
                          handleSubmit();
                        }}
                      />
                    </Box>
                  </React.Fragment>
                );
              }}
            </FormField>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ChangeVisibility;
