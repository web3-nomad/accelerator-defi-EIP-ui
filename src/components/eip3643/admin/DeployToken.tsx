import { useFormik } from "formik";
import { useDeployToken } from "@/hooks/mutations/useDeployToken";
import {
  Button,
  Text,
  Input,
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
} from "@chakra-ui/react";

export default function DeployToken() {
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
    },
    onSubmit: ({ name, symbol, decimals }) => {
      deployToken({
        name,
        symbol,
        decimals,
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
            variant="filled"
            value={form.values.name}
            onChange={form.handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Symbol</FormLabel>
          <Input
            name="symbol"
            variant="filled"
            value={form.values.symbol}
            onChange={form.handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Decimals</FormLabel>
          <NumberInput
            name="decimals"
            variant="filled"
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
        <Button type="submit" isLoading={isPending}>
          Deploy
        </Button>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Deploy error!</AlertTitle>
            <AlertDescription>{error.toString()}</AlertDescription>
          </Alert>
        )}
        {deployResult && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle>Deploy success!</AlertTitle>
            <AlertDescription>TxId: {deployResult}</AlertDescription>
          </Alert>
        )}
      </VStack>
    </form>
  );
}
