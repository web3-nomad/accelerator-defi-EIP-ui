import { Heading, Text } from "@chakra-ui/react";
import { TokenNameItem } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/hooks/types";
import {
  readModularComplianceGetModules,
  readTokenCompliance,
  readTokenName,
  watchModularComplianceModuleAddedEvent,
} from "@/services/contracts/wagmiGenActions";
import { useEffect, useState } from "react";
import { WatchContractEventReturnType } from "viem";

export default function Compliance({
  tokenSelected,
}: {
  tokenSelected: TokenNameItem | null;
}) {
  console.log("L15 tokenSelected ===", tokenSelected);
  // const [modulesAdded, setModulesAdded] = useState([] as any[]);

  const { data: complianceModuleAddress } = useQuery({
    enabled: !!tokenSelected?.address,
    queryKey: [QueryKeys.ReadTokenCompliance, tokenSelected?.address],
    queryFn: () => readTokenCompliance({}, tokenSelected?.address),
  });

  const { data: addedModules } = useQuery({
    enabled: !!complianceModuleAddress,
    queryKey: [QueryKeys.ReadTokenCompliance, complianceModuleAddress],
    queryFn: () =>
      readModularComplianceGetModules(
        {},
        complianceModuleAddress?.toString() as `0x${string}`,
      ),
  });

  // useEffect(() => {
  //   setModulesAdded([]);
  // }, [tokenSelected]);

  // useEffect(() => {
  //   const unsub: WatchContractEventReturnType =
  //     watchModularComplianceModuleAddedEvent(
  //       {
  //         onLogs: (data) => {
  //           console.log(
  //             "L50 watchModularComplianceModuleAddedEvent data ===",
  //             data,
  //           );
  //
  //           (data as any).map((item: any) => {
  //             const addedModuleAddress = item["args"]?.[0];
  //             addedModuleAddress &&
  //               setModulesAdded((prev: any) => {
  //                 return [...prev, addedModuleAddress];
  //               });
  //           });
  //         },
  //       },
  //       complianceModuleAddress,
  //     );
  //
  //   return () => {
  //     unsub();
  //   };
  // }, [complianceModuleAddress, tokenSelected]);

  return (
    <>
      <Heading>Compliance</Heading>
      <Text>
        ModularCompliance address of current selected token:{" "}
        {complianceModuleAddress}
      </Text>
      <Text>
        Modules added: {addedModules && addedModules.map((module) => module)}
      </Text>
    </>
  );
}
