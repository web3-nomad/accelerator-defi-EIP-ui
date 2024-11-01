import { useReadTokenOwnerQueries } from "@/hooks/useReadTokenOwnerQueries";
import { useContext, useEffect, useState } from "react";
import { TokenNameItem, TokenOwnerItem } from "@/types/types";
import { useReadTokenNameQueries } from "@/hooks/useReadTokenNameQueries";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { Eip3643Context } from "@/contexts/Eip3643Context";

export function useOwnTokens() {
  const { accountEvm } = useWalletInterface();
  const { deployedTokens } = useContext(Eip3643Context);
  const [ownTokens, setOwnTokens] = useState<TokenNameItem[]>([]);

  const { data: tokensWithOwners, isSuccess: tokensWithOwnersSuccess } =
    useReadTokenOwnerQueries(deployedTokens);

  const [userOwnedTokens, setUserOwnedTokens] = useState<TokenOwnerItem[]>([]);

  useEffect(() => {
    if (tokensWithOwnersSuccess) {
      setUserOwnedTokens(
        tokensWithOwners
          .filter(
            (tokenOwnerItem): tokenOwnerItem is TokenOwnerItem =>
              tokenOwnerItem !== undefined,
          )
          .filter(
            (tokenOwnerItem) =>
              tokenOwnerItem.ownerAddress?.toLowerCase() ===
              accountEvm?.toLowerCase(),
          ),
      );
    }
  }, [accountEvm, tokensWithOwners, tokensWithOwnersSuccess]);

  const { data: userOwnedTokensWithNames, isSuccess: tokensWithNamesSuccess } =
    useReadTokenNameQueries(
      userOwnedTokens.map((userOwnedToken) => userOwnedToken.tokenAddress),
    );

  useEffect(() => {
    if (tokensWithNamesSuccess) {
      setOwnTokens(
        userOwnedTokensWithNames.filter(
          (token): token is TokenNameItem => token !== undefined,
        ),
      );
    }
  }, [tokensWithNamesSuccess, userOwnedTokensWithNames]);

  return { ownTokens };
}
