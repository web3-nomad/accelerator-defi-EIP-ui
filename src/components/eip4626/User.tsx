import { useState, useContext } from "react";
import { Divider, Select, Stack } from "@chakra-ui/react";
import { VaultWithdraw } from "@/components/eip4626/user/VaultWithdraw";
import { VaultAssociate } from "@/components/eip4626/user/VaultAssociate";
import { VaultClaimAllReward } from "@/components/eip4626/user/VaultClaimAllReward";
import { VaultInfo } from "@/components/eip4626/user/VaultInfo";
import { VaultDeposit } from "@/components/eip4626/user/VaultDeposit";
import { Eip4626Context } from "@/contexts/Eip4626Context";
import { VaultAddReward } from "@/components/eip4626/user/VaultAddReward";
import { MintAssetToken } from "@/components/eip4626/user/MintAssetToken";
import { useReadHederaVaultAssetQueries } from "@/hooks/eip4626/useReadHederaVaultAsset";
import { EvmAddress } from "@/types/types";

export default function User() {
  const [vaultSelected, setVaultSelected] = useState("" as EvmAddress);
  const [vaultAssetSelected, setVaultAssetSelected] = useState(
    "" as EvmAddress,
  );
  console.log("L19 vaultAssetSelected ===", vaultAssetSelected);

  const { deployedProxyHtsTokens } = useContext(Eip4626Context);

  const { deployedVaults } = useContext(Eip4626Context);
  console.log("L31 deployedVaults ===", deployedVaults);

  const vaultAddresses = deployedVaults.map((item) => item?.["args"]?.[0]);
  console.log("L19 vaultAddresses extracted ===", vaultAddresses);

  const vaultAssetsFetched = useReadHederaVaultAssetQueries(vaultAddresses);
  console.log("L20 vaultAssetsFetched ===", vaultAssetsFetched);

  const filteredVaultsBySelectedAsset = vaultAssetsFetched.filter(
    (item) => item?.data?.vaultAssetAddress === vaultAssetSelected,
  );

  console.log(
    "L31 filteredVaultsBySelectedAsset ===",
    filteredVaultsBySelectedAsset,
  );

  const filteredVaultsForSelect = deployedVaults.filter((item) => {
    return filteredVaultsBySelectedAsset.find(
      (subItem) => subItem?.data?.vaultAddress === item?.["args"]?.[0],
    );
  });

  console.log("L39 filteredVaultsForSelect ===", filteredVaultsForSelect);

  return (
    <>
      {!deployedProxyHtsTokens.length ? (
        <>No deployed HTS token addresses found</>
      ) : (
        <Stack spacing={4} align="center">
          <Select
            placeholder="Select vault asset for operation"
            onChange={(item) => {
              setVaultAssetSelected(item.target.value as EvmAddress);
            }}
            variant="outline"
          >
            {deployedProxyHtsTokens.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </Stack>
      )}

      <Stack>
        <MintAssetToken vaultAssetSelected={vaultAssetSelected} />
      </Stack>

      {vaultAssetSelected && (
        <Stack spacing={4} align="center">
          <Select
            placeholder="Select vault for operation"
            onChange={(item) => {
              const vaultItem = filteredVaultsForSelect.find(
                (itemSub) => itemSub?.["args"]?.[0] === item.target.value,
              );
              setVaultSelected(vaultItem?.["args"]?.[0]);
            }}
            variant="outline"
          >
            {filteredVaultsForSelect.map((item) => (
              <option key={item?.["args"]?.[0]} value={item?.["args"]?.[0]}>
                {item?.["args"]?.[1]} ({item?.["args"]?.[2]}) [
                {item?.["args"]?.[0]}]
              </option>
            ))}
          </Select>
        </Stack>
      )}

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
          <VaultAddReward vaultAddress={vaultSelected} />
          <Divider my={10} />
        </>
      )}
    </>
  );
}
