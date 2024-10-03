import { Text, Flex } from "@chakra-ui/react";

export function VaultFeesInfo({
  fees,
}: {
  fees?: {
    vaultFeeReceiver: string;
    vaultFeePercentageFormatted: number;
    vaultFeeTokenAddress: string;
  };
}) {
  return (
    fees && (
      <>
        {fees.vaultFeeReceiver && (
          <Flex direction="row" gap="1" justify="space-between">
            <Text fontSize={14} fontWeight="800" width="45%">
              Vault fee receiver address
            </Text>
            <Text fontSize={14} width="64%">
              {fees.vaultFeeReceiver}
            </Text>
          </Flex>
        )}
        {fees.vaultFeePercentageFormatted && (
          <Flex direction="row" gap="1" justify="space-between">
            <Text fontSize={14} fontWeight="800" width="45%">
              Vault fee percentage
            </Text>
            <Text fontSize={14} width="64%">
              {fees.vaultFeePercentageFormatted}%
            </Text>
          </Flex>
        )}
        {fees.vaultFeeTokenAddress && (
          <Flex direction="row" gap="1" justify="space-between">
            <Text fontSize={14} fontWeight="800" width="45%">
              Vault fee token address
            </Text>
            <Text fontSize={14} width="64%">
              {fees.vaultFeeTokenAddress}
            </Text>
          </Flex>
        )}
      </>
    )
  );
}
