import Container from '@components/base/container/Container';
import List from './components/List';

const WalletsFeature = () => {
  return (
    <Container
      mt={32}
      px={0}
      maxWidth={'480px'}
    >
      <List />
    </Container>
  );
};

export default WalletsFeature;
