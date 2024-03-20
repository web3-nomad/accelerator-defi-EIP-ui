import { Box, Flex } from "@chakra-ui/react";
import LOGO_HEDERA from "../../assets/svg/hedera-hbar-logo.svg";
import WalletButtons from "../../components/WalletButtons";
import ChakraNextImage from "../../components/ChakraNextImage";

const Topbar = () => {
  return (
    <>
      <Flex
        w="100%"
        h="64px"
        boxShadow="down-black"
        bgColor="brand.white"
        color="brand.gray2"
        alignItems="center"
        position="relative"
        zIndex="100"
        justifyContent="space-between"
      >
        <Box minW="80px" w="80px" textAlign="center">
          <ChakraNextImage
            alt=""
            src={LOGO_HEDERA}
            w="40px"
            h="40px"
            margin="auto"
          />
        </Box>
        <Flex
          w="100%"
          h="100%"
          justifyContent="right"
          alignItems="center"
          pl={5}
          pr={5}
        >
          <WalletButtons />
        </Flex>
      </Flex>
      {/* TODO: implement alerts after connecting wallet/RPC */}
    </>
  );
};

export default Topbar;
