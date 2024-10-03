import {
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { EvmAddress } from "@/types/types";
import { VaultDeposit } from "@/components/eip4626/user/VaultDeposit";
import { VaultWithdraw } from "@/components/eip4626/user/VaultWithdraw";

type VaultBasicOperationsProps = {
  vaultAddress: EvmAddress;
};

export const VaultBasicOperations = ({
  vaultAddress,
}: VaultBasicOperationsProps) => {
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
          <VaultWithdraw vaultAddress={vaultAddress} />
        </TabPanel>
        <TabPanel>
          <VaultDeposit vaultAddress={vaultAddress} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
