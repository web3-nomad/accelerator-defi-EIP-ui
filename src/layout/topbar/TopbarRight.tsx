import { Box, Flex, Button } from "@chakra-ui/react";
//import ConnectButton from "@/components/walletconnect/ConnectButton";

import { useWalletInterface } from "../../services/wallets/useWalletInterface";
import { connectToBladeWallet } from "../../services/wallets/blade/bladeClient";
import { hashConnect } from "../../services/wallets/hashconnect/hashconnectClient";
import { connectToMetamask } from "../../services/wallets/metamask/metamaskClient";

const TopbarRight = () => {
  const { accountId, walletName, walletInterface } = useWalletInterface();

  return (
    <Flex gap={5}>
      <Box borderLeft="2px solid" borderLeftColor="light.primary" w="1px" />
      {/* <ConnectButton /> */}

      {/* TODO: move to separate component */}
      {!accountId ? (
        <>
          <Button
            colorScheme="blue"
            onClick={() => {
              hashConnect.connectToLocalWallet();
            }}
          >
            HashPack
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              connectToBladeWallet();
            }}
          >
            Blade
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              connectToMetamask();
            }}
          >
            Metamask
          </Button>
        </>
      ) : (
        <>
          <Button
            colorScheme="blue"
            width="100%"
            onClick={() => {
              walletInterface?.disconnect();
            }}
          >
            [ {walletName}: {accountId} ] Disconnect
          </Button>
        </>
      )}
    </Flex>
  );
};

export default TopbarRight;
