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
import { EvmAddress } from "@/types/types";

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
      feeReceiverAddress: "",
    },
    onSubmit: ({
      stakingTokenAddress,
      shareTokenName,
      shareTokenSymbol,
      rewardTokenAddress,
      feePercentage,
      feeReceiverAddress,
    }) => {
      deployVault({
        stakingTokenAddress: stakingTokenAddress as EvmAddress,
        shareTokenName,
        shareTokenSymbol,
        rewardTokenAddress: rewardTokenAddress as EvmAddress,
        feePercentage: parseInt(feePercentage),
        feeReceiverAddress: feeReceiverAddress as EvmAddress,
      });
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <VStack gap={2} alignItems="flex-start">
        <Heading size={"md"}>Deploy new vault</Heading>
        <FormControl isRequired>
          <FormLabel>Staking token address</FormLabel>
          <Input
            name="stakingTokenAddress"
            variant="outline"
            value={form.values.stakingTokenAddress}
            onChange={form.handleChange}
          />
          <FormHelperText>
            Token that users can stake to the vault
          </FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Share token name (must be unique)</FormLabel>
          <Input
            name="shareTokenName"
            variant="outline"
            value={form.values.shareTokenName}
            onChange={form.handleChange}
          />
          <FormHelperText>Specific vault token name</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Share token symbol (must be unique)</FormLabel>
          <Input
            name="shareTokenSymbol"
            variant="outline"
            value={form.values.shareTokenSymbol}
            onChange={form.handleChange}
          />
          <FormHelperText>Specific vault token symbol</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Reward token address</FormLabel>
          <Input
            name="rewardTokenAddress"
            variant="outline"
            value={form.values.rewardTokenAddress}
            onChange={form.handleChange}
          />
          <FormHelperText>
            Token that will be rewarded to the vault stakers
          </FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Fee receiver address</FormLabel>
          <Input
            name="feeReceiverAddress"
            variant="outline"
            value={form.values.feeReceiverAddress}
            onChange={form.handleChange}
          />
          <FormHelperText>
            Wallet address that should receive fee rewards
          </FormHelperText>
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
