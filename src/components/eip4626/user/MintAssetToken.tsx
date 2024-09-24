import { useWriteHtsTokenAssociate } from "@/hooks/eip4626/mutations/useWriteHtsTokenAssociate";
import { Button, Text, Heading, Flex, Divider } from "@chakra-ui/react";
import { EvmAddress, VaultMintTokenProps } from "@/types/types";
import {
  DEFAULT_TOKEN_MINT_AMOUNT,
  useWriteHtsTokenMint,
} from "@/hooks/eip4626/mutations/useWriteHtsTokenMint";
import { useReadTokenDecimals } from "@/hooks/eip4626/useReadTokenDecimals";
import { formatBalance, formatNumberToBigint } from "@/services/util/helpers";
import { useReadBalanceOf } from "@/hooks/useReadBalanceOf";
import { useAccountTokens } from "@/hooks/useAccountTokens";
import { useEffect, useState } from "react";
import { AccountId } from "@hashgraph/sdk";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/hooks/types";
import { useReadHtsTokenTokenAddress } from "@/hooks/eip4626/useReadHtsTokenTokenAddress";
import { TransactionResult } from "@/components/TransactionResult";

export function MintAssetToken({
  vaultAssetSelected,
  vaultAssetSelectedName,
}: VaultMintTokenProps) {
  const queryClient = useQueryClient();

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

  const { data: tokenBalance } = useReadBalanceOf(
    deployedHtsTokensAddress as EvmAddress,
  );

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
  }, [fetchNextPage, hasNextPage, isFetching]);

  const [tokenHasAssociation, setTokenHasAssociation] = useState(false);
  useEffect(() => {
    if (deployedHtsTokensAddress && accountTokens) {
      let deployedTokenLowercase = deployedHtsTokensAddress.toLowerCase();
      let result = accountTokens.some((token) => {
        if (!token) return false;
        let tokenSolidityAddress = AccountId.fromString(
          token.token_id,
        ).toSolidityAddress();

        return `0x${tokenSolidityAddress}` === deployedTokenLowercase;
      });

      setTokenHasAssociation(result);
    }
  }, [accountTokens, deployedHtsTokensAddress, setTokenHasAssociation]);

  return (
    <>
      {deployedHtsTokensAddress && (
        <Flex direction="column" gap="2" mt="2">
          <Heading fontWeight="800" size="md">
            Vault mint tokens
          </Heading>
          <Divider my={2} />
          <Text fontWeight="600" fontSize={14}>
            HTS Token CA: {deployedHtsTokensAddress}
          </Text>
          <Text fontSize={14}>HTS Token name: {vaultAssetSelectedName}</Text>
          <Text fontSize={14}>
            User balance of token:{" "}
            {`${formatBalance(tokenBalance, vaultAssetSelectedDecimals)}`}
          </Text>
          <Text fontSize={14}>HTS Token Proxy CA: {vaultAssetSelected}</Text>
          <Flex direction="row" gap="2">
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
              {tokenHasAssociation ? `Token already associated` : `Associate`}
            </Button>
            <Button
              isLoading={isMintPending}
              onClick={() =>
                mint(
                  {
                    tokenAddress: vaultAssetSelected,
                    mintAmount: formatNumberToBigint(
                      DEFAULT_TOKEN_MINT_AMOUNT,
                      vaultAssetSelectedDecimals,
                    ),
                  },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        queryKey: [QueryKeys.ReadBalanceOf],
                      });
                    },
                  },
                )
              }
            >
              Mint {DEFAULT_TOKEN_MINT_AMOUNT} tokens
            </Button>
          </Flex>
        </Flex>
      )}

      <TransactionResult
        actionType="Associate"
        transactionResult={associateResult}
        transactionError={associateError}
      />
      <TransactionResult
        actionType="Mint"
        transactionResult={mintResult}
        transactionError={mintError}
      />
    </>
  );
}
