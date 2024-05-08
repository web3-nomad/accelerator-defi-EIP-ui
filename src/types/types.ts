export type DeployTokenRequest = {
  name: string;
  symbol: string;
  decimals: number;
  nftAddress: `0x${string}` | null;
};

export type MintTokenRequest = {
  address: `0x${string}`;
  value: string;
  token: `0x${string}`;
};

export type CreateIdentityRequest = {
  address: `0x${string}`;
};

export type AddIdentityToRegistryRequest = {
  address: `0x${string}`;
  identity: `0x${string}`;
  registry: `0x${string}`;
};

export type TokenNameItem = {
  address: `0x${string}`;
  name: string;
};

export type TransferTokenFromRequest = {
  tokenAddress: `0x${string}`;
  fromAddress: `0x${string}`;
  toAddress: `0x${string}`;
  amount: bigint;
};
