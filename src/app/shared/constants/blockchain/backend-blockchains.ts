import { BlockchainName, BLOCKCHAIN_NAME } from 'rubic-sdk';

const BLOCKCHAINS_MAPPING = {
  [BLOCKCHAIN_NAME.ETHEREUM]: 'ethereum',
  [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: 'binance-smart-chain',
  [BLOCKCHAIN_NAME.POLYGON]: 'polygon',
  [BLOCKCHAIN_NAME.HARMONY]: 'harmony',
  [BLOCKCHAIN_NAME.AVALANCHE]: 'avalanche',
  [BLOCKCHAIN_NAME.MOONRIVER]: 'moonriver',
  [BLOCKCHAIN_NAME.FANTOM]: 'fantom',
  [BLOCKCHAIN_NAME.ARBITRUM]: 'arbitrum',
  [BLOCKCHAIN_NAME.AURORA]: 'aurora',
  [BLOCKCHAIN_NAME.SOLANA]: 'solana',
  [BLOCKCHAIN_NAME.NEAR]: 'near',
  [BLOCKCHAIN_NAME.TELOS]: 'telos-evm',
  [BLOCKCHAIN_NAME.OPTIMISM]: 'optimistic-ethereum',
  [BLOCKCHAIN_NAME.CRONOS]: 'cronos',
  [BLOCKCHAIN_NAME.OKE_X_CHAIN]: 'okex-chain',
  [BLOCKCHAIN_NAME.GNOSIS]: 'xdai',
  [BLOCKCHAIN_NAME.FUSE]: 'fuse',
  [BLOCKCHAIN_NAME.MOONBEAM]: 'moonbeam',
  [BLOCKCHAIN_NAME.CELO]: 'celo',
  [BLOCKCHAIN_NAME.BOBA]: 'boba',
  [BLOCKCHAIN_NAME.ASTAR]: 'astar',
  [BLOCKCHAIN_NAME.BITCOIN]: 'bitcoin',
  [BLOCKCHAIN_NAME.ETHEREUM_POW]: 'ethereum-pow',
  [BLOCKCHAIN_NAME.TRON]: 'tron',
  [BLOCKCHAIN_NAME.KAVA]: 'kava',
  [BLOCKCHAIN_NAME.BITGERT]: 'bitgert',
  [BLOCKCHAIN_NAME.OASIS]: 'oasis',
  [BLOCKCHAIN_NAME.METIS]: 'metis',
  [BLOCKCHAIN_NAME.DFK]: 'defikingdoms',
  [BLOCKCHAIN_NAME.KLAYTN]: 'klaytn',
  [BLOCKCHAIN_NAME.VELAS]: 'velas'
} as const;

export const TO_BACKEND_BLOCKCHAINS: Record<BlockchainName, BackendBlockchain> = {
  ...BLOCKCHAINS_MAPPING
};

export type BackendBlockchain = typeof BLOCKCHAINS_MAPPING[keyof typeof BLOCKCHAINS_MAPPING];

export const FROM_BACKEND_BLOCKCHAINS: Record<BackendBlockchain, BlockchainName> = {
  ethereum: BLOCKCHAIN_NAME.ETHEREUM,
  'binance-smart-chain': BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN,
  polygon: BLOCKCHAIN_NAME.POLYGON,
  harmony: BLOCKCHAIN_NAME.HARMONY,
  avalanche: BLOCKCHAIN_NAME.AVALANCHE,
  moonriver: BLOCKCHAIN_NAME.MOONRIVER,
  fantom: BLOCKCHAIN_NAME.FANTOM,
  arbitrum: BLOCKCHAIN_NAME.ARBITRUM,
  aurora: BLOCKCHAIN_NAME.AURORA,
  solana: BLOCKCHAIN_NAME.SOLANA,
  near: BLOCKCHAIN_NAME.NEAR,
  'telos-evm': BLOCKCHAIN_NAME.TELOS,
  'optimistic-ethereum': BLOCKCHAIN_NAME.OPTIMISM,
  cronos: BLOCKCHAIN_NAME.CRONOS,
  'okex-chain': BLOCKCHAIN_NAME.OKE_X_CHAIN,
  xdai: BLOCKCHAIN_NAME.GNOSIS,
  fuse: BLOCKCHAIN_NAME.FUSE,
  moonbeam: BLOCKCHAIN_NAME.MOONBEAM,
  celo: BLOCKCHAIN_NAME.CELO,
  boba: BLOCKCHAIN_NAME.BOBA,
  bitcoin: BLOCKCHAIN_NAME.BITCOIN,
  'ethereum-pow': BLOCKCHAIN_NAME.ETHEREUM_POW,
  tron: BLOCKCHAIN_NAME.TRON,
  kava: BLOCKCHAIN_NAME.KAVA,
  bitgert: BLOCKCHAIN_NAME.BITGERT,
  astar: BLOCKCHAIN_NAME.ASTAR,
  oasis: BLOCKCHAIN_NAME.OASIS,
  metis: BLOCKCHAIN_NAME.METIS,
  defikingdoms: BLOCKCHAIN_NAME.DFK,
  klaytn: BLOCKCHAIN_NAME.KLAYTN,
  velas: BLOCKCHAIN_NAME.VELAS
};
