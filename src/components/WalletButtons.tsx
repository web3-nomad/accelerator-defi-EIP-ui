import { useContext } from "react";

import { Box, Flex, Button } from "@chakra-ui/react";
import { useWeb3Modal } from "@web3modal/ethers/react";

import { useWalletInterface } from "../services/wallets/useWalletInterface";
import { connectToBladeWallet } from "../services/wallets/blade/bladeClient";
import { connectToHashconnectWallet } from "../services/wallets/hashconnect/hashconnectClient";
import { connectToMetamask } from "../services/wallets/metamask/metamaskClient";
import { HashconnectContext } from "../contexts/HashconnectContext";
import { BladeContext } from "../contexts/BladeContext";
import { MetamaskContext } from "../contexts/MetamaskContext";
// import { connectToWalletConnect } from "@/services/wallets/walletconnect/walletconnectClient";

const WalletButtons = () => {
  const hashconnectCtx = useContext(HashconnectContext);
  const bladeCtx = useContext(BladeContext);
  const metamaskCtx = useContext(MetamaskContext);

  const { accountId, walletName, walletInterface } = useWalletInterface();
  const { open } = useWeb3Modal();

  return (
    <Flex gap={5}>
      {/* TODO: move to separate component */}
      {!accountId ? (
        <>
          <Button
            isDisabled={!hashconnectCtx.isAvailable}
            colorScheme="blue"
            onClick={() => {
              connectToHashconnectWallet();
            }}
          >
            HashPack
          </Button>
          <Button
            isDisabled={!bladeCtx.isAvailable}
            colorScheme="blue"
            onClick={() => {
              connectToBladeWallet(true);
            }}
          >
            Blade
          </Button>
          <Button
            isDisabled={!metamaskCtx.isAvailable}
            colorScheme="blue"
            onClick={() => {
              connectToMetamask();
            }}
          >
            Metamask
          </Button>
          <Button
            // isDisabled={!metamaskCtx.isAvailable}
            colorScheme="blue"
            onClick={() => {
              // connectToMetamask();
              open();
              // connectToWalletConnect();
            }}
          >
            WalletConnect
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

export default WalletButtons;
