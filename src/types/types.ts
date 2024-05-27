export type DeployTokenRequest = {
  name: string;
  symbol: string;
  decimals: number;
  nftAddress?: `0x${string}`;
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
  toAddress: `0x${string}`;
  amount: bigint;
};

export type EvmAddress = `0x${string}`;

export type VaultInfoProps = {
  vaultAddress: EvmAddress;
};

export type AssociateTokenProps = {
  tokenAddress: EvmAddress;
};

export type DeployVaultRequest = {
  stakingTokenAddress: `0x${string}`;
  shareTokenName: string;
  shareTokenSymbol: string;
  rewardTokenAddress: `0x${string}`;
  feePercentage: number;
};

export type UpdateFeeConfigRequest = {
  vaultAddress: `0x${string}`;
  receiver: `0x${string}`;
  rewardTokenAddress: `0x${string}`;
  feePercentage: number;
};

export type VaultNameItem = {
  address: `0x${string}`;
  shareTokenName: string;
  shareTokenSymbol: string;
};
