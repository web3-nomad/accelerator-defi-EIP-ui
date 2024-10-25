import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { Eip3643Context } from "@/contexts/Eip3643Context";
import Admin from "@/components/eip3643/Admin";
import User from "@/components/eip3643/User";
import { useContext, useEffect } from "react";
import {
  watchIdFactoryWalletLinkedEvent,
  watchTrexFactoryTrexSuiteDeployedEvent,
} from "@/services/contracts/wagmiGenActions";
import { WatchContractEventReturnType } from "viem";
import NoWalletConnected from "@/components/NoWalletConnected";
import NFT from "@/components/eip3643/NFT";
import { ManageRegistry } from "@/components/manage-registry/ManageRegistry";
import { EvmAddress } from "@/types/types";

export default function EIP3643() {
  const { accountId } = useWalletInterface();
  const { setDeployedTokens, setIdentities, identities } =
    useContext(Eip3643Context);

  useEffect(() => {
    const unsubTokens: WatchContractEventReturnType =
      watchTrexFactoryTrexSuiteDeployedEvent({
        onLogs: (data) => {
          setDeployedTokens((prev) => {
            return [
              ...prev,
              ...data
                .map(({ args }) => args._token)
                .filter((token): token is EvmAddress => token !== undefined),
            ];
          });
        },
      });
    const unsubIdentities: WatchContractEventReturnType =
      watchIdFactoryWalletLinkedEvent({
        onLogs: (data: any) => {
          setIdentities(((prev: any) => {
            return [...prev, ...data];
          }) as any);
        },
      });
    return () => {
      unsubTokens();
      unsubIdentities();
    };
  }, [setDeployedTokens, setIdentities]);

  if (!accountId) return <NoWalletConnected />;

  return (
    <>
      <Tabs isLazy>
        <TabList>
          <Tab>User Area</Tab>
          <Tab>Admin Area</Tab>
          <Tab>Manage demo NFT</Tab>
          <Tab>Manage identities</Tab>
          <Tab>Manage agents</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <User />
          </TabPanel>
          <TabPanel>
            <Admin />
          </TabPanel>
          <TabPanel>
            <NFT />
          </TabPanel>
          <TabPanel>{/*<ManageRegistry isAgents={false} />*/}</TabPanel>
          <TabPanel>{/*<ManageRegistry isAgents />*/}</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
