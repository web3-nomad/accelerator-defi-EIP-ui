import { EvmAddress } from "@/types/types";
import { useReadBalanceOf } from "@/hooks/useReadBalanceOf";
import { useReadTokenDecimals } from "@/hooks/eip4626/useReadTokenDecimals";
import { formatUnitsWithDecimals } from "@/services/util/helpers";
import { useMemo } from "react";

//@TODO add support for Hedera Token Id format
export function TokenBalance({ tokenAddress }: { tokenAddress: EvmAddress }) {
  const { data: tokenBalance, error: tokenBalanceError } =
    useReadBalanceOf(tokenAddress);

  const { data: tokenDecimals } = useReadTokenDecimals(tokenAddress);

  const tokenBalanceFormatted = useMemo(
    () => formatUnitsWithDecimals(tokenBalance, tokenDecimals),
    [tokenBalance, tokenDecimals],
  );

  return (
    <>
      {!tokenBalanceError ? (
        <>Token balance: {tokenBalanceFormatted}</>
      ) : (
        <>Loading token balance error: {tokenBalanceError}</>
      )}
    </>
  );
}
