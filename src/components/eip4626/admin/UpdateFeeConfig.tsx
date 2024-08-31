import { useFormik } from "formik";
import { useUpdateFeeConfig } from "@/hooks/eip4626/mutations/useUpdateFeeConfig";
import {
  Button,
  Input,
  Stack,
  VStack,
  Heading,
  FormLabel,
  FormControl,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { readHederaVaultFeeConfig } from "../../../services/contracts/wagmiGenActions";
import { useEffect, useState } from "react";

export default function UpdateFeeConfig({
  vaultSelected,
  resetSelectedVault,
}: {
  vaultSelected: any | null;
  resetSelectedVault: () => void;
}) {
  const {
    error,
    isPending,
    data,
    mutateAsync: updateFeeConfig,
  } = useUpdateFeeConfig();

  const [receiver, setReceiver] = useState("");
  const [rewardTokenAddress, setRewardTokenAddress] = useState("");
  const [feePercentage, setFeePercentage] = useState("");

  useEffect(() => {
    readHederaVaultFeeConfig({}, vaultSelected.address).then((res) => {
      setReceiver(res[0]);
      setRewardTokenAddress(res[1]);
      setFeePercentage(res[2].toString());
    });
  }, [vaultSelected, setRewardTokenAddress, setFeePercentage, setReceiver]);

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      receiver,
      rewardTokenAddress,
      feePercentage,
    },
    onSubmit: ({ receiver, rewardTokenAddress, feePercentage }) => {
      updateFeeConfig({
        vaultAddress: vaultSelected.address as `0x${string}`,
        receiver: receiver as `0x${string}`,
        rewardTokenAddress: rewardTokenAddress as `0x${string}`,
        feePercentage: parseInt(feePercentage),
      });
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <VStack gap={2} alignItems="flex-start">
        <Heading size={"md"}>Update fee config</Heading>
        <FormControl isRequired>
          <FormLabel>Receiver</FormLabel>
          <Input
            name="receiver"
            variant="outline"
            value={form.values.receiver}
            onChange={form.handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Reward token address</FormLabel>
          <Input
            name="rewardTokenAddress"
            variant="outline"
            value={form.values.rewardTokenAddress}
            onChange={form.handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Fee percentage (*100, example: 10% = 1000)</FormLabel>
          <Input
            name="feePercentage"
            variant="outline"
            value={form.values.feePercentage}
            onChange={form.handleChange}
          />
        </FormControl>
        <Stack spacing={4} direction="row" align="center">
          <Button type="submit" isLoading={isPending}>
            Update
          </Button>
          <Button onClick={resetSelectedVault}>Cancel</Button>
        </Stack>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Update error!</AlertTitle>
            <AlertDescription>{error.toString()}</AlertDescription>
          </Alert>
        )}
        {data && (
          <>
            <Alert status="success">
              <AlertIcon />
              <AlertTitle>Update success!</AlertTitle>
              <AlertDescription>TxId: {data}</AlertDescription>
            </Alert>
          </>
        )}
      </VStack>
    </form>
  );
}
