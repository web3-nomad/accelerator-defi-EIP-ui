import { Flex, Link } from "@chakra-ui/react";
import Icon from "../../components/Icon";

const Footer = () => {
  return (
    <Flex
      w="100%"
      h="32px"
      bgColor="transparent"
      color="gray.600"
      alignItems="center"
      position="fixed"
      bottom="0px"
      justifyContent="right"
      zIndex="100"
    >
      <Flex direction="row" alignItems="center">
        <Link
          href="https://github.com/web3-nomad/accelerator-defi-EIP-ui"
          isExternal={true}
          fontSize="14px"
          fontWeight="700"
          p="0px 12px"
        >
          <Flex direction="row" gap="1" alignItems="center">
            <Icon name="GithubLogo" fontSize="14px" /> UI
          </Flex>
        </Link>
        <Link
          href="https://github.com/web3-nomad/accelerator-defi-EIP"
          isExternal={true}
          fontSize="14px"
          fontWeight="700"
          p="0px 12px"
        >
          <Flex direction="row" gap="1" alignItems="center">
            <Icon name="GithubLogo" fontSize="14px" /> Smart Contracts
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Footer;
