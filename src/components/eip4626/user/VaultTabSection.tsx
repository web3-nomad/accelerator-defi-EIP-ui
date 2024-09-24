import { Box, Flex } from "@chakra-ui/react";
import { VaultBasicOperations } from "./VaultBasicOperations";
import type { EvmAddress } from "@/types/types";

export type VaultTabSection = "vaultPerformance" | "vaultInfo" | "vaultMint";

export const vaultTabSections = ["vaultMint", "vaultInfo", "vaultPerformance"];

type Props = {
  vaultSelected: EvmAddress;
  children: React.ReactElement;
};

export const VaultTabSection = ({ vaultSelected, children }: Props) => {
  return (
    <Flex direction="row" width="100%" gap="4">
      <Box width="64%" pb="2" pr="4">
        {children}
      </Box>
      <Box width="36%" p="2" style={{ boxShadow: "1px 2px 2px ButtonFace" }}>
        <VaultBasicOperations vaultAddress={vaultSelected} />
      </Box>
    </Flex>
  );
};
