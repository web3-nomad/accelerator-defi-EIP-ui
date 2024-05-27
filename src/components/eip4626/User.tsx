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

export default function User() {
  const form = useFormik({
    initialValues: {
      vaultAddress: hederaVaultAddress,
    },
    onSubmit: () => {},
  });

  return (
    <>
      <form onSubmit={form.handleSubmit}>
        <VStack gap={2} alignItems="flex-start">
          <FormControl>
            <FormLabel>Vault address</FormLabel>
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
      <VaultInfo vaultAddress={form.values.vaultAddress} />
      <Divider my={10} />
      <VaultAssociate vaultAddress={form.values.vaultAddress} />
      <Divider my={10} />
      <VaultDeposit vaultAddress={form.values.vaultAddress} />
      <Divider my={10} />
      <VaultWithdraw vaultAddress={form.values.vaultAddress} />
      <Divider my={10} />
      <DeployedVaultsList />
    </>
  );
}
