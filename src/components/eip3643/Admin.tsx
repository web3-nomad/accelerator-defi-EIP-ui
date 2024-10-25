import { Button, Divider, Stack, Text, Box } from "@chakra-ui/react";
import { useContext, useEffect, useState, useMemo } from "react";
import { GroupBase } from "react-select";

import DeployToken from "@/components/eip3643/admin/DeployToken";
import RegisterIdentity from "@/components/eip3643/admin/RegisterIdentity";
import CreateIdentityFactory from "@/components/eip3643/admin/CreateIdentityFactory";
import { Eip3643Context } from "@/contexts/Eip3643Context";
import { TokenNameItem, TokenOwnerItem } from "@/types/types";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import TokenInfo from "@/components/eip3643/admin/TokenInfo";
import Compliance from "@/components/eip3643/admin/Compliance";
import { MenuSelect } from "@/components/MenuSelect";
import { useReadTokenOwnerQueries } from "@/hooks/useReadTokenOwnerQueries";
import { useReadTokenNameQueries } from "@/hooks/useReadTokenNameQueries";

export default function Admin() {
  const [isDeploy, setIsDeploy] = useState(false);
  const [tokenSelected, setTokenSelected] = useState<TokenNameItem>();
  const [ownTokens, setOwnTokens] = useState<TokenNameItem[]>([]);
  const { accountEvm } = useWalletInterface();
  const { deployedTokens } = useContext(Eip3643Context);

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

  const handleTokenSelect = (value: string | number) => {
    const tokenItem = ownTokens.find((itemSub) => itemSub.address === value);
    setTokenSelected(tokenItem);
  };

  const ownTokensData = useMemo(
    () =>
      ownTokens.map((token) => ({
        value: token.address,
        label: token.name,
      })),
    [ownTokens],
  );

  return (
    <>
      {!isDeploy && (
        <Stack spacing={4} align="center">
          <Box width="50%">
            <MenuSelect
              label="Select token for operation"
              data={ownTokensData as unknown as GroupBase<string | number>[]}
              onTokenSelect={handleTokenSelect}
            />
            <Text>
              Note: only tokens deployed by current wallet address are shown
            </Text>
          </Box>
          {!tokenSelected && (
            <>
              <Text>OR</Text>
              <Button onClick={() => setIsDeploy(true)}>
                Deploy new token
              </Button>
            </>
          )}
        </Stack>
      )}
      {isDeploy && !tokenSelected && (
        <DeployToken onClose={() => setIsDeploy(false)} />
      )}
      {tokenSelected && (
        <>
          <TokenInfo tokenSelected={tokenSelected}></TokenInfo>
          <Divider my={10} />
          <CreateIdentityFactory />
          <Divider my={10} />
          <RegisterIdentity tokenSelected={tokenSelected} />
          <Divider my={10} />
          <Compliance tokenSelected={tokenSelected} />
          <Divider my={10} />
        </>
      )}
    </>
  );
}
