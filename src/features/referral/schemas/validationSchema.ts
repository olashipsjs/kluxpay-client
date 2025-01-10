import * as Yup from 'yup';

export const invitationValidationSchema = Yup.object().shape({
  referralCode: Yup.string()
    .required('Enter a referral code')
    .min(5, 'Invalid referral code'),
});
