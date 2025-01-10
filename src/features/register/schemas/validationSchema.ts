import * as Yup from 'yup';

const otherValidationSchema = Yup.object().shape({
  lastName: Yup.string().required('Tell us your last name'),
  firstName: Yup.string().required('Tell us your first name'),
  email: Yup.string()
    .required('Tell us your email address')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Invalid email address'
    ),
  password: Yup.string()
    .required('Please enter your password')
    .min(8, 'Must be at least 8 characters long')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Must contain at least one digit')
    .matches(
      /[@$!%*?&#.:()+_-]/,
      'Must contain at least one special character'
    ),
});

const usernameValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Please enter a username')
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long')
    .matches(
      /^[A-Za-z0-9_-]+$/,
      'Username can only contain letters, numbers, hyphens, and underscores'
    ),
});

export { otherValidationSchema, usernameValidationSchema };
