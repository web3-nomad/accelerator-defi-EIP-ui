import {
  tokenBalancerAddress,
  watchTokenBalancerTokenAddedEvent,
  writeTokenBalancerAddTrackingToken,
  writeTokenBalancerRebalance,
  writeTokenBalancerSetAllocationPercentage,
} from "@/services/contracts/wagmiGenActions";
import { EvmAddress } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { WalletInterface } from "@/services/wallets/walletInterface";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useState, useEffect } from "react";
import { WatchContractEventReturnType } from "viem";

export const useTokenRebalancer = () => {
  const [addedTokens, setAddedTokens] = useState<EvmAddress[]>([]);
  const { walletInterface } = useWalletInterface();

  useEffect(() => {
    const unsub: WatchContractEventReturnType =
      watchTokenBalancerTokenAddedEvent({
        onLogs: (data) => {
          setAddedTokens((prev: any) => {
            return [...(prev || []), ...data.map(({ args }) => args.token)];
          });
        },
      });

    return () => {
      unsub();
    };
  }, []);

  const {
    mutateAsync: mutateRebalance,
    isSuccess: isRebalanceSuccess,
    isError: isRebalanceError,
    isPending: isRebalancePending,
    error: rebalanceError,
    data: rebalanceData,
  } = useMutation({
    mutationFn: () =>
      writeTokenBalancerRebalance(
        walletInterface as WalletInterface,
        { args: [] },
        tokenBalancerAddress,
      ),
  });

  const {
    mutateAsync: mutateAddTrackingToken,
    isPending: isAddTrackingTokenPending,
    isError: isAddTrackingTokenError,
    isSuccess: isAddTrackingTokenSuccess,
    error: addTrackingTokenError,
    data: addTrackingTokenData,
  } = useMutation({
    mutationFn: async ({
      token,
      priceId,
      percentage,
      isAutoCompaunder,
    }: {
      token: EvmAddress;
      priceId: string;
      percentage: number;
      isAutoCompaunder: boolean;
    }) =>
      writeTokenBalancerAddTrackingToken(
        walletInterface as WalletInterface,
        {
          args: [
            token,
            priceId as EvmAddress,
            BigInt(percentage),
            isAutoCompaunder,
          ],
        },
        tokenBalancerAddress,
      ),
  });

  const {
    mutateAsync: mutateSetAllocationPercentage,
    isPending: isSetAllocationPercentagePending,
    isError: isSetAllocationPercentageError,
    isSuccess: isSetAllocationPercentageSuccess,
    error: setAllocationPercentageError,
    data: setAllocationPercentageData,
  } = useMutation({
    mutationFn: async ({
      token,
      percentage,
    }: {
      token: EvmAddress;
      percentage: number;
    }) =>
      writeTokenBalancerSetAllocationPercentage(
        walletInterface as WalletInterface,
        { args: [token, BigInt(percentage)] },
        tokenBalancerAddress,
      ),
  });

  return {
    mutateRebalance,
    mutateSetAllocationPercentage,
    mutateAddTrackingToken,
    addedTokens,
    txState: {
      isRebalancePending,
      isRebalanceError,
      isRebalanceSuccess,
      rebalanceError,
      rebalanceData,
      isAddTrackingTokenPending,
      isAddTrackingTokenError,
      isAddTrackingTokenSuccess,
      addTrackingTokenError,
      addTrackingTokenData,
      isSetAllocationPercentagePending,
      isSetAllocationPercentageError,
      isSetAllocationPercentageSuccess,
      setAllocationPercentageError,
      setAllocationPercentageData,
    },
  };
};
