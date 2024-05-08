import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Eip3643Context } from "@/contexts/Eip3643Context";
import { useReadTokenName } from "@/hooks/useReadTokenName";

export default function DeployedTokensList() {
  const { deployedTokens } = useContext(Eip3643Context);

  const tokenNames = useReadTokenName(deployedTokens);

  return (
    <>
      <Heading size={"md"} my={5}>
        Deployed tokens
      </Heading>
      {tokenNames.map((token) => (
        <Box key={token?.data?.address}>
          <Text>Token name: {token?.data?.name}</Text>
          <Text>Token address: {token?.data?.address}</Text>
          <Divider my={5} />
        </Box>
      ))}
    </>
  );
}
