import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import MeaningOfLife from "@/components/eip3643/user/MeaningOfLife";
import TransferHBAR from "@/components/eip3643/user/TransferHBAR";
import TransferFungibleToken from "@/components/eip3643/user/TransferFungibleToken";
import BalanceOfERC20 from "@/components/eip3643/user/BalanceOfERC20";

export default function EIP3643() {
  const { accountId, walletName, walletInterface } = useWalletInterface();

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
      <Text
        fontSize="22px"
        fontWeight="700"
        lineHeight="16px"
        mt="16px"
        mb="16px"
      >
        Operations for {accountId} via {walletName}
      </Text>
      <Tabs>
        <TabList>
          <Tab>User Area</Tab>
          <Tab>Admin Area</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <MeaningOfLife />
            <Divider my={10} />
            <BalanceOfERC20 />
            <Divider my={10} />
            <TransferHBAR />
            <Divider my={10} />
            <TransferFungibleToken />
            <Divider my={10} />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
