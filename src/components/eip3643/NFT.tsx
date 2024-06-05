import { Heading, Text } from "@chakra-ui/react";

import {
  hederaNftAddress,
  readHederaNftBalanceOf,
} from "@/services/contracts/wagmiGenActions";
import MintNFT from "@/components/eip3643/NFT/MintNFT";

export default function NFT() {
  readHederaNftBalanceOf;
  return (
    <>
      <Heading size={"md"}>Manage demo NFT</Heading>
      <Text>
        This demo NFT can be used for compliance module on admin section. Mint
        is available for everyone.
      </Text>
      <Text>NFT address is {hederaNftAddress}</Text>

      <MintNFT></MintNFT>
    </>
  );
}
