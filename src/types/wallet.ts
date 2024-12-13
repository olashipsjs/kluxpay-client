import User from './user';

type Wallet = {
  _id: string;
  publicKey: string;
  privateKey: string;
  platform: string;
  user: User | null;
};

export default Wallet;
