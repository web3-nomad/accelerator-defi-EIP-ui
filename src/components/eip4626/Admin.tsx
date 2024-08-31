import { Button, Divider, Select, Stack, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import DeployVault from "@/components/eip4626/admin/DeployVault";
import UpdateFeeConfig from "@/components/eip4626/admin/UpdateFeeConfig";
import { Eip4626Context } from "@/contexts/Eip4626Context";
import { VaultNameItem } from "@/types/types";
import { readHederaVaultOwner } from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { MenuSelect } from "@/components/MenuSelect";

export default function Admin() {
  const { accountEvm } = useWalletInterface();
  const [isDeploy, setIsDeploy] = useState(false);
  const [ownVaults, setOwnVaults] = useState([] as Array<VaultNameItem>);
  const [vaultSelected, setVaultSelected] = useState(
    null as VaultNameItem | null,
  );
  const { deployedVaults } = useContext(Eip4626Context);

  useEffect(() => {
    (deployedVaults as any).map((item: any) => {
      const vaultAddress = item["args"]?.[0];
      vaultAddress &&
        readHederaVaultOwner({}, vaultAddress).then((res) => {
          res[0].toString().toLowerCase() === accountEvm?.toLowerCase() &&
            setOwnVaults((prev) => {
              return [
                ...prev.filter((itemSub) => itemSub.address !== vaultAddress),
                {
                  address: vaultAddress,
                  shareTokenName: item["args"]?.[1],
                  shareTokenSymbol: item["args"]?.[2],
                },
              ];
            });
        });
    });
  }, [accountEvm, deployedVaults]);

  return (
    <>
      {!isDeploy && (
        <Stack spacing={4} align="center">
          <MenuSelect
            label="Select vault for operation"
            data={ownVaults.map((item) => ({
              value: item.address,
              label: item.shareTokenName,
            }))}
            onTokenSelect={(value) => {
              const vaultItem = ownVaults.find(
                (itemSub) => itemSub.address === value,
              );
              setVaultSelected(vaultItem || null);
            }}
          />
          {!vaultSelected && (
            <>
              <Text>OR</Text>
              <Button onClick={() => setIsDeploy(true)}>
                Deploy new vault
              </Button>
            </>
          )}
        </Stack>
      )}
      {isDeploy && !vaultSelected && (
        <DeployVault onClose={() => setIsDeploy(false)} />
      )}
      {vaultSelected && (
        <>
          <Text>Vault CA: {vaultSelected.address}</Text>
          <Divider my={10} />
          <UpdateFeeConfig
            vaultSelected={vaultSelected}
            resetSelectedVault={() => setVaultSelected(null)}
          ></UpdateFeeConfig>
        </>
      )}
    </>
  );
}
