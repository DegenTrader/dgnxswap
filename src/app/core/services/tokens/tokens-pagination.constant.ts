import { BLOCKCHAIN_NAME } from 'src/app/shared/models/blockchain/BLOCKCHAIN_NAME';

export const TOKENS_PAGINATION = {
  [BLOCKCHAIN_NAME.ETHEREUM]: { count: undefined, page: 2 },
  [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: { count: undefined, page: 2 },
  [BLOCKCHAIN_NAME.POLYGON]: { count: undefined, page: 2 },
  [BLOCKCHAIN_NAME.HARMONY]: { count: undefined, page: 2 }
};
