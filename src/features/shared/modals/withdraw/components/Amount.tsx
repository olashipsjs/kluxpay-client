import Button from '@components/base/button/Button';
import Label from '@components/base/label/Label';
import TextField from '@components/base/textfield/TextField';
import FormField from '@components/formfield/FormField';
import CoinPrice from '@components/shared/CoinPrice';
import useStep from '@hooks/useStep';
import useUser from '@hooks/useUser';
import formatDecimal from '@utils/formatDecimal';
import toNumber from '@utils/toNumber';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useParams, useSearchParams } from 'react-router-dom';

const Amount = () => {
  const { user } = useUser();
  const { data, next } = useStep<any>();
  const [searchParams] = useSearchParams();
  const { token } = useParams<{ token: string }>();

  const NETWORK_NAME = searchParams.get('network');

  const validationSchema = Yup.object().shape({
    amount: Yup.string().required('Enter an amount'),
  });

  const handleSubmit = (values: typeof data) => {
    next({ ...data, ...values });
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values }) => {
        return (
          <Form>
            <FormField name={'amount'}>
              <Label textAlign={'center'}>ETH</Label>
              <TextField
                fontSize={32}
                type={'number'}
                lineHeight={'1'}
                placeholder={'0.00'}
                textAlign={'center'}
              />
              <CoinPrice coinId={'ethereum'}>
                {({ price }) => {
                  const AMOUNT = toNumber(values.amount || '0');

                  return (
                    <FormField.Message
                      as={'p'}
                      textAlign={'center'}
                    >{`${formatDecimal(
                      price * AMOUNT
                    )} ${user?.currency.toUpperCase()}`}</FormField.Message>
                  );
                }}
              </CoinPrice>
            </FormField>

            <Button
              mt={64}
              type={'submit'}
            >
              Confirm
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Amount;
