import { getFiatCurrencyRate } from "@/services/util/helpers";
import { useCallback, useEffect, useState } from "react";

export function useDeployValueSafeTx(
  currencyName: string,
  fiatCurrencyName: string,
  initialFiatAmount: number,
  txSubmitError?: boolean,
) {
  const [tokenRate, setTokenRate] = useState<number>();
  const [currentDeployValue, setCurrentDeployValue] = useState<number>(0);
  const [currentDeployValueParsed, setCurrentDeployValueParsed] = useState("0");

  useEffect(() => {
    setCurrentDeployValueParsed(() =>
      Math.ceil(currentDeployValue ?? 0)?.toString(),
    );
  }, [currentDeployValue]);

  useEffect(() => {
    if (txSubmitError) {
      setCurrentDeployValue((prev) => (prev ?? 0) + 1);
    }
  }, [txSubmitError]);

  const getDeployValueFromRate = useCallback(async () => {
    const response = await getFiatCurrencyRate(currencyName, fiatCurrencyName);
    const responseData = await response.json();
    const newRateValue = responseData[currencyName][fiatCurrencyName];

    setTokenRate(newRateValue);
    setCurrentDeployValue(newRateValue && initialFiatAmount / newRateValue);
  }, [currencyName, fiatCurrencyName, initialFiatAmount]);

  useEffect(() => {
    getDeployValueFromRate();
  }, [getDeployValueFromRate]);

  return { currentDeployValue, currentDeployValueParsed, tokenRate };
}
