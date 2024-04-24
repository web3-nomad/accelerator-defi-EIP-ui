import { Button, Text } from "@chakra-ui/react";
import { useCreateIdentityFactory } from "@/hooks/mutations/useCreateIdentityFactory";
import { useEffect } from "react";
import {
  watchIdFactoryDeployedEvent,
  watchIdFactoryEvent,
} from "@/services/contracts/wagmiGenActions";
import { WatchContractEventReturnType } from "viem";

export default function CreateIdentityFactory() {
  const { data, mutateAsync: createIdentityFactory } =
    useCreateIdentityFactory();
  //@TODO add on error toast

  useEffect(() => {
    //@TODO watch for another event? like ca deploy?
    const unsub: WatchContractEventReturnType = watchIdFactoryDeployedEvent({
      onLogs: (data) => {
        console.log("L15 watchIdFactoryDeployedEvent onlogs data ===", data);
      },
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      <Button
        onClick={async () => {
          createIdentityFactory();
        }}
      >
        Create Identity via Factory
      </Button>
      <Text>Created Identity address: {data}</Text>
    </>
  );
}
