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
import { useReadHederaVaultGetAllRewards } from "@/hooks/eip4626/useReadHederaVaultGetAllRewards";
import { useReadHederaVaultGetUserReward } from "@/hooks/eip4626/useReadHederaVaultGetUserReward";
import { useReadHederaVaultUserContribution } from "@/hooks/eip4626/useReadHederaVaultUserContribution";

export function VaultClaimAllReward({ vaultAddress }: VaultInfoProps) {
  const {
    data: claimResult,
    mutateAsync: claim,
    error: claimError,
    isPending: isClaimPending,
  } = useWriteHederaVaultClaimAllReward();

  // const { data: rewardsAll } = useReadHederaVaultGetAllRewards(vaultAddress);
  // console.log("L26 rewards useReadHederaVaultGetAllRewards  ===", rewardsAll);

  const { data: rewards } = useReadHederaVaultGetUserReward(vaultAddress);
  console.log("L28 rewards GetUserReward ===", rewards);

  const { data: userContribution } =
    useReadHederaVaultUserContribution(vaultAddress);
  console.log("L30 userContribution ===", userContribution);

  //@TODO show pending rewards

  return (
    <>
      {/*<Heading size={"sm"}>Pending vault rewards: {String(rewards)}</Heading>*/}
      {/*<Text>{rewards?.toString()}</Text>*/}
      {/*{rewards &&*/}
      {/*  rewards.map((reward) => <Text key={reward}>{reward?.toString()}</Text>)}*/}
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
