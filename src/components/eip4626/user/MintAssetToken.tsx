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
import {
  DEFAULT_TOKEN_MINT_AMOUNT,
  useWriteHtsTokenMint,
} from "@/hooks/eip4626/mutations/useWriteHtsTokenMint";
import { useReadTokenDecimals } from "@/hooks/eip4626/useReadTokenDecimals";
import { formatNumberToBigint } from "@/services/util/helpers";
import { useReadBalanceOf } from "@/hooks/useReadBalanceOf";
import { useAccountTokens } from "@/hooks/useAccountTokens";
import { useEffect, useState } from "react";
import { AccountId } from "@hashgraph/sdk";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/hooks/types";

export function MintAssetToken({ vaultAssetSelected }: VaultMintTokenProps) {
  const queryClient = useQueryClient();

  //@TODO add readTokenName to show vault asset token names
  const { data: deployedHtsTokensAddress } =
    useReadHtsTokenTokenAddress(vaultAssetSelected);

  const { data: vaultAssetSelectedDecimals } = useReadTokenDecimals(
    deployedHtsTokensAddress,
  );

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

  const { data: tokenBalance, error: tokenBalanceError } = useReadBalanceOf(
    deployedHtsTokensAddress as `0x${string}`,
  );

  console.log("L60 tokenBalance ===", tokenBalance);

  const {
    data: accountTokens,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useAccountTokens();

  useEffect(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [accountTokens, fetchNextPage, hasNextPage, isFetching]);

  const [tokenHasAssociation, setTokenHasAssociation] = useState(false);
  useEffect(() => {
    if (deployedHtsTokensAddress && accountTokens) {
      let deployedTokenLowercase = deployedHtsTokensAddress.toLowerCase();
      let result = accountTokens.some((token) => {
        let tokenSolidityAddress = AccountId.fromString(
          token.token_id,
        ).toSolidityAddress();

        return `0x${tokenSolidityAddress}` === deployedTokenLowercase;
      });

      setTokenHasAssociation(result);
    }
  }, [accountTokens, deployedHtsTokensAddress]);

  return (
    <>
      {deployedHtsTokensAddress && (
        <>
          <Text>HTS Token CA: {deployedHtsTokensAddress}</Text>
          <Text>HTS Token Proxy CA: {vaultAssetSelected}</Text>
          <Button
            isLoading={isAssociatePending}
            isDisabled={tokenHasAssociation}
            onClick={() =>
              associate(
                {
                  tokenAddress:
                    deployedHtsTokensAddress?.toString() as EvmAddress,
                },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                      queryKey: [QueryKeys.ReadAccountTokens],
                    });
                  },
                },
              )
            }
          >
            Associate
          </Button>
          <Button
            isLoading={isMintPending}
            onClick={() =>
              mint({
                tokenAddress: vaultAssetSelected,
                mintAmount: formatNumberToBigint(
                  DEFAULT_TOKEN_MINT_AMOUNT,
                  vaultAssetSelectedDecimals,
                ),
              })
            }
          >
            Mint {DEFAULT_TOKEN_MINT_AMOUNT} tokens
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
