import {
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { EvmAddress } from "@/types/types";
import { VaultDepositForm } from "./VaultDepositForm";
import { VaultWithdrawForm } from "./VaultWithdrawForm";

type Props = {
  vaultAddress: EvmAddress;
};

export const VaultBasicOperations = ({ vaultAddress }: Props) => {
  return (
    <Tabs>
      <TabList gap="5">
        <Tab>
          <Text fontWeight="800">Withdraw</Text>
        </Tab>
        <Tab>
          <Text fontWeight="800">Deposit</Text>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <VaultWithdrawForm vaultAddress={vaultAddress} />
        </TabPanel>
        <TabPanel>
          <VaultDepositForm vaultAddress={vaultAddress} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
