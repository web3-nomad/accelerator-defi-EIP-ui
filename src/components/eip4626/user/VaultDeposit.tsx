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
  NumberInput,
  NumberInputField,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { EvmAddress, VaultInfoProps } from "@/types/types";
import { useReadBalanceOf } from "@/hooks/useReadBalanceOf";
import { useWriteHederaVaultDeposit } from "@/hooks/eip4626/mutations/useWriteHederaVaultDeposit";
import { useReadHederaVaultAsset } from "@/hooks/eip4626/useReadHederaVaultAsset";

export function VaultDeposit({ vaultAddress }: VaultInfoProps) {
  const {
    data: depositResult,
    mutateAsync: deposit,
    error: depositError,
    isPending,
  } = useWriteHederaVaultDeposit();

  const form = useFormik({
    initialValues: {
      amount: 0,
    },
    onSubmit: ({ amount }) => {
      const amountConverted = BigInt(amount);
      deposit(amountConverted);
    },
  });

  const { data: vaultAssetAddress } = useReadHederaVaultAsset(vaultAddress);

  const { data: vaultAssetUserBalance, error: vaultAssetUserBalanceError } =
    useReadBalanceOf(vaultAssetAddress as EvmAddress);

  return (
    <>
      <Heading size={"sm"}>Deposit asset into vault</Heading>

      <form onSubmit={form.handleSubmit}>
        <VStack gap={2} alignItems="flex-start">
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
              User balance of vault asset token: {`${vaultAssetUserBalance}`}
            </FormHelperText>
            {vaultAssetUserBalanceError && (
              <FormHelperText color={"red"}>
                Error fetching balance of vault asset token: {vaultAssetAddress}
              </FormHelperText>
            )}
          </FormControl>
          <Button type="submit" isLoading={isPending}>
            Transfer
          </Button>
        </VStack>
      </form>
      {depositError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Deposit token error!</AlertTitle>
          <AlertDescription>{depositError.toString()}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
