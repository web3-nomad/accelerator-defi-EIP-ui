import {
  Heading,
  Text,
  Divider,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { readTokenBalanceOf } from "@/services/contracts/wagmiGenActions";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";

type TokenNameItem = {
  address: `0x${string}`;
  name: string;
};

export default function TokenInfo({
  tokenSelected,
}: {
  tokenSelected: TokenNameItem | null;
}) {
  const { accountId, walletName, walletInterface } = useWalletInterface();
  const [balance, setBalance] = useState("");
  // const [mintError, setMintError] = useState("");

  // const onMint = () => {
  //   console.log("onMint");
  //   if (!walletInterface) return null;
  //   const value = BigInt(10);
  //   setMintError("");
  //   writeTokenMint(
  //     walletInterface,
  //     { args: [accountId as `0x${string}`, value] } as any,
  //     tokenSelected?.address,
  //   )
  //     .then((txid) => {
  //       console.log(txid);
  //     })
  //     .catch((res) => {
  //       setMintError(res);
  //     });
  // };

  useEffect(() => {
    //    setMintError("");
    if (tokenSelected) {
      setBalance("pending...");
      readTokenBalanceOf(
        { args: [accountId as `0x${string}`] },
        tokenSelected.address,
      ).then((res) => setBalance(res.toString()));
    }
  }, [tokenSelected, accountId]);

  return (
    <>
      <Divider my={10} />
      {!tokenSelected && <Text> Token not selected </Text>}
      {tokenSelected && (
        <>
          <Text>
            <b>Your balance:</b> {balance}
          </Text>
          {/* 
          <Button onClick={onMint} isDisabled={isAgent !== "true"}>
            Mint 10 {isAgent !== "true" && "[not an agent]"}
          </Button>

          {mintError && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Mint error!</AlertTitle>
              <AlertDescription>{mintError}</AlertDescription>
            </Alert>
          )} */}
        </>
      )}
    </>
  );
}
