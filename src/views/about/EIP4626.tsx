"use client";
import { Flex, Text, Link, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function AboutEIP4626() {
  const navigate = useNavigate();

  const startOperating = () => {
    navigate("/eip4626/start-operating");
  };

  return (
    <Flex direction="column">
      <Text>
        ERC-4626 is a standard to optimize and unify the technical parameters of
        yield-bearing vaults. It provides a standard API for tokenized
        yield-bearing vaults that represent shares of a single underlying ERC-20
        token. ERC-4626 also outlines an optional extension for tokenized vaults
        utilizing ERC-20, offering basic functionality for depositing,
        withdrawing tokens and reading balances.
      </Text>
      <Text fontWeight="600" fontSize="18px" mt="6" mb="2">
        Links to examples of using ERC-4626 standard
      </Text>
      <Flex direction="column">
        <Link
          textDecoration="underline"
          href="https://eips.ethereum.org/EIPS/eip-4626"
        >
          https://eips.ethereum.org
        </Link>
      </Flex>
      <Flex mt="6">
        <Button onClick={startOperating}>Start operating</Button>
      </Flex>
    </Flex>
  );
}
