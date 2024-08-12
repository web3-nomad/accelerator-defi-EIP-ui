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

export default function EIP3643({
  onlyIdentities = false,
  children,
}: {
  onlyIdentities?: boolean;
  children?: JSX.Element;
}) {
  const { accountId } = useWalletInterface();
  const { setDeployedTokens, setIdentities } = useContext(Eip3643Context);

  useEffect(() => {
    const unsubTokens: WatchContractEventReturnType =
      watchTrexFactoryTrexSuiteDeployedEvent({
        onLogs: (data) => {
          setDeployedTokens(((prev: any) => {
            return [...prev, ...data];
          }) as any);
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

  if (onlyIdentities) {
    return children;
  }

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>User Area</Tab>
          <Tab>Admin Area</Tab>
          <Tab>Manage demo NFT</Tab>
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
        </TabPanels>
      </Tabs>
    </>
  );
}
