import { useCreateIdentity } from "@/hooks/mutations/useCreateIdentity";
import { Button, Text } from "@chakra-ui/react";

export default function CreateIdentity() {
  const { data, mutateAsync: createIdentity } = useCreateIdentity();

  return (
    <>
      <Button
        onClick={async () => {
          createIdentity();
        }}
      >
        Create Identity
      </Button>
      <Text>Created Identity address: {data}</Text>
    </>
  );
}
