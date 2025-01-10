import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  bankName: Yup.string().required('Bank name'),
  method: Yup.string().required('Select an option'),
  details: Yup.string().max(200, 'Too much characters'),
  bankAccountName: Yup.string().required('Account name'),
  bankAccountNumber: Yup.string().required('Account number'),
});
