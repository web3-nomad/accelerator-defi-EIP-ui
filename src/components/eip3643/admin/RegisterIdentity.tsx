import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormHelperText,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useRegisterIdentity } from "@/hooks/mutations/useRegisterIdentity";
import { readTokenIdentityRegistry } from "../../../services/contracts/wagmiGenActions";
import { TokenNameItem } from "../../../types/types";
import { Eip3643Context } from "../../../contexts/Eip3643Context";

export default function RegisterIdentity({
  tokenSelected,
}: {
  tokenSelected: TokenNameItem | null;
}) {
  const [registry, setRegistry] = useState("");
  const { currentIdentityAddress, currentIdentityWallet } =
    useContext(Eip3643Context);
  const {
    data,
    mutateAsync: register,
    error,
    isPending,
  } = useRegisterIdentity();

  useEffect(() => {
    tokenSelected &&
      readTokenIdentityRegistry({ args: [] }, tokenSelected.address).then(
        (res) => setRegistry(res[0]),
      );
  }, [tokenSelected]);

  if (!tokenSelected) return null;

  return (
    <>
      <Button
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
