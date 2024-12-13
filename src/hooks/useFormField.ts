import { useContext } from 'react';
import { FormFieldContext } from 'src/providers/FormFieldProvider';

const useFormField = () => {
  const context = useContext(FormFieldContext);

  if (context === undefined) {
    throw new Error(
      'useFormField hook requires the FormFieldProvider to be defined'
    );
  }

  return context;
};

export default useFormField;
