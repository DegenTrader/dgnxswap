import { BLOCKCHAIN_NAME } from 'src/app/shared/models/blockchain/BLOCKCHAIN_NAME';

/**
 * Defines for each blockchain whether to display gas in instant trade bottom panel.
 */
export const shouldDisplayGas = {
  [BLOCKCHAIN_NAME.ETHEREUM]: true,
  [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: false,
  [BLOCKCHAIN_NAME.POLYGON]: false,
  [BLOCKCHAIN_NAME.HARMONY]: false,
  [BLOCKCHAIN_NAME.AVALANCHE]: false
};