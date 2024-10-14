import { getFiatCurrencyRate } from "@/services/util/helpers";
import { useEffect, useState } from "react";

export function useDeployValueSafeTx(
  currencyName: string,
  fiatCurrencyName: string,
  initialAmountInFiat: number,
  txSubmitError?: boolean,
) {
  const [tokenRate, setTokenRate] = useState<number>();
  const [currentDeployValue, setCurrentDeployValue] = useState<number>();

  useEffect(() => {
    if (txSubmitError) {
      setCurrentDeployValue((prev) => (prev ?? 0) + 1);
    }
  }, [txSubmitError]);

  useEffect(() => {
    getFiatCurrencyRate([currencyName], [fiatCurrencyName]).then(
      (rateResponse) => {
        rateResponse.json().then((rateData) => {
          const newRate = rateData[currencyName][fiatCurrencyName];

          setTokenRate(newRate);
          setCurrentDeployValue(newRate && initialAmountInFiat / newRate);
        });
      },
    );
  }, [
    currencyName,
    fiatCurrencyName,
    initialAmountInFiat,
    setTokenRate,
    setCurrentDeployValue,
  ]);

  return { currentDeployValue, tokenRate };
}
