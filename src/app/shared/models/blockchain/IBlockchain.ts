import { BLOCKCHAIN_NAME } from './BLOCKCHAIN_NAME';
import { Token } from '../tokens/Token';

export interface IBlockchain {
  id: Number;
  name: BLOCKCHAIN_NAME;
  scannerUrl: string;
  rpcLink: string;
  imagePath?: string;
  nativeCoin: Token;
}
