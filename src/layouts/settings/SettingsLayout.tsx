import React from 'react';
import TabsBlock from './components/TabsBlock';
import Heading from '@components/base/heading/Heading';
import Container from '@components/base/container/Container';

const SettingsLayout = () => {
  return (
    <React.Fragment>
      <Container>
        <Heading
          mt={12}
          mb={32}
          fontWeight={'semibold'}
        >
          Settings
        </Heading>
      </Container>
      <TabsBlock />
    </React.Fragment>
  );
};

export default SettingsLayout;
