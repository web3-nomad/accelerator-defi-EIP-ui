import { Button, Text, useToast } from "@chakra-ui/react";
import { useAddKeyToIdentity } from "@/hooks/mutations/useAddKeyToIdentity";
import { useEffect } from "react";

export default function AddKeyToIdentity() {
  const { data, mutateAsync: addKey, error } = useAddKeyToIdentity();
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error adding key to indentity",
        description: `${error.toString()}`,
        status: "error",
        isClosable: true,
      });
    }
  }, [error, toast]);

  return (
    <>
      <Button
        onClick={async () => {
          addKey();
        }}
      >
        Add Key To Identity
      </Button>
      <Text>Result: {data}</Text>
    </>
  );
}
