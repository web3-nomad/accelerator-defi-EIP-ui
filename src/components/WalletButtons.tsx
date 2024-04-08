import { useContext } from "react";

import { Flex, Button } from "@chakra-ui/react";
import { useDisconnect, useWeb3Modal } from "@web3modal/ethers/react";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { connectToBladeWallet } from "@/services/wallets/blade/bladeClient";
import { connectToHashconnectWallet } from "@/services/wallets/hashconnect/hashconnectClient";
import { HashconnectContext } from "@/contexts/HashconnectContext";
import { BladeContext } from "@/contexts/BladeContext";
import { WalletConnectContext } from "@/contexts/WalletConnectContext";

const WalletButtons = () => {
  const hashconnectCtx = useContext(HashconnectContext);
  const bladeCtx = useContext(BladeContext);
  const walletconnectCtx = useContext(WalletConnectContext);

  const { accountId, walletName, walletInterface } = useWalletInterface();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();

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
            // isDisabled={!walletconnectCtx.isAvailable}
            colorScheme="blue"
            onClick={() => {
              open();
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
              walletInterface?.disconnect(() => {
                disconnect();
                walletconnectCtx.setIsAvailable(false);
                walletconnectCtx.setWalletConnectAccountAddress("");
              });
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
