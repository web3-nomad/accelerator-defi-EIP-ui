import { Heading, VStack, Text, Select } from "@chakra-ui/react";
import { watchTrexFactoryTrexSuiteDeployedEvent } from "@/services/contracts/wagmiGenActions";
import { WatchContractEventReturnType } from "viem";
import { readTokenName } from "@/services/contracts/wagmiGenActions";
import { useContext, useEffect, useState } from "react";
import { Eip3643Context } from "../../../contexts/Eip3643Context";

import TokenInfo from "./TokenInfo";
import { TokenNameItem } from "../../../types/types";

export default function EventsTest() {
  const [selectedToken, setSelectedToken] = useState(
    null as TokenNameItem | null,
  );
  const [tokenNames, setTokenNames] = useState([] as Array<TokenNameItem>);
  const { deployedTokens, setDeployedTokens } = useContext(Eip3643Context);

  useEffect(() => {
    const unsub: WatchContractEventReturnType =
      watchTrexFactoryTrexSuiteDeployedEvent({
        onLogs: (data) => {
          setDeployedTokens(data as any);
          (data as any).map((item: any) => {
            const tokenAddress = item["args"]?.[0];
            tokenAddress &&
              readTokenName({}, tokenAddress).then((res) => {
                setTokenNames((prev) => {
                  return [
                    ...prev.filter(
                      (itemSub) => itemSub.address !== tokenAddress,
                    ),
                    {
                      address: tokenAddress,
                      name: res[0],
                    },
                  ];
                });
              });
          });
        },
      });
    return () => {
      unsub();
    };
  }, [setDeployedTokens, setTokenNames]);

  return (
    <VStack gap={2} alignItems="flex-start">
      <Heading size={"md"}>Deployed tokens</Heading>
      <Select
        placeholder="Select token"
        onChange={(item) => {
          const tokenItem = tokenNames.find(
            (itemSub) => itemSub.address === item.target.value,
          );
          tokenItem && setSelectedToken(tokenItem);
        }}
        variant="outline"
      >
        {tokenNames.map((item) => (
          <option key={item.address} value={item.address}>
            {item.name} [{item.address}]
          </option>
        ))}
      </Select>
      <TokenInfo tokenSelected={selectedToken}></TokenInfo>
    </VStack>
  );
}
