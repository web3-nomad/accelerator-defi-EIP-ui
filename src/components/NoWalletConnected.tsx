import { Flex, Text } from "@chakra-ui/react";

const NoWalletConnected = () => {
  return (
    <Flex
      bgColor="white"
      w="100%"
      h="100%"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Text fontSize="22px" fontWeight="700" lineHeight="16px" mb="16px">
        Connect wallet to start operating!
      </Text>
    </Flex>
  );
};

export default NoWalletConnected;
