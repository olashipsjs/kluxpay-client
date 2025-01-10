import * as Yup from 'yup';

export const categoryValidationSchema = Yup.object().shape({
  category: Yup.string().required('Select a category'),
});

export const otherValidationSchema = Yup.object().shape({
  name: Yup.string().required('Provide your name'),
  title: Yup.string().required('Provide your title'),
  priority: Yup.string().required('Select a priority'),
  email: Yup.string().required('Provide an email address'),
  description: Yup.string().required('Provide your description'),
});
