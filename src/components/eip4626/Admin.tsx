import { Button, Divider, Select, Stack, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import DeployVault from "@/components/eip4626/admin/DeployVault";
import { Eip4626Context } from "@/contexts/Eip4626Context";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";

export default function Admin() {
  const [isDeploy, setIsDeploy] = useState(/*false*/ true);
  const [ownVaults, setOwnVaults] = useState([]);
  //const { accountEvm } = useWalletInterface();
  //const { deployedVaults } = useContext(Eip4626Context);
  const deployedVaults = [] as any[];

  useEffect(() => {
    (deployedVaults as any).map((item: any) => {
      console.log("item", item);
    });
  }, [deployedVaults]);

  return (
    <>
      {!isDeploy && (
        <Stack spacing={4} align="center">
          <Select
            placeholder="Select vault for operation"
            onChange={(item) => {
              // const tokenItem = ownTokens.find(
              //   (itemSub) => itemSub.address === item.target.value,
              // );
              // setTokenSelected(tokenItem || null);
            }}
            variant="outline"
          >
            {/* {ownTokens.map((item) => (
              <option key={item.address} value={item.address}>
                {item.name} [{item.address}]
              </option>
            ))} */}
          </Select>
          {!false /*vaultSelected*/ && (
            <>
              <Text>OR</Text>
              <Button onClick={() => setIsDeploy(true)}>
                Deploy new vault
              </Button>
            </>
          )}
        </Stack>
      )}
      {isDeploy && (
        /*!tokenSelected &&*/ <DeployVault onClose={() => setIsDeploy(false)} />
      )}
    </>
  );
}
