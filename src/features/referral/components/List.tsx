import React from 'react';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import Box from '@components/base/box/Box';
import Alert from '@components/alert/Alert';
import Flex from '@components/base/flex/Flex';
import Grid from '@components/base/grid/Grid';
import Text from '@components/base/text/Text';
import useReferrals from '@hooks/useReferrals';
import Image from '@components/base/image/Image';
import Button from '@components/base/button/Button';
import { GET_USER_REFERRALS, REDEEM_REFERRAL } from '@graphql/referral';
import Heading from '@components/base/heading/Heading';
import Container from '@components/base/container/Container';
import useApolloMutation from '@hooks/useApolloMutation';
import Query from '@components/query/Query';

const Redeem = ({
  referralId,
  status,
}: {
  referralId: string;
  status: string;
}) => {
  const { setReferrals } = useReferrals();

  const [redeemReferral, { error, loading, data }] = useApolloMutation(
    REDEEM_REFERRAL,
    {
      onCompleted: (data) => {
        if (data && data.redeemReferral) {
          setReferrals({ type: 'REDEEM_REFERRAL', payload: { referralId } });
        }
      },
    }
  );

  const handleSubmit = async (values: any) => {
    await redeemReferral({ variables: { referralId: values.referralId } });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ referralId }}
      enableReinitialize
    >
      {() => {
        return (
          <Form>
            <Button
              type={'submit'}
              py={6}
              px={10}
              fontSize={12}
              maxWidth={'fit'}
              color={'gray-60'}
              borderColor={'gray-80'}
              fontWeight={'semibold'}
              backgroundColor={'white'}
              disabled={loading || status === 'redeemed'}
              _hover={{ color: 'gray-10', backgroundColor: 'gray-100' }}
            >
              <Button.Loader
                visible={loading}
                color={'gray-10'}
              />
              {status === 'redeemed' ? 'Redeemed' : 'Redeem'}
            </Button>

            <Alert
              top={'20px'}
              right={'20px'}
              maxWidth={'400px'}
              position={'absolute'}
              visible={error !== undefined}
            >
              <Alert.Message>{error?.message}</Alert.Message>
            </Alert>
            <Alert
              top={'20px'}
              right={'20px'}
              maxWidth={'400px'}
              position={'absolute'}
              backgroundColor={'green-60'}
              visible={data && data.redeemReferral}
            >
              <Alert.Message>
                Bonus redeemed, check your Ethereum wallet. We hope to see you
                again.
              </Alert.Message>
            </Alert>
          </Form>
        );
      }}
    </Formik>
  );
};

const Referrals = () => {
  const { referrals } = useReferrals();

  return (
    <Box notLastChild={{ borderBottom: 1, borderBottomColor: 'gray-90' }}>
      {referrals?.map((referral) => {
        return (
          <Grid
            py={8}
            gap={24}
            key={referral._id}
            alignItems={'center'}
            gridTemplateColumns={{
              initial: '2fr 1fr 1fr 1fr',
              sm: '5fr 2fr 2fr 2fr 1fr',
            }}
          >
            <Flex
              gap={8}
              alignItems={'center'}
            >
              <Image
                size={'32px'}
                src={'/assets/images/avatar.png'}
              />
              <Heading
                lineHeight={'1'}
                fontWeight={'semibold'}
                textTransform={'capitalize'}
                fontSize={{ initial: 13, md: 14 }}
              >
                {`${referral.referee.firstName} ${referral.referee.lastName}`}
              </Heading>
            </Flex>
            <Box display={{ initial: 'hidden', sm: 'block' }}>
              <Text
                fontSize={12}
                lineHeight={'1'}
                color={'gray-60'}
                fontWeight={'medium'}
                textTransform={'capitalize'}
              >
                {`${referral.referee.username}`}
              </Text>
            </Box>
            <Text
              fontSize={12}
              lineHeight={'1'}
              color={'gray-60'}
              fontWeight={'medium'}
            >
              {format(referral.createdAt, 'LLL dd')}
            </Text>
            <Text
              fontSize={12}
              lineHeight={'1'}
              color={'gray-60'}
              fontWeight={'medium'}
            >
              0.2 USDT
            </Text>
            <Flex justifyContent={'end'}>
              <Redeem
                referralId={referral._id}
                status={referral.status}
              />
            </Flex>
          </Grid>
        );
      })}
    </Box>
  );
};

const EmptyState = () => {
  return (
    <Container maxWidth={'400px'}>
      <Flex
        width={'full'}
        flexDirection={'column'}
      >
        <Heading
          fontSize={16}
          textAlign={'center'}
          fontWeight={'semibold'}
        >
          No referrals found.
        </Heading>
        <Text
          mt={6}
          as={'p'}
          fontSize={13}
          color={'gray-60'}
          fontWeight={'medium'}
          textAlign={'center'}
        >
          No referrals found at the moment. Start inviting your friends and
          watch your list grow!
        </Text>
      </Flex>
    </Container>
  );
};

const List = () => {
  const { setReferrals } = useReferrals();

  return (
    <React.Fragment>
      <Box notLastChild={{ mb: 12 }}>
        <Heading
          fontSize={14}
          fontWeight={'semibold'}
        >
          Referrals
        </Heading>

        <Query
          query={GET_USER_REFERRALS}
          onCompleted={(data) => {
            if (data && data.getUserReferrals) {
              setReferrals({
                type: 'SET_REFERRALS',
                payload: { referrals: data.getUserReferrals },
              });
            }
          }}
        >
          <Query.Loader />
          <Query.Error>
            <Text
              fontSize={14}
              color={'red-60'}
            ></Text>
          </Query.Error>
          <Query.Data>
            {({ data }) => {
              const referrals = data && data.getUserReferrals;

              return (
                <React.Fragment>
                  {referrals && referrals.length === 0 && <EmptyState />}
                  {referrals && referrals.length > 0 && <Referrals />}
                </React.Fragment>
              );
            }}
          </Query.Data>
        </Query>
      </Box>
    </React.Fragment>
  );
};

export default List;
