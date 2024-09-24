import { useState, useContext } from "react";
import {
  Divider,
  Stack,
  Text,
  Box,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
} from "@chakra-ui/react";
import { GroupBase } from "react-select";
import { VaultAssociate } from "@/components/eip4626/user/VaultAssociate";
import { VaultClaimAllReward } from "@/components/eip4626/user/VaultClaimAllReward";
import { VaultInfo } from "@/components/eip4626/user/VaultInfo";
import { Eip4626Context } from "@/contexts/Eip4626Context";
import { MintAssetToken } from "@/components/eip4626/user/MintAssetToken";
import { useReadHederaVaultAssetQueries } from "@/hooks/eip4626/useReadHederaVaultAsset";
import { EvmAddress } from "@/types/types";
import { MenuSelect } from "@/components/MenuSelect";
import { VaultAddReward } from "@/components/eip4626/user/VaultAddReward";
import { VaultTabSection } from "@/components/eip4626/user/VaultTabSection";

export default function User() {
  const [vaultSelected, setVaultSelected] = useState<EvmAddress>(
    "0xe95E635753a8A233cB736c5CB0dF181Bb865a90b" as EvmAddress,
  );
  const [vaultAssetSelected, setVaultAssetSelected] = useState<EvmAddress>(
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
      <Stack align="center" pt="5">
        {deployedProxyHtsTokens.length ? (
          <Box width="50%">
            <MenuSelect
              label="Select vault asset for operation"
              data={
                deployedProxyHtsTokens.map((item) => ({
                  value: item,
                  label: deployedHtsTokenNames[item],
                })) as unknown as GroupBase<string | number>[]
              }
              onTokenSelect={(address) => {
                setVaultAssetSelected(address as EvmAddress);
              }}
            />
          </Box>
        ) : (
          <Text fontSize={14}>No deployed HTS token addresses found</Text>
        )}

        {vaultAssetSelected && (
          <>
            <Divider my={5} />
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
                    const vaultItem = deployedVaults.find(
                      (itemSub) => itemSub?.["args"]?.[0] === value,
                    );
                    setVaultSelected(vaultItem?.["args"]?.[0]);
                  }}
                />
              </Box>
            ) : (
              <Text fontSize={14} fontWeight="600">
                You need to deploy new vault in Admin Area
              </Text>
            )}
          </>
        )}
      </Stack>

      {vaultSelected && (
        <>
          <Divider my={5} />
          <Tabs>
            <TabList>
              <Tab>Vault info</Tab>
              <Tab>Vault performance & rewards</Tab>
              <Tab>Vault mint</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <VaultTabSection vaultSelected={vaultSelected}>
                  <VaultInfo vaultAddress={vaultSelected} />
                </VaultTabSection>
              </TabPanel>
              <TabPanel>
                <VaultTabSection vaultSelected={vaultSelected}>
                  <Flex direction="column" gap="2" pt="2">
                    <Heading fontWeight="800" size="md">
                      Manage vault rewards
                    </Heading>
                    <VaultAssociate vaultAddress={vaultSelected} />
                    <VaultClaimAllReward vaultAddress={vaultSelected} />
                    <VaultAddReward vaultAddress={vaultSelected} />
                  </Flex>
                </VaultTabSection>
              </TabPanel>
              <TabPanel>
                <MintAssetToken
                  vaultAssetSelected={vaultAssetSelected}
                  vaultAssetSelectedName={
                    deployedHtsTokenNames[vaultAssetSelected]
                  }
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
    </>
  );
}
