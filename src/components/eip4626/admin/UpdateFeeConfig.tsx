import { useFormik } from "formik";
import { useDeployVault } from "@/hooks/eip4626/mutations/useDeployVault";
import {
  Button,
  Input,
  Stack,
  VStack,
  Heading,
  FormLabel,
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormHelperText,
} from "@chakra-ui/react";

export default function DeployToken({ onClose = () => {} }) {
  const {
    error,
    isPending,
    data: deployResult,
    mutateAsync: deployVault,
  } = useDeployVault();

  const form = useFormik({
    initialValues: {
      stakingTokenAddress: "",
      shareTokenName: "",
      shareTokenSymbol: "",
      rewardTokenAddress: "",
      feePercentage: "",
    },
    onSubmit: ({
      stakingTokenAddress,
      shareTokenName,
      shareTokenSymbol,
      rewardTokenAddress,
      feePercentage,
    }) => {
      deployVault({
        stakingTokenAddress: stakingTokenAddress as `0x${string}`,
        shareTokenName,
        shareTokenSymbol,
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
        {!deployResult && (
          <Stack spacing={4} direction="row" align="center">
            <Button type="submit" isLoading={isPending}>
              Deploy
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                onClose();
              }}
              isLoading={isPending}
            >
              Cancel
            </Button>
          </Stack>
        )}
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Deploy error!</AlertTitle>
            <AlertDescription>{error.toString()}</AlertDescription>
          </Alert>
        )}
        {deployResult && (
          <>
            <Alert status="success">
              <AlertIcon />
              <AlertTitle>Deploy success!</AlertTitle>
              <AlertDescription>TxId: {deployResult}</AlertDescription>
            </Alert>
            <Button
              onClick={() => {
                onClose();
              }}
              isLoading={isPending}
            >
              Close
            </Button>
          </>
        )}
      </VStack>
    </form>
  );
}
