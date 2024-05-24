import { Button, Select, Stack, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import DeployVault from "@/components/eip4626/admin/DeployVault";
import { Eip4626Context } from "@/contexts/Eip4626Context";
import { VaultNameItem } from "../../types/types";

export default function Admin() {
  const [isDeploy, setIsDeploy] = useState(false);
  const [ownVaults, setOwnVaults] = useState([] as Array<VaultNameItem>);
  const [vaultSelected, setVaultSelected] = useState(
    null as VaultNameItem | null,
  );
  const { deployedVaults } = useContext(Eip4626Context);

  useEffect(() => {
    (deployedVaults as any).map((item: any) => {
      console.log("vault event args", item["args"]);
      const vaultAddress = item["args"]?.[0];
      vaultAddress &&
        setOwnVaults((prev) => {
          return [
            ...prev.filter((itemSub) => itemSub.address !== vaultAddress),
            {
              address: vaultAddress,
              shareTokenName: item["args"]?.[1],
              shareTokenSymbol: item["args"]?.[1],
            },
          ];
        });
    });
  }, [deployedVaults]);

  return (
    <>
      {!isDeploy && (
        <Stack spacing={4} align="center">
          <Select
            placeholder="Select vault for operation"
            onChange={(item) => {
              const vaultItem = ownVaults.find(
                (itemSub) => itemSub.address === item.target.value,
              );
              setVaultSelected(vaultItem || null);
            }}
            variant="outline"
          >
            {ownVaults.map((item) => (
              <option key={item.address} value={item.address}>
                {item.shareTokenName} ({item.shareTokenSymbol}) [{item.address}]
              </option>
            ))}
          </Select>
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
    </>
  );
}
