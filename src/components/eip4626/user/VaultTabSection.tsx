import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { VaultDepositWithdraw } from "./VaultDepositWithdraw";

export type VaultTabSection = "vaultPerformance" | "vaultInfo" | "vaultMint";

export const vaultTabSections = ["vaultMint", "vaultInfo", "vaultPerformance"];

type Props = {
  vaultSelected: `0x${string}`;
  children: React.ReactElement;
};

export const VaultTabSection = ({ vaultSelected, children }: Props) => {
  const [amountExcessError, setAmountExcessError] = useState(false);

  return (
    <Flex direction="row" width="100%" gap="4">
      <Box width="64%" pb="2" pr="4">
        {children}
      </Box>
      <Box
        width="36%"
        maxHeight={amountExcessError ? "400px" : "300px"}
        p="2"
        style={{ boxShadow: "1px 2px 2px ButtonFace" }}
      >
        <VaultDepositWithdraw
          vaultAddress={vaultSelected}
          toggleError={(isError) => setAmountExcessError(isError)}
          error={amountExcessError}
        />
      </Box>
    </Flex>
  );
};
