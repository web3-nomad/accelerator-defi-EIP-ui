import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Text,
} from "@chakra-ui/react";
import { useWriteHederaVaultClaimAllReward } from "@/hooks/eip4626/mutations/useWriteHederaVaultClaimAllReward";
import { VaultInfoProps } from "@/types/types";
import { useReadHederaVaultGetUserReward } from "@/hooks/eip4626/useReadHederaVaultGetUserReward";
import { formatBalance } from "@/services/util/helpers";
import { ActionName, TransactionResult } from "@/components/TransactionResult";
import { useQueryClient } from "@tanstack/react-query";

export function VaultClaimAllReward({ vaultAddress }: VaultInfoProps) {
  const queryClient = useQueryClient();

  const {
    data: claimResult,
    mutateAsync: claim,
    error: claimError,
    isPending: isClaimPending,
  } = useWriteHederaVaultClaimAllReward();

  const userRewards = useReadHederaVaultGetUserReward(vaultAddress);

  const claimCall = async () => {
    await claim({ vaultAddress });

    queryClient.invalidateQueries();
  };

  return (
    userRewards?.length && (
      <>
        <Text fontWeight="800" fontSize={14}>
          Your pending vault rewards:
        </Text>
        {userRewards.map((rewardQueryResult, index) => (
          <Text key={index} fontSize={14}>
            {formatBalance(rewardQueryResult.data?.toString())}
          </Text>
        ))}
        <Button onClick={claimCall} isLoading={isClaimPending} width="40%">
          Claim All Rewards
        </Button>

        <TransactionResult
          actionName={ActionName.Claim}
          transactionError={claimError}
          transactionResult={claimResult}
        />
      </>
    )
  );
}
