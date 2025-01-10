import Box from '@components/base/box/Box';
import Button from '@components/base/button/Button';
import Flex from '@components/base/flex/Flex';
import Heading from '@components/base/heading/Heading';
import Textarea from '@components/base/textarea/Textarea';
import FormField from '@components/formfield/FormField';
import useStep from '@hooks/useStep';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Header from './Header';
import useApolloMutation from '@hooks/useApolloMutation';
import { CREATE_OFFER } from '@graphql/offer';
import useOffers from '@hooks/useOffers';
import Alert from '@components/alert/Alert';
import toNumber from '@utils/toNumber';

const validationSchema = Yup.object().shape({
  notes: Yup.string()
    .required('Enter trading terms')
    .max(250, 'Maximum characters length is 250'),
});

const Notes = () => {
  const { setOffers } = useOffers();
  const { data, next } = useStep<any>();
  const [createOffer, { loading, error }] = useApolloMutation(CREATE_OFFER, {
    onCompleted: (data: any) => {
      if (data && data.createOffer) {
        next({});
        setOffers({
          type: 'ADD_OFFER',
          payload: { offer: data.createOffer },
        });
      }
    },
  });

  const handleSubmit = async (values: typeof data) => {
    await createOffer({
      variables: {
        type: values.type,
        notes: values.notes,
        coinId: values.coin.id,
        fiat: values.fiat.symbol,
        paymentId: values.payment._id,
        timeout: values.timeout,
        margin: parseFloat(String(toNumber(values.margin))),
        minLimit: parseFloat(String(toNumber(values.minLimit))),
        maxLimit: parseFloat(String(toNumber(values.maxLimit))),
      },
    });
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
            <Flex
              minHeight={'60vh'}
              flexDirection={'column'}
            >
              <Header data={values} />

              <Box
                p={16}
                css={{ flex: 1 }}
                notLastChild={{ mb: 24 }}
              >
                <Heading fontSize={21}>What are your trade terms? </Heading>

                <FormField name={'notes'}>
                  <FormField.Sheet>
                    <Textarea
                      rows={4}
                      placeholder={'Enter your trade terms'}
                    />
                  </FormField.Sheet>
                  <FormField.Message />
                </FormField>
              </Box>

              <Box p={16}>
                <Button type={'submit'}>
                  <Button.Loader visible={loading} />
                  Post
                </Button>

                <Alert
                  mt={12}
                  visible={error !== undefined}
                >
                  <Alert.Message>{error?.message}</Alert.Message>
                </Alert>
              </Box>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Notes;
