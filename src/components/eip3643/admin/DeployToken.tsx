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
import {
  countryAllowModuleAddress,
  hederaNftAddress,
  maxOwnershipByCountryModuleAddress,
  maxTenPercentOwnershipModuleAddress,
  onlyUsaModuleAddress,
  requiresNftModuleAddress,
  transferLimitOneHundredModuleAddress,
} from "@/services/contracts/wagmiGenActions";
import { MenuSelect } from "@/components/MenuSelect";
import { useCallback, useState } from "react";
import { EvmAddress } from "@/types/types";

export const complianceModulesList = [
  {
    label: "None",
    value: "",
  },
  {
    label: "Only USA identities allowed",
    value: onlyUsaModuleAddress,
  },
  {
    label: "Transfer limit of 100 tokens",
    value: transferLimitOneHundredModuleAddress,
  },
  {
    label: "Max 10% of token supply ownership",
    value: maxTenPercentOwnershipModuleAddress,
  },
  {
    label: "Requires NFT to be present",
    value: requiresNftModuleAddress,
  },
  {
    label: "Only identities from allowed countries list",
    value: countryAllowModuleAddress,
  },
  {
    label: "Max % of token supply ownership by identity country",
    value: maxOwnershipByCountryModuleAddress,
  },
];

export default function DeployToken({ onClose = () => {} }) {
  const {
    error,
    isPending,
    data: deployResult,
    mutateAsync: deployToken,
  } = useDeployToken();

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      symbol: "",
      decimals: 18,
      nftAddress: "", //
      complianceModules: [] as EvmAddress[],
      complianceSettings: [] as EvmAddress[],
    },
    onSubmit: ({
      name,
      symbol,
      decimals,
      nftAddress,
      complianceModules,
      complianceSettings,
    }) => {
      //@TODO add validation for not filled fields of selected compl module - nft address, percentages etc
      //prevent submit if not filled

      console.log("L56 onsubmit ===", complianceModules, complianceSettings);

      deployToken({
        name,
        symbol,
        decimals,
        nftAddress: nftAddress as `0x${string}`,
        complianceModules,
        complianceSettings,
      });
    },
  });

  const [complianceModuleSelected, setComplianceModuleSelected] = useState("");
  const handleComplianceModuleSelect = (value: string) => {
    console.log("L90 value ===", value); //this is addy
    setComplianceModuleSelected(value);
    form.setValues((prev) => ({
      ...prev,
      complianceModules: [value as EvmAddress],
      complianceSettings: [],
    }));
  };

  // const handleAddressSelection = (value: string | number) => {
  //   form.setValues((prev) => ({
  //     ...prev,
  //     toAddress: value?.toString(),
  //   }));
  // };

  const showComplianceModule = useCallback(() => {
    console.log("L127 showComplianceModule RUN ===");
    console.log(
      "L128 showComplianceModule selected module ===",
      complianceModuleSelected,
    );
    switch (complianceModuleSelected) {
      case requiresNftModuleAddress:
        return (
          <FormControl>
            <FormLabel>NFT address for compliance module (optional)</FormLabel>
            <Input
              name="nftAddress"
              variant="outline"
              value={form.values.nftAddress}
              onChange={form.handleChange}
            />
            <FormHelperText>
              <Button
                onClick={() => {
                  form.setFieldValue("nftAddress", hederaNftAddress);
                }}
              >
                Use demo NFT address
              </Button>
            </FormHelperText>
            <FormHelperText>
              If entered, it will be required for the token operators to have an
              NFT of the provided address. If empty, compliance functionality
              will be ignored.
            </FormHelperText>
          </FormControl>
        );

      case onlyUsaModuleAddress:
        return null;
    }
  }, [complianceModuleSelected, form]);

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
          <FormLabel>Select compliance module to add (optional)</FormLabel>
          <MenuSelect
            buttonProps={{ style: { width: "50%" } }}
            label="Select compliance module"
            data={complianceModulesList}
            onTokenSelect={handleComplianceModuleSelect}
          />
          <FormHelperText>
            Selected compliance module:{" "}
            {!form.values.complianceModules.length
              ? "None"
              : complianceModulesList.find(
                  (module) => module.value === form.values.complianceModules[0],
                )?.label}
          </FormHelperText>
        </FormControl>

        {showComplianceModule()}

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
