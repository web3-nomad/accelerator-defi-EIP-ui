import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useWriteHederaVaultClaimAllReward } from "@/hooks/eip4626/mutations/useWriteHederaVaultClaimAllReward";
import { VaultInfoProps } from "@/types/types";
import { useReadHederaVaultGetUserReward } from "@/hooks/eip4626/useReadHederaVaultGetUserReward";

export function VaultClaimAllReward({ vaultAddress }: VaultInfoProps) {
  const {
    data: claimResult,
    mutateAsync: claim,
    error: claimError,
    isPending: isClaimPending,
  } = useWriteHederaVaultClaimAllReward();

  const userRewards = useReadHederaVaultGetUserReward(vaultAddress);

  return (
    <>
      <Heading size={"sm"}>Your pending vault rewards:</Heading>
      {userRewards &&
        userRewards.map((rewardQueryResult, index) => (
          <Text key={index}>{rewardQueryResult.data?.toString()}</Text>
        ))}
      <Button
        onClick={() => claim({ vaultAddress })}
        isLoading={isClaimPending}
      >
        Claim All Rewards
      </Button>

      {claimResult && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Claim rewards success!</AlertTitle>
          <AlertDescription>TxId: {claimResult}</AlertDescription>
        </Alert>
      )}
      {claimError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Claim rewards error!</AlertTitle>
          <AlertDescription>{claimError.toString()}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
