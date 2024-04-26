export type DeployTokenRequest = {
  name: string;
  symbol: string;
  decimals: number;
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
