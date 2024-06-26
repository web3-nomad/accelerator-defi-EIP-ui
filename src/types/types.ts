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
  stakingTokenAddress: EvmAddress;
  shareTokenName: string;
  shareTokenSymbol: string;
  rewardTokenAddress: EvmAddress;
  feePercentage: number;
  feeReceiverAddress: EvmAddress;
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

export type VaultDepositRequest = {
  vaultAddress: `0x${string}`;
  tokenAmount: bigint;
};

export type VaultWithdrawRequest = {
  vaultAddress: `0x${string}`;
  tokenAmount: bigint;
};
