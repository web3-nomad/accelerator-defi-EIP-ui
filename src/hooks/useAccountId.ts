import { useEffect, useState, useCallback, SetStateAction } from "react";
import { AccountId } from "@hashgraph/sdk";
import { hashConnectWallet } from "@/services/wallets/hashconnect/hashconnectClient";

type FormValues = { [key: string]: string };

export function useAccountId<T>(
  setValues: SetStateAction<any>,
  values: T,
  columnName: string,
) {
  const [hederaAccountIdError, setHederaAccountIdError] = useState(false);

  const handleAddressValueChange = useCallback(async () => {
    const address = (values as FormValues)[columnName];

    if (address && /([0-9][.][0-9][.][0-9])/.test(address)) {
      try {
        const evmAddress = await hashConnectWallet.getEvmAccountAddress(
          AccountId.fromString(address),
        );
        if (!evmAddress) {
          setHederaAccountIdError(true);
          setValues((prev: object) => ({
            ...prev,
            [columnName]: "",
          }));
        } else {
          setHederaAccountIdError(false);
          setValues((prev: object) => ({
            ...prev,
            [columnName]: evmAddress,
          }));
        }
      } catch (err) {
        setHederaAccountIdError(true);
        setValues((prev: object) => ({
          ...prev,
          [columnName]: "",
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(values as FormValues)[columnName]]);

  useEffect(() => {
    handleAddressValueChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(values as FormValues)[columnName], handleAddressValueChange]);

  return { hederaAccountIdError };
}
