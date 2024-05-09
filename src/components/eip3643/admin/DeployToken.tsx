import { useFormik } from "formik";
import { useDeployToken } from "@/hooks/mutations/useDeployToken";
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
    mutateAsync: deployToken,
  } = useDeployToken();

  const form = useFormik({
    initialValues: {
      name: "",
      symbol: "",
      decimals: 18,
      nftAddress: "",
    },
    onSubmit: ({ name, symbol, decimals, nftAddress }) => {
      deployToken({
        name,
        symbol,
        decimals,
        nftAddress: nftAddress as `0x${string}`,
      });
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <VStack gap={2} alignItems="flex-start">
        <Heading size={"md"}>Deploy new token</Heading>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            variant="outline"
            value={form.values.name}
            onChange={form.handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Symbol</FormLabel>
          <Input
            name="symbol"
            variant="outline"
            value={form.values.symbol}
            onChange={form.handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Decimals</FormLabel>
          <NumberInput
            name="decimals"
            variant="outline"
            value={form.values.decimals}
            min={0}
            max={18}
            onChange={(val) => form.setFieldValue("decimals", val)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>NFT address for compliance module (optional)</FormLabel>
          <Input
            name="nftAddress"
            variant="outline"
            value={form.values.nftAddress}
            onChange={form.handleChange}
          />
          <FormHelperText>
            If entered, it will be required for the token operators to have an
            NFT of the provided address. If empty, compliance functionality will
            be ignored.
          </FormHelperText>
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
