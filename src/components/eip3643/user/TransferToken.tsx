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
import { TokenNameItem, TransferTokenFromRequest } from "@/types/types";
import { useAccountId } from "@/hooks/useAccountId";
import { AccountIdResult } from "@/components/AccountIdResult";
import { MenuSelect } from "@/components/MenuSelect";

type StoredAddressItem = {
  address: string;
  used_times_count: number;
};

export default function TransferToken({
  tokenSelected,
  registeredIdentities = [],
}: {
  tokenSelected: TokenNameItem | null;
  registeredIdentities?: string[];
}) {
  const { accountEvm } = useWalletInterface();
  const { error, isPending, mutateAsync: transferToken } = useTransferToken();
  const [mostUsedAddressesValue, setValue] =
    useLocalStorage<StoredAddressItem[]>("mostUsedAddresses");

  const form = useFormik({
    initialValues: {
      toAddress: "",
      amount: 0,
    },
    onSubmit: ({ toAddress, amount }) => {
      const amountConverted = BigInt(amount);
      updateMostUsedAddresses(toAddress);
      transferToken({
        tokenAddress: tokenSelected?.address,
        toAddress: (hederaEVMAccount || toAddress) as `0x${string}`,
        amount: amountConverted,
      } as TransferTokenFromRequest);
    },
  });

  const { data: tokenBalance, error: tokenBalanceError } = useReadBalanceOf(
    tokenSelected?.address as `0x${string}`,
  );

  const { hederaAccountIdError, hederaEVMAccount } = useAccountId(
    form.values.toAddress,
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
          <FormControl isRequired>
            <FormHelperText>
              Balance of token: {`${tokenBalance}`}
            </FormHelperText>
            {tokenBalanceError && (
              <FormHelperText color={"red"}>
                Error fetching balance of token: {tokenSelected?.address}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Send to address</FormLabel>
            <Flex mt="2" mb="3">
              <MenuSelect
                buttonProps={{
                  style: {
                    width: "55%",
                  },
                }}
                data={[
                  ...registeredIdentities.map((identity) => ({
                    label: identity,
                    value: identity,
                  })),
                  ...(mostUsedAddressesValue || []).map((usedAddress) => ({
                    label: usedAddress.address,
                    value: usedAddress.address,
                  })),
                ]}
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
      {error && (
        <Alert status="error" mt="4">
          <AlertIcon />
          <AlertTitle>Transfer token error!</AlertTitle>
          <AlertDescription>
            {error.toString()}
            Potential reasons: - no sender or recipient identity present in the
            identity registry - sender or recipient does not have KYC NFT
            present
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
