import React from 'react';
import Button from '@components/base/button/Button';
import TextField from './TextField';
import FormField from '@components/formfield/FormField';
import Iconify from '@components/base/iconify/Iconify';

const Password = React.forwardRef(
  (
    {
      autoComplete = 'current-password webauthn',
      ...rest
    }: React.ComponentProps<typeof TextField>,
    ref: React.ForwardedRef<React.ComponentRef<typeof TextField>>
  ) => {
    const [isText, setIsText] = React.useState(false);

    return (
      <React.Fragment>
        <TextField
          ref={ref}
          autoComplete={autoComplete}
          type={isText ? 'text' : 'password'}
          {...rest}
        />
        <FormField.Slot
          pe={4}
          color={'gray-60'}
          alignItems={'center'}
        >
          <Button
            p={4}
            size={'28px'}
            rounded={'full'}
            color={'gray-40'}
            borderColor={'transparent'}
            backgroundColor={'transparent'}
            onClick={() => setIsText(!isText)}
            _hover={{
              color: 'gray-30',
              backgroundColor: 'gray-95',
            }}
          >
            <Iconify
              width={'2em'}
              icon={`material-symbols:lock-${isText ? '' : 'open-'}sharp`}
            />
          </Button>
        </FormField.Slot>
      </React.Fragment>
    );
  }
);

export default Password;
