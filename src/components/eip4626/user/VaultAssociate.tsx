import { VaultInfoProps } from "@/types/types";
import { AssociateToken } from "@/components/eip4626/user/AssociateToken";
import { useReadHederaVaultAsset } from "@/hooks/eip4626/useReadHederaVaultAsset";
import { Divider, Heading, Text } from "@chakra-ui/react";
import { TokenId } from "@hashgraph/sdk";
import { useReadHederaVaultShare } from "@/hooks/eip4626/useReadHederaVaultShare";

export function VaultAssociate({ vaultAddress }: VaultInfoProps) {
  const { data: vaultAssetAddress } = useReadHederaVaultAsset(vaultAddress);
  const { data: vaultShareAddress } = useReadHederaVaultShare(vaultAddress);

  return (
    !!vaultAssetAddress &&
    !!vaultShareAddress && (
      <>
        <Divider my={2} />
        <Heading size="sm" fontWeight="800" backgroundColor="ButtonFace" p="2">
          Step 1
        </Heading>
        <Text fontSize={14} fontWeight="800">
          Associate vault asset token
        </Text>
        <Text fontSize={14}>EVM {vaultAssetAddress}</Text>{" "}
        <Text fontSize={14}>
          Hedera{" "}
          {TokenId.fromSolidityAddress(String(vaultAssetAddress)).toString()}
        </Text>
        <AssociateToken tokenAddress={vaultAssetAddress} />
        <Divider mt={5} mb={3} />
        <Heading size="sm" fontWeight="800" backgroundColor="ButtonFace" p="2">
          Step 2
        </Heading>
        <Text fontSize={14} fontWeight="800">
          Associate vault share token
        </Text>
        <Text fontSize={14}>EVM {vaultShareAddress}</Text>{" "}
        <Text fontSize={14}>
          Hedera{" "}
          {TokenId.fromSolidityAddress(String(vaultShareAddress)).toString()}
        </Text>
        <AssociateToken tokenAddress={vaultShareAddress} />
      </>
    )
  );
}
