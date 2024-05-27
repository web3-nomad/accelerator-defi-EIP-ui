import { Button } from "@chakra-ui/react";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { AssociateTokenProps } from "@/types/types";
import { TokenId } from "@hashgraph/sdk";

export function AssociateToken({ tokenAddress }: AssociateTokenProps) {
  const { walletInterface } = useWalletInterface();

  const associateCall = () => {
    const hederaTokenId = TokenId.fromSolidityAddress(String(tokenAddress));
    walletInterface?.associateToken(hederaTokenId);
  };

  return (
    <>
      <Button onClick={() => associateCall()}>Associate token</Button>
    </>
  );
}
