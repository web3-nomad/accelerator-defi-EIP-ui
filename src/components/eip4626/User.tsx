import { useState, useContext } from "react";
import {
  Divider,
  Stack,
  Text,
  Box,
  Link,
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
import { VaultAddReward } from "./user/VaultAddReward";
import { VaultTabSection, vaultTabSections } from "./user/VaultTabSection";

export default function User() {
  const [vaultSelected, setVaultSelected] = useState("" as EvmAddress);
  const [vaultAssetSelected] = useState("" as EvmAddress);

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

  const userVaultSectionTabs = {
    vaultInfo: {
      title: "Vault info",
      _render: () => (
        <VaultTabSection vaultSelected={vaultSelected}>
          <VaultInfo vaultAddress={vaultSelected} />
        </VaultTabSection>
      ),
    },
    vaultPerformance: {
      title: "Vault performance",
      _render: () => (
        <VaultTabSection vaultSelected={vaultSelected}>
          <Flex direction="column" gap="2" pt="2">
            <Heading fontWeight="800" size="md">
              Manage vault rewards
            </Heading>
            <Divider my={2} />
            <VaultAssociate vaultAddress={vaultSelected} />
            <VaultClaimAllReward vaultAddress={vaultSelected} />
            <VaultAddReward vaultAddress={vaultSelected} />
          </Flex>
        </VaultTabSection>
      ),
    },
  };

  return (
    <>
      <Stack align="center" py="5">
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
              onTokenSelect={(value) => {
                setVaultSelected(value as EvmAddress);
              }}
            />
          </Box>
        ) : (
          <Box>
            <Text>No deployed HTS token addresses found</Text>
          </Box>
        )}
        <MintAssetToken
          vaultAssetSelected={vaultAssetSelected}
          vaultAssetSelectedName={deployedHtsTokenNames[vaultAssetSelected]}
        />

        {!!vaultAssetSelected && (
          <>
            <Divider mt={8} />
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
              <Box>
                <Text>
                  Deploy new vault in <Link onClick={() => null}>Admin</Link>{" "}
                  area
                </Text>
              </Box>
            )}
          </>
        )}
      </Stack>

      {!!vaultSelected && (
        <>
          <Divider mt="8" />
          <Tabs>
            <TabList>
              {vaultTabSections.map((tab) => (
                <Tab key={tab}>
                  {userVaultSectionTabs[tab as VaultTabSection].title}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {vaultTabSections.map((tab) => (
                <TabPanel key={tab}>
                  {userVaultSectionTabs[tab as VaultTabSection]._render()}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </>
      )}
    </>
  );
}
