import User from './user';

type Wallet = {
  _id: string;
  publicKey: string;
  privateKey: string;
  platform: string;
  user: User.Type | null;
};

export default Wallet;
