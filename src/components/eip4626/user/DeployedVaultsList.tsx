import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Eip4626Context } from "@/contexts/Eip4626Context";

export default function DeployedVaultsList() {
  const { deployedVaults } = useContext(Eip4626Context);

  return (
    <>
      <Heading size={"md"} my={5}>
        Deployed vaults
      </Heading>
      {deployedVaults.map((vault) => (
        <Box key={vault?.["args"]?.[0]}>
          <Text>Vault address: {vault?.["args"]?.[0]}</Text>
          <Text>
            Shared Token name: {vault?.["args"]?.[1]} ({vault?.["args"]?.[2]})
          </Text>
          <Divider my={5} />
        </Box>
      ))}
    </>
  );
}
