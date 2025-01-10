import Box from '@components/base/box/Box';
import Heading from '@components/base/heading/Heading';
import Step from '@components/step/Step';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Category from './components/Category';
import FormBlock from './components/FormBlock';
import Success from './components/Success';
import useUser from '@hooks/useUser';

const SupportFeature = () => {
  const { user } = useUser();

  return (
    <React.Fragment>
      <Helmet>
        <title>Support - KluxPay</title>
      </Helmet>
      <Box notLastChild={{ mb: 24 }}>
        <Heading>Support</Heading>
        <Step
          initialData={{
            title: '',
            category: '',
            priority: 'low',
            description: '',
            email: `${user?.email}`,
            name: `${user?.firstName} ${user?.lastName}`,
          }}
        >
          <Step.Screen screens={[<Category />, <FormBlock />, <Success />]} />
        </Step>
      </Box>
    </React.Fragment>
  );
};

export default SupportFeature;
