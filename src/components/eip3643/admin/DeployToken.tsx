import { useDeployToken } from "@/hooks/mutations/useDeployToken";
import { Button, Text } from "@chakra-ui/react";

export default function DeployToken() {
  const { data: deployResult, mutateAsync: deployToken } = useDeployToken();

  console.log("L19 deployResult ===", deployResult);
  return (
    <Button
      onClick={async () => {
        deployToken();
      }}
    >
      Deploy token
    </Button>
  );
}
