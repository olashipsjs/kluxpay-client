import { useField } from 'formik';
import React from 'react';

type Context = {
  refObject: React.ForwardedRef<any>;
  field: ReturnType<typeof useField>[0];
  meta: ReturnType<typeof useField>[1];
  helper: ReturnType<typeof useField>[2];
};

export const FormFieldContext = React.createContext<Context | undefined>(
  undefined
);

type Props = {
  name: string;
  children?: ((context: Context) => React.ReactNode) | React.ReactNode;
};

const FormFieldProvider = React.forwardRef(
  ({ name, children }: Props, ref: React.ForwardedRef<any>) => {
    const [field, meta, helper] = useField(name);

    const value = { field, meta, helper, refObject: ref };

    return (
      <FormFieldContext.Provider value={value}>
        {typeof children === 'function' ? children(value) : children}
      </FormFieldContext.Provider>
    );
  }
);

export default FormFieldProvider;
