import { useWriteHederaVaultAddReward } from "@/hooks/eip4626/mutations/useWriteHederaVaultAddReward";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import BigNumber from "bignumber.js";
import { VAULT_TOKEN_PRECISION_VALUE } from "@/config/constants";
import { useQueryClient } from "@tanstack/react-query";
import { EvmAddress, VaultInfoProps } from "@/types/types";
import { useWriteHederaVaultApprove } from "@/hooks/eip4626/mutations/useWriteHederaVaultApprove";
import { useReadBalanceOf } from "@/hooks/useReadBalanceOf";
import { formatBalance } from "@/services/util/helpers";

export function VaultAddReward({ vaultAddress }: VaultInfoProps) {
  const queryClient = useQueryClient();

  const {
    data: addRewardResult,
    mutateAsync: addReward,
    isPending,
    error,
  } = useWriteHederaVaultAddReward();

  const {
    data: approveResult,
    mutateAsync: approve,
    error: approveError,
    isPending: isApprovePending,
  } = useWriteHederaVaultApprove();

  const approveToken = (amount: number, vaultRewardAddress: string) => {
    const amountConverted = BigInt(
      BigNumber(amount).shiftedBy(VAULT_TOKEN_PRECISION_VALUE).toString(),
    );

    approve({
      tokenAmount: amountConverted,
      tokenAddress: vaultRewardAddress as EvmAddress,
      vaultAddress,
    });
  };

  const form = useFormik({
    initialValues: {
      rewardTokenAddress: "",
      amount: 0,
    },
    onSubmit: async ({ amount, rewardTokenAddress }) => {
      //@TODO how to deal with regular erc20 precision? can we fetch decimals from the token CA itself?
      const amountConverted = BigInt(
        BigNumber(amount).shiftedBy(VAULT_TOKEN_PRECISION_VALUE).toString(),
      );

      //@TODO show read allowance
      //@TODO do not trigger allowance if it is enough?

      await addReward({
        vaultAddress: vaultAddress,
        tokenAmount: amountConverted,
        tokenAddress: rewardTokenAddress as EvmAddress,
      });

      queryClient.invalidateQueries();
    },
  });

  const { data: rewardTokenUserBalance, error: rewardTokenUserBalanceError } =
    useReadBalanceOf(form.values.rewardTokenAddress as EvmAddress);

  const balanceFormatted = formatBalance(rewardTokenUserBalance);

  return (
    <>
      <Heading size={"sm"}>Add reward to vault</Heading>
      <Text>
        Note: vault needs to have assets deposited before adding the rewards
      </Text>

      <form onSubmit={form.handleSubmit}>
        <VStack gap={2} alignItems="flex-start">
          <FormControl isRequired>
            <FormLabel>Reward token address</FormLabel>
            <Input
              name="rewardTokenAddress"
              variant="outline"
              value={form.values.rewardTokenAddress}
              onChange={form.handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Amount of asset to deploy</FormLabel>
            <NumberInput
              name="amount"
              variant="outline"
              value={form.values.amount}
              clampValueOnBlur={false}
              onChange={(val) => form.setFieldValue("amount", val)}
            >
              <NumberInputField />
            </NumberInput>
            <FormHelperText>
              User balance of reward asset token: {balanceFormatted}
            </FormHelperText>
            <FormHelperText>
              User balance of reward asset token RAW:{" "}
              {rewardTokenUserBalance?.toString()}
            </FormHelperText>
            {rewardTokenUserBalanceError && (
              <FormHelperText color={"red"}>
                Error fetching balance of vault reward token:{" "}
                {form.values.rewardTokenAddress}
              </FormHelperText>
            )}
            {rewardTokenUserBalanceError && (
              <FormHelperText
                color={"red"}
              >{`${rewardTokenUserBalanceError}`}</FormHelperText>
            )}
          </FormControl>
          <HStack>
            <Button
              onClick={() =>
                approveToken(form.values.amount, form.values.rewardTokenAddress)
              }
              isLoading={isApprovePending}
            >
              Approve
            </Button>
            <Button type="submit" isLoading={isPending}>
              Add Reward
            </Button>
          </HStack>
        </VStack>
      </form>

      {approveResult && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Approve success!</AlertTitle>
          <AlertDescription>TxId: {approveResult}</AlertDescription>
        </Alert>
      )}
      {approveError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Approve token error!</AlertTitle>
          <AlertDescription>{approveError.toString()}</AlertDescription>
        </Alert>
      )}

      {addRewardResult && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Add reward success!</AlertTitle>
          <AlertDescription>TxId: {addRewardResult}</AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Add reward token error!</AlertTitle>
          <AlertDescription>{error.toString()}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
