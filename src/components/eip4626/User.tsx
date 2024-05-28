import { useState, useContext } from "react";
import { Divider, Select, Stack } from "@chakra-ui/react";
import { VaultWithdraw } from "@/components/eip4626/user/VaultWithdraw";
import { VaultAssociate } from "@/components/eip4626/user/VaultAssociate";
import { VaultClaimAllReward } from "@/components/eip4626/user/VaultClaimAllReward";
import { VaultInfo } from "@/components/eip4626/user/VaultInfo";
import { VaultDeposit } from "@/components/eip4626/user/VaultDeposit";
import { Eip4626Context } from "@/contexts/Eip4626Context";

export default function User() {
  const [vaultSelected, setVaultSelected] = useState("" as `0x${string}`);

  const { deployedVaults } = useContext(Eip4626Context);

  return (
    <>
      <Stack spacing={4} align="center">
        <Select
          placeholder="Select vault for operation"
          onChange={(item) => {
            const vaultItem = deployedVaults.find(
              (itemSub) => itemSub?.["args"]?.[0] === item.target.value,
            );
            setVaultSelected(vaultItem?.["args"]?.[0]);
          }}
          variant="outline"
        >
          {deployedVaults.map((item) => (
            <option key={item?.["args"]?.[0]} value={item?.["args"]?.[0]}>
              {item?.["args"]?.[1]} ({item?.["args"]?.[2]}) [
              {item?.["args"]?.[0]}]
            </option>
          ))}
        </Select>
      </Stack>
      {vaultSelected && (
        <>
          <Divider my={10} />
          <VaultInfo vaultAddress={vaultSelected} />
          <Divider my={10} />
          <VaultAssociate vaultAddress={vaultSelected} />
          <Divider my={10} />
          <VaultDeposit vaultAddress={vaultSelected} />
          <Divider my={10} />
          <VaultWithdraw vaultAddress={vaultSelected} />
          <Divider my={10} />
          <VaultClaimAllReward vaultAddress={vaultSelected} />
          <Divider my={10} />
        </>
      )}
    </>
  );
}
