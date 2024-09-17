import { readIdentityRegistryInvestorCountry } from "@/services/contracts/wagmiGenActions";

export enum QueryKeys {
  ContractCallResults = "contractCallResults",
  ReadErc20BalanceOf = "readErc20BalanceOf",
  ReadTokenName = "readTokenName",
  ReadBalanceOf = "readBalanceOf",
  ReadTokenCompliance = "readTokenCompliance",
  ReadModularComplianceGetModules = "readModularComplianceGetModules",
  ReadHtsTokenTokenAddress = "readHtsTokenTokenAddress",
  ReadAccountTokens = "readAccountTokens",
  ReadTokenDecimals = "readTokenDecimals",
  ReadTokenIsAgent = "readTokenIsAgent",
  ReadTokenOwner = "ReadTokenIsAgent",
  ReadIdentityRegistryInvestorCountry = "ReadIdentityRegistryInvestorCountry",
}

export enum QueryKeysEIP4626 {
  ReadHederaVaultAsset = "readHederaVaultAsset",
  ReadHederaVaultAssetTotalSupply = "readHederaVaultAssetTotalSupply",
  ReadHederaVaultGetRewardTokens = "ReadHederaVaultGetRewardTokens",
  ReadHederaVaultShare = "ReadHederaVaultShare",
  ReadHederaVaultBalanceOf = "ReadHederaVaultBalanceOf",
  ReadHederaVaultGetAllRewards = "readHederaVaultGetAllRewards",
  ReadHederaVaultPreviewDeposit = "readHederaVaultPreviewDeposit",
  ReadHederaVaultFeeConfig = "readHederaVaultFeeConfig",
  ReadHederaVaultPreviewRedeem = "readHederaVaultPreviewRedeem",
  ReadHederaVaultPreviewWithdraw = "readHederaVaultPreviewWithdraw",
  ReadHederaVaultGetUserReward = "readHederaVaultGetUserReward",
  ReadHederaVaultUserContribution = "readHederaVaultUserContribution",
  ReadHederaVaultAssetQueries = "readHederaVaultAssetQueries",
}
