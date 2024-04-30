import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Heading,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useRegisterIdentity } from "@/hooks/mutations/useRegisterIdentity";
import {
  readTokenIdentityRegistry,
  watchIdentityRegistryIdentityRegisteredEvent,
} from "../../../services/contracts/wagmiGenActions";
import { TokenNameItem } from "../../../types/types";
import { Eip3643Context } from "../../../contexts/Eip3643Context";
import { WatchContractEventReturnType } from "../../../services/contracts/watchContractEvent";

export default function RegisterIdentity({
  tokenSelected,
}: {
  tokenSelected: TokenNameItem | null;
}) {
  const [registryAgents, setRegistryAgents] = useState([] as any[]);
  const [registry, setRegistry] = useState("");
  const { currentIdentityAddress, currentIdentityWallet } =
    useContext(Eip3643Context);
  const {
    data,
    mutateAsync: register,
    error,
    isPending,
  } = useRegisterIdentity();
  let unsub: WatchContractEventReturnType | null = null;

  useEffect(() => {
    tokenSelected &&
      readTokenIdentityRegistry({ args: [] }, tokenSelected.address).then(
        (res) => {
          setRegistry(res[0]);
          setRegistryAgents([]);
          unsub && unsub();
          unsub = watchIdentityRegistryIdentityRegisteredEvent(
            {
              onLogs: (data) => {
                setRegistryAgents((prev: any) => {
                  return [
                    ...prev,
                    ...data
                      .map((item: any) => item.args[0])
                      .filter((item) => !prev.includes(item)),
                  ];
                });
              },
            },
            res[0] as `0x${string}`,
          );
        },
      );
    return () => {
      unsub && unsub();
    };
  }, [tokenSelected]);

  if (!tokenSelected) return null;
  return (
    <>
      <Button
        isDisabled={
          !currentIdentityAddress ||
          registryAgents.includes(currentIdentityWallet)
        }
        isLoading={isPending}
        onClick={async () => {
          register({
            address: currentIdentityWallet as `0x${string}`,
            identity: currentIdentityAddress as `0x${string}`,
            registry: registry as `0x${string}`,
          });
        }}
      >
        Add Identity to Registry
      </Button>
      <FormControl>
        <FormHelperText>
          <b>Using Identity:</b> {currentIdentityAddress}
        </FormHelperText>
        <FormHelperText>
          <b>Using Identity Registry:</b> {registry}
        </FormHelperText>
      </FormControl>
      <Divider my={10} />
      <Heading size={"md"}>Registered identities addresses</Heading>
      <OrderedList>
        {registryAgents.map((item) => (
          <ListItem key={item}>{item}</ListItem>
        ))}
      </OrderedList>
      {registryAgents.length === 0 && <Text>No identities found</Text>}
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Create identity error!</AlertTitle>
          <AlertDescription>{error.toString()}</AlertDescription>
        </Alert>
      )}
      {data && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Create identity success!</AlertTitle>
          <AlertDescription>TxId: {data}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
