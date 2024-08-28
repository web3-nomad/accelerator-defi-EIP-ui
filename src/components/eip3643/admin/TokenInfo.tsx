import {
  Text,
  Divider,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormControl,
  FormLabel,
  Input,
  Stack,
  VStack,
  FormHelperText,
} from "@chakra-ui/react";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useMintToken } from "@/hooks/mutations/useMintToken";
import { useFormik } from "formik";
import { useAccountId } from "@/hooks/useAccountId";
import { AccountIdResult } from "@/components/AccountIdResult";
import { TokenBalance } from "@/components/eip3643/TokenBalance";
import { useReadTokenDecimals } from "@/hooks/eip4626/useReadTokenDecimals";
import { DEFAULT_TOKEN_MINT_AMOUNT } from "@/hooks/eip4626/mutations/useWriteHtsTokenMint";
import { parseUnitsWithDecimals } from "@/services/util/helpers";

type TokenNameItem = {
  address: `0x${string}`;
  name: string;
};

export default function TokenInfo({
  tokenSelected,
}: {
  tokenSelected: TokenNameItem;
}) {
  const { accountEvm } = useWalletInterface();
  const { data: tokenDecimals } = useReadTokenDecimals(tokenSelected.address);
  const { data, mutateAsync: mint, error, isPending } = useMintToken();

  //@TODO separate out mint form from token info
  const form = useFormik({
    initialValues: {
      address: accountEvm,
      value: `${DEFAULT_TOKEN_MINT_AMOUNT}`,
    },
    onSubmit: ({ address, value }) => {
      const tokenAmountFormatted = parseUnitsWithDecimals(value, tokenDecimals);

      tokenSelected &&
        mint({
          address: (hederaEVMAccount || address) as `0x${string}`,
          amount: tokenAmountFormatted,
          token: tokenSelected.address,
        });
    },
  });

  const { hederaAccountIdError, hederaEVMAccount } = useAccountId(
    form.values.address,
  );

  return (
    <>
      <Divider my={10} />
      {!tokenSelected && <Text> Token not selected </Text>}
      {tokenSelected && (
        <>
          <Text>Token name: {tokenSelected.name}</Text>
          <Text>Token address: {tokenSelected.address}</Text>
          <Text>Token decimals: {tokenDecimals}</Text>
          <Divider my={10} />

          <form onSubmit={form.handleSubmit}>
            <VStack gap={2} alignItems="flex-start">
              <FormControl isRequired>
                <FormLabel>Token receiver address</FormLabel>
                <Input
                  name="address"
                  variant="outline"
                  value={form.values.address}
                  onChange={form.handleChange}
                />
                <FormHelperText>
                  <TokenBalance tokenAddress={tokenSelected.address} />
                </FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Amount of tokens to mint</FormLabel>
                <Input
                  name="value"
                  variant="outline"
                  value={form.values.value}
                  onChange={form.handleChange}
                />
              </FormControl>
              <Stack spacing={4} direction="row" align="center">
                <Button
                  type="submit"
                  isLoading={isPending}
                  pr="8"
                  pl="8"
                  mt="2"
                >
                  Mint
                </Button>
              </Stack>
              <AccountIdResult
                error={hederaAccountIdError}
                transformed={hederaEVMAccount}
              />
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Mint error!</AlertTitle>
                  <AlertDescription>{error.toString()}</AlertDescription>
                </Alert>
              )}
              {data && (
                <Alert status="success">
                  <AlertIcon />
                  <AlertTitle>Mint success!</AlertTitle>
                  <AlertDescription>TxId: {data}</AlertDescription>
                </Alert>
              )}
            </VStack>
          </form>
        </>
      )}
    </>
  );
}
