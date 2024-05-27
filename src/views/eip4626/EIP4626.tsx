import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import Admin from "@/components/eip4626/Admin";
import User from "@/components/eip4626/User";
import NoWalletConnected from "@/components/NoWalletConnected";
import { WatchContractEventReturnType } from "@/services/contracts/watchContractEvent";
import { useContext, useEffect } from "react";
import { Eip4626Context } from "@/contexts/Eip4626Context";
import { watchVaultFactoryVaultDeployedEvent } from "../../services/contracts/wagmiGenActions";

export default function EIP4626() {
  const { accountId } = useWalletInterface();
  const { setDeployedVaults } = useContext(Eip4626Context);

  useEffect(() => {
    const unsub: WatchContractEventReturnType =
      watchVaultFactoryVaultDeployedEvent({
        onLogs: (data) => {
          setDeployedVaults(((prev: any) => {
            return [...prev, ...data];
          }) as any);
        },
      });
    return () => {
      unsub();
    };
  }, [setDeployedVaults]);

  if (!accountId) return <NoWalletConnected />;

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>User Area</Tab>
          <Tab>Admin Area</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <User />
          </TabPanel>
          <TabPanel>
            <Admin />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
