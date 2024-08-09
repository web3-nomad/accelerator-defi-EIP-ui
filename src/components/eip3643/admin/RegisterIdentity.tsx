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
import { useContext } from "react";
import { useRegisterIdentity } from "@/hooks/mutations/useRegisterIdentity";
import { TokenNameItem } from "@/types/types";
import { Eip3643Context } from "@/contexts/Eip3643Context";
import { useTokenIdentityRegistry } from "@/hooks/useTokenIdentityRegistry";

export default function RegisterIdentity({
  tokenSelected,
}: {
  tokenSelected?: TokenNameItem;
}) {
  const { currentIdentityAddress, currentIdentityWallet } =
    useContext(Eip3643Context);
  const {
    data,
    mutateAsync: register,
    error,
    isPending,
  } = useRegisterIdentity();

  const { registry, registryAgents } = useTokenIdentityRegistry(tokenSelected);

  if (!tokenSelected) return null;

  return (
    <>
      <Button
        isDisabled={
          !currentIdentityAddress ||
          registryAgents.includes(currentIdentityWallet)
        }
        isLoading={isPending}
        size={"md"}
        onClick={async () => {
          register({
            address: currentIdentityWallet as `0x${string}`,
            identity: currentIdentityAddress as `0x${string}`,
            registry: registry as `0x${string}`,
          });
        }}
      >
        Add Identity to Registry{" "}
        {(!currentIdentityAddress ||
          registryAgents.includes(currentIdentityWallet)) &&
          "[Already added]"}
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
      <Heading size={"md"}>Wallet addresses with registered identities</Heading>
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
