import { useEffect, useState, useCallback } from "react";
import { AccountId } from "@hashgraph/sdk";
import { convertAccountIdToEVMWallet } from "@/services/api/requests";

/**
 * To get the respective EVM address of the Hedera Account Id
 * we have to fetch it from the RPC
 *
 * @param value
 */
export function useAccountId(value?: string) {
  const [hederaAccountIdError, setHederaAccountIdError] = useState(false);
  const [hederaEVMAccount, setHederaEVMAccount] = useState("");

  const handleAddressValueChange = useCallback(async () => {
    if (value && /([0-9][.][0-9][.][0-9])/.test(value)) {
      try {
        const evmAddress = await convertAccountIdToEVMWallet(
          AccountId.fromString(value),
        );
        if (!evmAddress) {
          setHederaAccountIdError(true);
          setHederaEVMAccount("");
        } else {
          setHederaAccountIdError(false);
          setHederaEVMAccount(evmAddress);
        }
      } catch (err) {
        setHederaAccountIdError(true);
        setHederaEVMAccount("");
      }
    }
  }, [value]);

  useEffect(() => {
    handleAddressValueChange();
  }, [handleAddressValueChange]);

  return { hederaAccountIdError, hederaEVMAccount };
}
