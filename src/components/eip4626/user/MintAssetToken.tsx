import { useReadHtsTokenTokenAddress } from "@/hooks/eip4626/useReadHtsTokenTokenAddress";
import { useWriteHtsTokenAssociate } from "@/hooks/eip4626/mutations/useWriteHtsTokenAssociate";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Text,
} from "@chakra-ui/react";
import { EvmAddress, VaultMintTokenProps } from "@/types/types";
import { useWriteHtsTokenMint } from "@/hooks/eip4626/mutations/useWriteHtsTokenMint";

export function MintAssetToken({ vaultAssetSelected }: VaultMintTokenProps) {
  //@TODO add readTokenName to show vault asset token names
  const { data: deployedHtsTokensAddress } =
    useReadHtsTokenTokenAddress(vaultAssetSelected);

  const {
    data: associateResult,
    mutateAsync: associate,
    error: associateError,
    isPending: isAssociatePending,
  } = useWriteHtsTokenAssociate();

  const {
    data: mintResult,
    mutateAsync: mint,
    error: mintError,
    isPending: isMintPending,
  } = useWriteHtsTokenMint();

  return (
    <>
      {deployedHtsTokensAddress && (
        <>
          <Text>HTS Token CA: {deployedHtsTokensAddress}</Text>
          <Text>HTS Token Proxy CA: {vaultAssetSelected}</Text>
          <Button
            onClick={() =>
              associate({
                tokenAddress:
                  deployedHtsTokensAddress?.toString() as EvmAddress,
              })
            }
          >
            Associate
          </Button>
          <Button
            onClick={() =>
              mint({
                tokenAddress: vaultAssetSelected,
              })
            }
          >
            Mint 1000 tokens
          </Button>
        </>
      )}
      {associateError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Associate token error!</AlertTitle>
          <AlertDescription>{associateError.toString()}</AlertDescription>
        </Alert>
      )}
      {mintError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Mint token error!</AlertTitle>
          <AlertDescription>{mintError.toString()}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
