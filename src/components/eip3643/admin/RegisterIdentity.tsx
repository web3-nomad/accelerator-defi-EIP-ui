import { Button, Text, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRegisterIdentity } from "@/hooks/mutations/useRegisterIdentity";

export default function RegisterIdentity() {
  const { data, mutateAsync: register, error } = useRegisterIdentity();
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error adding identity to registry",
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
          register();
        }}
      >
        Add Identity to Registry
      </Button>
      <Text>
        Using Identity (HARDCODED!): 0x0D02b42f72f8d3724ea222D2993061e3d027bBDc
      </Text>
      <Text>
        Using Identity Registry (HARDCODED!):
        0x9928352D4DCD68cB76512AB71940D8AD912246be
      </Text>
      <Text>Result: {data}</Text>
    </>
  );
}
