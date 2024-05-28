import { hederaVaultAddress } from "@/services/contracts/wagmiGenActions";
import { VaultInfo } from "@/components/eip4626/user/VaultInfo";
import { VaultDeposit } from "@/components/eip4626/user/VaultDeposit";
import {
  Divider,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { VaultWithdraw } from "@/components/eip4626/user/VaultWithdraw";
import DeployedVaultsList from "@/components/eip4626/user/DeployedVaultsList";
import { useFormik } from "formik";
import { VaultAssociate } from "@/components/eip4626/user/VaultAssociate";
import { VaultClaimAllReward } from "@/components/eip4626/user/VaultClaimAllReward";
import { EvmAddress } from "@/types/types";

export default function User() {
  const form = useFormik({
    initialValues: {
      vaultAddress: "" as EvmAddress,
    },
    onSubmit: () => {},
  });

  return (
    <>
      <form onSubmit={form.handleSubmit}>
        <VStack gap={2} alignItems="flex-start">
          <FormControl>
            <FormLabel>Please insert vault address</FormLabel>
            <Input
              name="vaultAddress"
              variant="outline"
              value={form.values.vaultAddress}
              onChange={form.handleChange}
            />
          </FormControl>
        </VStack>
      </form>
      <Divider my={10} />
      {form.values.vaultAddress && (
        <>
          <VaultInfo vaultAddress={form.values.vaultAddress} />
          <Divider my={10} />
          <VaultAssociate vaultAddress={form.values.vaultAddress} />
          <Divider my={10} />
          <VaultDeposit vaultAddress={form.values.vaultAddress} />
          <Divider my={10} />
          <VaultWithdraw vaultAddress={form.values.vaultAddress} />
          <Divider my={10} />
          <VaultClaimAllReward vaultAddress={form.values.vaultAddress} />
          <Divider my={10} />
        </>
      )}

      <DeployedVaultsList />
    </>
  );
}
