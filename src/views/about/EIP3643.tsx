"use client";
import { Flex, Text, Link, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function AboutEIP3643() {
  const navigate = useNavigate();

  const startOperating = () => {
    navigate("/eip3643/start-operating");
  };

  return (
    <Flex direction="column">
      <Text>
        ERC-3643, also known as the Token for Regulated Exchanges (T-REX)
        protocol, is a token standard for the Ethereum blockchain that allows
        for the tokenization of real-world assets (RWAs). It was originally
        developed by Tokeny and proposed to the Ethereum community in 2021, but
        {"wasn't"} approved until December 2022. ERC-3643 is designed to
        simplify tokenization processes, adhere to regulatory requirements, and
        maintain transparency within decentralized ecosystems. It uses smart
        contract technology to define conditional transfer functions, which
        allows for compliance structures for regulated assets like securities.
      </Text>
      <Text fontWeight="600" fontSize="18px" mt="6" mb="2">
        Links to examples of using ERC-3643 standard
      </Text>
      <Flex direction="column">
        <Link textDecoration="underline" href="https://www.erc3643.org/members">
          https://www.erc3643.org
        </Link>
        <Link
          textDecoration="underline"
          href="https://www.prnewswire.com/news-releases/archax-increases-tokenised-money-market-fund-offerings-302124532.html"
        >
          https://www.prnewswire.com
        </Link>
      </Flex>
      <Flex mt="6">
        <Button onClick={startOperating}>Start operating</Button>
      </Flex>
    </Flex>
  );
}
