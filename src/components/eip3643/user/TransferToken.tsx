import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { useLocalStorage } from "react-use";
import { useFormik } from "formik";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useTransferToken } from "@/hooks/mutations/useTransferToken";
import { useReadBalanceOf } from "@/hooks/useReadBalanceOf";
import {
  EvmAddress,
  TokenNameItem,
  TransferTokenFromRequest,
} from "@/types/types";
import { useAccountId } from "@/hooks/useAccountId";
import { AccountIdResult } from "@/components/AccountIdResult";
import { MenuSelect } from "@/components/MenuSelect";
import { GroupBase } from "react-select";
import { useReadTokenDecimals } from "@/hooks/eip4626/useReadTokenDecimals";
import {
  formatUnitsWithDecimals,
  parseUnitsWithDecimals,
} from "@/services/util/helpers";
import { useReadTokenTotalSupply } from "@/hooks/eip3643/useReadTokenTotalSupply";

type StoredAddressItem = {
  address: string;
  used_times_count: number;
};

export default function TransferToken({
  tokenSelected,
  registeredIdentities = [],
}: {
  tokenSelected: TokenNameItem;
  registeredIdentities?: string[];
}) {
  const { accountEvm } = useWalletInterface();
  const {
    data: transferResult,
    error,
    isPending,
    mutateAsync: transferToken,
  } = useTransferToken();
  const { data: tokenDecimals } = useReadTokenDecimals(tokenSelected?.address);
  const [mostUsedAddressesValue, setValue] =
    useLocalStorage<StoredAddressItem[]>("mostUsedAddresses");

  const form = useFormik({
    initialValues: {
      toAddress: "",
      amount: "",
    },
    onSubmit: ({ toAddress, amount }) => {
      const amountConverted = parseUnitsWithDecimals(amount, tokenDecimals);

      transferToken({
        tokenAddress: tokenSelected?.address,
        toAddress: (hederaEVMAccount || toAddress) as EvmAddress,
        amount: amountConverted,
      } as TransferTokenFromRequest);

      updateMostUsedAddresses(toAddress);
    },
  });

  const { data: tokenBalance, error: tokenBalanceError } = useReadBalanceOf(
    tokenSelected?.address,
  );

  const { data: tokenSelectedDecimals } = useReadTokenDecimals(
    tokenSelected?.address,
  );

  const tokenSelectedBalance = formatUnitsWithDecimals(
    tokenBalance,
    tokenSelectedDecimals,
  );

  const { hederaAccountIdError, hederaEVMAccount } = useAccountId(
    form.values.toAddress,
  );

  const { data: tokenTotalSupply, error: tokenTotalSupplyError } =
    useReadTokenTotalSupply(tokenSelected?.address);

  const tokenSelectedSupply = formatUnitsWithDecimals(
    tokenTotalSupply,
    tokenSelectedDecimals,
  );

  const updateMostUsedAddresses = (value: string) => {
    const _value = [...(mostUsedAddressesValue || [])];

    if (_value) {
      if (_value.find((item: StoredAddressItem) => item.address === value)) {
        _value.forEach((item: StoredAddressItem) => {
          if (item.address === value) {
            item.used_times_count += 1;
          }
        });
        setValue(_value);
      } else {
        setValue([
          ..._value,
          {
            address: value,
            used_times_count: 1,
          },
        ]);
      }
    } else {
      const items = [
        {
          address: value,
          used_times_count: 1,
        },
      ];
      setValue(items);
    }
  };

  const handleAddressSelection = (value: string) => {
    form.setValues((prev) => ({
      ...prev,
      toAddress: value,
    }));
  };

  return (
    <>
      <Heading size={"sm"}>Transfer token</Heading>
      <form onSubmit={form.handleSubmit}>
        <VStack gap={2} alignItems="flex-start">
          <FormControl>
            <FormHelperText>
              Balance of token: {`${tokenSelectedBalance}`}
            </FormHelperText>
            {tokenBalanceError && (
              <FormHelperText color={"red"}>
                Error fetching balance of token: {tokenSelected?.address}
              </FormHelperText>
            )}

            <FormHelperText>
              Total supply of token: {`${tokenSelectedSupply}`}
            </FormHelperText>
            {tokenTotalSupplyError && (
              <FormHelperText color={"red"}>
                Error fetching total supply of token: {tokenSelected?.address}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Send to address</FormLabel>
            <Flex mt="2" mb="3" width="50%">
              <MenuSelect
                data={
                  [
                    ...registeredIdentities.map((identity) => ({
                      label: identity,
                      value: identity,
                    })),
                    ...(mostUsedAddressesValue || []).map((usedAddress) => ({
                      label: usedAddress.address,
                      value: usedAddress.address,
                    })),
                  ] as unknown as GroupBase<string | number>[]
                }
                label="Select address which was already in use"
                onTokenSelect={handleAddressSelection}
                selectedValue={form.values.toAddress}
              />
            </Flex>
            <Input
              name="toAddress"
              variant="outline"
              value={form.values.toAddress}
              onChange={form.handleChange}
            />

            <FormHelperText>
              <b>Connected wallet address:</b> {accountEvm || "Not connected"}
            </FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Tokens amount to transfer</FormLabel>
            <NumberInput
              name="amount"
              variant="outline"
              value={form.values.amount}
              clampValueOnBlur={false}
              onChange={(val) => form.setFieldValue("amount", val)}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>

          <Button
            type="submit"
            isLoading={isPending}
            disabled={hederaAccountIdError}
          >
            Transfer
          </Button>
        </VStack>
      </form>
      <AccountIdResult
        error={hederaAccountIdError}
        transformed={hederaEVMAccount}
      />
      {transferResult && (
        <Alert status="success" mt="4">
          <AlertIcon />
          <AlertTitle>Transfer token success!</AlertTitle>
          <AlertDescription>TxId: {transferResult}</AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert status="error" mt="4">
          <AlertIcon />
          <AlertTitle>Transfer token error!</AlertTitle>
          <AlertDescription>{error.toString()}</AlertDescription>
          <AlertDescription>
            <VStack>
              <Flex>Potential reasons: </Flex>
              <Flex>
                - no sender or recipient identity present in the identity token
                registry
              </Flex>
              <Flex>- request fails the compliance requirements</Flex>
            </VStack>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
