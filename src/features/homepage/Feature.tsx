import Hero from './components/Hero';
import Section from '@components/base/section/Section';
import React from 'react';

const HomePageFeature = () => {
  return (
    <React.Fragment>
      <Section
        maxWidth={'full'}
        backgroundImage={
          'linear-gradient(rgba(var(--gray-90)) 72%, rgba(var(--indigo-95)))'
        }
      >
        <Hero />
      </Section>
    </React.Fragment>
  );
};

export default HomePageFeature;
