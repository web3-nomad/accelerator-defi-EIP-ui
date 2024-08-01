import { useContext, useEffect } from "react";
import { WatchContractEventReturnType } from "viem";
import { watchTrexFactoryTrexSuiteDeployedEvent } from "@/services/contracts/wagmiGenActions";
import { Eip3643Context } from "@/contexts/Eip3643Context";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { ManageTokensList } from "@/components/ManageIdentitiesList";

export default function ManageIdentities() {
  const { setDeployedTokens } = useContext(Eip3643Context);
  const { accountId } = useWalletInterface();

  useEffect(() => {
    const unsubTokens: WatchContractEventReturnType =
      watchTrexFactoryTrexSuiteDeployedEvent({
        onLogs: (data) => {
          setDeployedTokens(((prev: any) => {
            return [...prev, ...data];
          }) as any);
        },
      });
    return () => {
      unsubTokens();
    };
  }, [setDeployedTokens]);

  if (!accountId) return <></>;

  return <ManageTokensList />;
}
