import {
  Heading,
  VStack,
  Text,
  Select,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Eip3643Context } from "../../contexts/Eip3643Context";
import {
  readTokenAllowance,
  readTokenBalanceOf,
  readTokenIdentityRegistry,
  readTokenIsAgent,
  readTokenIsFrozen,
  readTokenOwner,
  writeTokenMint,
} from "../../services/contracts/wagmiGenActions";
import { useWalletInterface } from "../../services/wallets/useWalletInterface";

type TokenNameItem = {
  address: `0x${string}`;
  name: string;
};

export default function TokenInfo({
  selectedToken,
}: {
  selectedToken: TokenNameItem | null;
}) {
  const { accountId, walletName, walletInterface } = useWalletInterface();
  const [isFrozen, setIsFrozen] = useState("");
  const [balance, setBalance] = useState("");
  const [registry, setRegistry] = useState("");
  const [owner, setOwner] = useState("");
  const [isAgent, setIsAgent] = useState("");
  const [mintError, setMintError] = useState("");

  const onMint = () => {
    console.log("onMint");
    if (!walletInterface) return null;
    const value = BigInt(10);
    setMintError("");
    writeTokenMint(
      walletInterface,
      { args: [accountId as `0x${string}`, value] } as any,
      selectedToken?.address,
    )
      .then((txid) => {
        console.log(txid);
      })
      .catch((res) => {
        setMintError(res);
      });
  };

  const readBalance = () => {
    setBalance("pending...");
    selectedToken &&
      readTokenBalanceOf(
        { args: [accountId as `0x${string}`] },
        selectedToken.address,
      ).then((res) => setBalance(res.toString()));
  };

  useEffect(() => {
    setMintError("");
    if (selectedToken) {
      readBalance();

      setIsFrozen("pending...");
      readTokenIsFrozen(
        { args: [accountId as `0x${string}`] },
        selectedToken.address,
      ).then((res) => setIsFrozen("" + res));

      setIsAgent("pending...");
      readTokenIsAgent(
        { args: [accountId as `0x${string}`] },
        selectedToken.address,
      ).then((res) => setIsAgent("" + res));

      setRegistry("pending...");
      readTokenIdentityRegistry({ args: [] }, selectedToken.address).then(
        (res) => setRegistry(res),
      );

      setOwner("pending...");
      readTokenOwner({ args: [] }, selectedToken.address).then((res) =>
        setOwner(res.toString()),
      );
    }
  }, [setBalance, selectedToken]);

  return (
    <>
      <Heading size={"sm"}>Current token</Heading>
      {!selectedToken && <Text> Token not selected </Text>}
      {selectedToken && (
        <>
          <Text>Name: {selectedToken.name}</Text>
          <Text>Address: {selectedToken.address}</Text>
          <Text>
            Contract owner: {owner} {accountId === owner && <b>[YOU]</b>}{" "}
          </Text>
          <Text>Your balance: {balance}</Text>
          <Text>Is Frozen: {isFrozen}</Text>
          <Text>Is Agent: {isAgent}</Text>
          <Text>Identity registry address: {registry}</Text>
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
