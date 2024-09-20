import { Box, Flex } from "@chakra-ui/react";
import { VaultDepositWithdraw } from "./VaultDepositWithdraw";

export type VaultTabSection = "vaultPerformance" | "vaultInfo";

export const vaultTabSections = ["vaultInfo", "vaultPerformance"];

export const VaultTabSection = ({
  vaultSelected,
  children,
}: {
  vaultSelected: `0x${string}`;
  children: React.ReactElement;
}) => {
  return (
    <Flex direction="row" width="100%" gap="4">
      <Box width="64%" pb="2" pr="4">
        {children}
      </Box>
      <Box width="36%" p="2" style={{ boxShadow: "1px 2px 2px gray" }}>
        <VaultDepositWithdraw vaultAddress={vaultSelected} />
      </Box>
    </Flex>
  );
};
