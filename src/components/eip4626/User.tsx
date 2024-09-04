import { useState, useContext } from "react";
import { Divider, Stack, Text, Flex, Box } from "@chakra-ui/react";
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
import { MenuSelect } from "@/components/MenuSelect";
import { GroupBase } from "react-select";

export default function User() {
  const [vaultSelected, setVaultSelected] = useState("" as EvmAddress);
  const [vaultAssetSelected, setVaultAssetSelected] = useState(
    "" as EvmAddress,
  );

  const { deployedProxyHtsTokens, deployedHtsTokenNames } =
    useContext(Eip4626Context);
  const { deployedVaults } = useContext(Eip4626Context);

  const vaultAddresses = deployedVaults.map((item) => item?.["args"]?.[0]);
  const vaultAssetsFetched = useReadHederaVaultAssetQueries(vaultAddresses);

  const filteredVaultsBySelectedAsset = vaultAssetsFetched.filter(
    (item) => item?.data?.vaultAssetAddress === vaultAssetSelected,
  );

  const filteredVaultsForSelect = deployedVaults.filter((item) => {
    return filteredVaultsBySelectedAsset.find(
      (subItem) => subItem?.data?.vaultAddress === item?.["args"]?.[0],
    );
  });

  return (
    <>
      {deployedProxyHtsTokens.length ? (
        <Stack align="center">
          <Box width="50%">
            <MenuSelect
              label="Select vault asset for operation"
              data={
                deployedProxyHtsTokens.map((item) => ({
                  value: item,
                  label: deployedHtsTokenNames[item],
                })) as unknown as GroupBase<string | number>[]
              }
              onTokenSelect={(value) => {
                setVaultSelected(value as EvmAddress);
              }}
            />
          </Box>
        </Stack>
      ) : (
        <Text>No deployed HTS token addresses found</Text>
      )}

      <Divider my={10} />

      <Stack>
        <MintAssetToken
          vaultAssetSelected={vaultAssetSelected}
          vaultAssetSelectedName={deployedHtsTokenNames[vaultAssetSelected]}
        />
      </Stack>

      <Divider my={10} />

      {vaultAssetSelected && (
        <Stack align="center">
          {filteredVaultsForSelect?.length ? (
            <Box width="50%">
              <MenuSelect
                label="Select vault for operation"
                data={
                  filteredVaultsForSelect.map((item) => ({
                    value: item?.["args"]?.[0],
                    label: `${item?.["args"]?.[1]} (${item?.["args"]?.[2]}) [${item?.["args"]?.[0]}]`,
                  })) as unknown as GroupBase<string | number>[]
                }
                onTokenSelect={(value) => {
                  const vaultItem = filteredVaultsForSelect.find(
                    (itemSub) => itemSub?.["args"]?.[0] === value,
                  );
                  setVaultSelected(vaultItem?.["args"]?.[0]);
                }}
              />
            </Box>
          ) : (
            <Flex>
              <Text>Deploy new vault in Admin area</Text>
            </Flex>
          )}
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
