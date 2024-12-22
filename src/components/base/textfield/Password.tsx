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
          alignItems={'center'}
        >
          <Button
            p={4}
            size={'28px'}
            rounded={'full'}
            color={'gray-60'}
            borderColor={'transparent'}
            backgroundColor={'transparent'}
            onClick={() => setIsText(!isText)}
            _hover={{
              color: 'gray-10',
              backgroundColor: 'gray-95',
            }}
          >
            <Iconify
              width={'20px'}
              icon={`${
                isText
                  ? 'fluent:lock-closed-24-regular'
                  : 'fluent:lock-open-24-regular'
              }`}
            />
          </Button>
        </FormField.Slot>
      </React.Fragment>
    );
  }
);

export default Password;
