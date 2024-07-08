import { useEffect, useState, useCallback } from "react";
import { AccountId } from "@hashgraph/sdk";
import { convertAccountIdToEVMWallet_RPC } from "@/services/util/helpers";

type FormValues = { [key: string]: string };

export function useAccountId<T>(values: T, columnName: string) {
  const [hederaAccountIdError, setHederaAccountIdError] = useState(false);
  const [hederaEVMAccount, setHederaEVMAccount] = useState<string>();

  const columnValue = (values as FormValues)[columnName];

  const handleAddressValueChange = useCallback(async () => {
    const address = columnValue;

    if (address && /([0-9][.][0-9][.][0-9])/.test(address)) {
      try {
        const evmAddress = await convertAccountIdToEVMWallet_RPC(
          AccountId.fromString(address),
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
  }, [columnValue]);

  useEffect(() => {
    handleAddressValueChange();
  }, [handleAddressValueChange]);

  return { hederaAccountIdError, hederaEVMAccount };
}
