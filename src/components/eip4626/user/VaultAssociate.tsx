import { VaultInfoProps } from "@/types/types";
import { AssociateToken } from "@/components/eip4626/user/AssociateToken";
import { useReadHederaVaultAsset } from "@/hooks/eip4626/useReadHederaVaultAsset";
import { Divider, Heading } from "@chakra-ui/react";
import { TokenId } from "@hashgraph/sdk";
import { useReadHederaVaultShare } from "@/hooks/eip4626/useReadHederaVaultShare";

export function VaultAssociate({ vaultAddress }: VaultInfoProps) {
  const { data: vaultAssetAddress } = useReadHederaVaultAsset(vaultAddress);
  const { data: vaultShareAddress } = useReadHederaVaultShare(vaultAddress);

  if (!vaultAssetAddress || !vaultShareAddress) return <></>;

  return (
    <>
      <Heading size={"md"}>Step 1</Heading>
      <Heading size={"sm"}>Associate vault asset token</Heading>
      <Heading size={"sm"}>EVM {vaultAssetAddress}</Heading>{" "}
      <Heading size={"sm"}>
        Hedera{" "}
        {TokenId.fromSolidityAddress(String(vaultAssetAddress)).toString()}
      </Heading>
      <AssociateToken tokenAddress={vaultAssetAddress} />
      <Divider my={10} />
      <Heading size={"md"}>Step 2</Heading>
      <Heading size={"sm"}>Associate vault share token</Heading>
      <Heading size={"sm"}>EVM {vaultShareAddress}</Heading>{" "}
      <Heading size={"sm"}>
        Hedera{" "}
        {TokenId.fromSolidityAddress(String(vaultShareAddress)).toString()}
      </Heading>
      <AssociateToken tokenAddress={vaultShareAddress} />
    </>
  );
}
