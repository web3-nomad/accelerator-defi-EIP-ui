import { getFiatCurrencyRate } from "@/services/util/helpers";
import { useEffect, useState } from "react";

export function useDeployValueSafeTx(
  currencyName: string,
  fiatCurrencyName: string,
  initialFiatAmount: number,
  txSubmitError?: boolean,
) {
  const [tokenRate, setTokenRate] = useState<number>();
  const [currentDeployValue, setCurrentDeployValue] = useState<number>(0);
  const [currentDeployValueParsed, setCurrentDeployValueParsed] =
    useState<string>("0");

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

  useEffect(() => {
    getFiatCurrencyRate(currencyName, fiatCurrencyName).then((rateResponse) => {
      rateResponse.json().then((rateData) => {
        const newRate = rateData[currencyName][fiatCurrencyName];

        setTokenRate(newRate);
        setCurrentDeployValue(newRate && initialFiatAmount / newRate);
      });
    });
  }, [
    currencyName,
    fiatCurrencyName,
    initialFiatAmount,
    setTokenRate,
    setCurrentDeployValue,
  ]);

  return { currentDeployValue, currentDeployValueParsed, tokenRate };
}
