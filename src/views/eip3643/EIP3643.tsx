import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Flex,
} from "@chakra-ui/react";
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

export default function EIP3643() {
  const { accountId } = useWalletInterface();
  const { setDeployedTokens, setIdentities } = useContext(Eip3643Context);

  useEffect(() => {
    const unsubTokens: WatchContractEventReturnType =
      watchTrexFactoryTrexSuiteDeployedEvent({
        onLogs: (data) => {
          setDeployedTokens(data as any);
        },
      });
    const unsubIdentities: WatchContractEventReturnType =
      watchIdFactoryWalletLinkedEvent({
        onLogs: (data: any) => {
          setIdentities(data);
        },
      });
    return () => {
      unsubTokens();
      unsubIdentities();
    };
  }, [setDeployedTokens, setIdentities]);

  if (!accountId)
    return (
      <Flex
        bgColor="white"
        w="100%"
        h="100%"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Text fontSize="22px" fontWeight="700" lineHeight="16px" mb="16px">
          Connect wallet to start operating!
        </Text>
      </Flex>
    );

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
