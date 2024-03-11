import { Box, Flex } from "@chakra-ui/react";
import Icon from "../../components/Icon";

const TopbarRight = () => {
  const handleDisconnect = async () => {
    // TODO
  };

  return (
    <Flex data-testid="topbar-right" gap={5}>
      <Box borderLeft="2px solid" borderLeftColor="light.primary" w="1px" />
      <Flex
        onClick={handleDisconnect}
        h="32px"
        minW="32px"
        borderRadius="50%"
        bgColor="light.purple4"
        justifyContent="center"
        alignItems="center"
        alignSelf="center"
        _hover={{
          cursor: "pointer",
          bgColor: "light.purple2",
        }}
      >
        <Icon name="Power" fontSize="24px" color="dark.primary" />
      </Flex>
    </Flex>
  );
};

export default TopbarRight;
