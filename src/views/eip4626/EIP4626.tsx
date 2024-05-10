import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import Admin from "@/components/eip4626/Admin";
import User from "@/components/eip4626/User";
import NoWalletConnected from "@/components/NoWalletConnected";

export default function EIP4626() {
  const { accountId } = useWalletInterface();

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
