import { Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { TokenNameItem } from "@/types/types";
import { Eip3643Context } from "@/contexts/Eip3643Context";
import { MenuSelect } from "@/components/MenuSelect";
import { readTokenName } from "@/services/contracts/wagmiGenActions";

export function ManageTokensList() {
  const [tokens, setTokens] = useState([] as Array<TokenNameItem>);
  const { deployedTokens } = useContext(Eip3643Context);
  const [selectedIdentity, setSelectedIdentity] = useState<string>("0x");
  const [identitiesForSelectedToken, setIdentitiesForSelectedToken] = useState(
    [],
  );

  const investorCountries = [
    {
      value: 840,
      label: "US",
    },
    {
      value: 804,
      label: "Non US",
    },
  ];

  console.log("deloyed:", deployedTokens);

  const handleTokenSelect = () => {
    setIdentitiesForSelectedToken([]);
  };

  const handleIdentitySelect = (value: string | number) => {
    setSelectedIdentity(value as string);
  };

  useEffect(() => {
    (deployedTokens as any).map((item: any) => {
      const tokenAddress = item["args"]?.[0];
      tokenAddress &&
        readTokenName({}, tokenAddress).then((res) => {
          setTokens((prev) => {
            return [
              ...prev.filter((itemSub) => itemSub.address !== tokenAddress),
              {
                address: tokenAddress,
                name: res[0],
              },
            ];
          });
        });
    });
  }, [deployedTokens, setTokens]);

  return (
    <Box>
      <Flex direction="column" width="60%">
        <MenuSelect
          data={tokens.map((tok) => ({
            value: tok.address,
            label: tok.name,
          }))}
          label="Select tokens to manage identities"
          onTokenSelect={handleTokenSelect}
        />
        <Box mt="4">
          <MenuSelect
            data={identitiesForSelectedToken.map((identity) => ({
              value: identity,
              label: identity,
            }))}
            label="Select identity to manage"
            onTokenSelect={handleIdentitySelect}
          />
        </Box>
        {true && (
          <Flex direction="column" mt="4">
            <Text>Selected identity: {selectedIdentity}</Text>
            <ButtonGroup mt="2">
              <MenuSelect
                data={investorCountries}
                label="Update country"
                onTokenSelect={handleIdentitySelect}
              />
              <Button>Remove</Button>
            </ButtonGroup>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
