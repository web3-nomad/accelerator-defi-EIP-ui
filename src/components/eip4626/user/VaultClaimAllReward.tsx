import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useWriteHederaVaultClaimAllReward } from "@/hooks/eip4626/mutations/useWriteHederaVaultClaimAllReward";
import { VaultInfoProps } from "@/types/types";
import { useReadHederaVaultCalculateReward } from "@/hooks/eip4626/useReadHederaVaultCalculateReward";

export function VaultClaimAllReward({ vaultAddress }: VaultInfoProps) {
  const {
    data: claimResult,
    mutateAsync: claim,
    error: claimError,
    isPending: isClaimPending,
  } = useWriteHederaVaultClaimAllReward();

  // const { data: rewards } = useReadHederaVaultCalculateReward(vaultAddress);

  //@TODO show pending rewards

  return (
    <>
      {/*<Heading size={"sm"}>Pending vault rewards: {String(rewards)}</Heading>*/}
      <Button
        onClick={() => claim({ vaultAddress })}
        isLoading={isClaimPending}
      >
        Claim All Rewards
      </Button>

      {claimResult && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Claim success!</AlertTitle>
          <AlertDescription>TxId: {claimResult}</AlertDescription>
        </Alert>
      )}
      {claimError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Approve token error!</AlertTitle>
          <AlertDescription>{claimError.toString()}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
