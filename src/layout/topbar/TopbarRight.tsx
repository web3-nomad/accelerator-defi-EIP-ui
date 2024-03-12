import { Box, Flex } from "@chakra-ui/react";
import ConnectButton from "@/components/walletconnect/ConnectButton";

const TopbarRight = () => {
  return (
    <Flex gap={5}>
      <Box borderLeft="2px solid" borderLeftColor="light.primary" w="1px" />
      <ConnectButton />
    </Flex>
  );
};

export default TopbarRight;
