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
  RadioGroup,
  Radio,
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
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { CountryCodesISO, EvmAddress } from "@/types/types";
import { GroupBase } from "react-select";
import { ethers } from "ethers";

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
    label: "Transfer limit of 100 tokens max",
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

export default function DeployToken({
  onClose = () => {},
  setTokenDeployInProgress,
  userDeployedTokens,
  tokenDeployInProgress,
}: {
  userDeployedTokens: {
    address: EvmAddress;
    name: string;
  }[];
  tokenDeployInProgress: boolean;
  setTokenDeployInProgress: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}) {
  const [complianceModuleSelected, setComplianceModuleSelected] = useState("");
  const [complianceError, setComplianceError] = useState("");
  const [lastDeployedTokenName, setLastDeployedTokenName] = useState<string>();

  const {
    error,
    isPending,
    data: deployResult,
    mutateAsync: deployToken,
  } = useDeployToken({
    onFinish: () => {
      setLastDeployedTokenName(undefined);
      setTokenDeployInProgress(false);
    },
  });

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      symbol: "",
      decimals: 18,
      nftAddress: "",
      maxOwnershipCountryCode: CountryCodesISO.US.toString(),
      maxOwnershipCountryLocalPercentage: 0,
      maxOwnershipCountryNonLocalPercentage: 0,
      complianceModules: [] as EvmAddress[],
      complianceSettings: [] as EvmAddress[],
    },
    onSubmit: ({
      name,
      symbol,
      decimals,
      complianceModules,
      complianceSettings,
    }) => {
      //@TODO add validation for not filled fields of selected compl module - nft address, percentages etc
      //prevent submit if not filled

      //@TODO add support of several modules per token

      setTokenDeployInProgress(true);
      deployToken({
        name,
        symbol,
        decimals,
        complianceModules,
        complianceSettings,
      });
    },
  });

  useEffect(() => {
    if (
      tokenDeployInProgress &&
      userDeployedTokens?.length &&
      userDeployedTokens?.find((tok) => tok.name === lastDeployedTokenName)
    ) {
      setTokenDeployInProgress(false);
      setLastDeployedTokenName(undefined);
    }
  }, [
    lastDeployedTokenName,
    setTokenDeployInProgress,
    tokenDeployInProgress,
    userDeployedTokens,
  ]);

  useEffect(() => {
    if (complianceModuleSelected === requiresNftModuleAddress) {
      if (form.values.nftAddress && ethers.isAddress(form.values.nftAddress)) {
        const requiresNftModuleCall = new ethers.Interface([
          "function requireNFT(address _nftAddress)",
        ]).encodeFunctionData("requireNFT", [form.values.nftAddress]);
        form.setFieldValue("complianceSettings", [requiresNftModuleCall]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.nftAddress]);

  useEffect(() => {
    if (complianceModuleSelected === maxOwnershipByCountryModuleAddress) {
      try {
        const maxOwnershipCountryModuleCall = new ethers.Interface([
          "function setMaxPercentage(uint16 _country, uint16 _maxLocal, uint16 _maxNonlocal)",
        ]).encodeFunctionData("setMaxPercentage", [
          Number(form.values.maxOwnershipCountryCode),
          Number(form.values.maxOwnershipCountryLocalPercentage),
          Number(form.values.maxOwnershipCountryNonLocalPercentage),
        ]);

        form.setFieldValue("complianceSettings", [
          maxOwnershipCountryModuleCall,
        ]);

        setComplianceError("");
      } catch (e) {
        console.error(e);
        setComplianceError(
          "There was an issue with encoding params for maxOwnershipCountryModule",
        );
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    form.values.maxOwnershipCountryCode,
    form.values.maxOwnershipCountryLocalPercentage,
    form.values.maxOwnershipCountryNonLocalPercentage,
    complianceModuleSelected,
  ]);

  const handleComplianceModuleSelect = (value: string) => {
    setComplianceModuleSelected(value);
    form.setValues((prev) => ({
      ...prev,
      complianceModules: value ? [value as EvmAddress] : [],
      complianceSettings: [],
    }));
  };

  const showComplianceModule = useCallback(() => {
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
                Fill with demo NFT address
              </Button>
            </FormHelperText>
            <FormHelperText>
              If entered, it will be required for the token operators to have an
              NFT of the provided address. If empty, compliance functionality
              will be ignored.
            </FormHelperText>
          </FormControl>
        );

      case maxOwnershipByCountryModuleAddress:
        return (
          <>
            <FormControl pt={10}>
              <FormLabel>
                Select identity residency to be considered local
              </FormLabel>
              <RadioGroup
                onChange={(value) => {
                  form.setFieldValue("maxOwnershipCountryCode", value);
                }}
                value={form.values.maxOwnershipCountryCode}
              >
                <Stack direction="row">
                  <Radio value={CountryCodesISO.US.toString()}>US</Radio>
                  <Radio value={CountryCodesISO.NON_US.toString()}>
                    Non US
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl pt={5}>
              <FormLabel>
                Max percentage of tokens owned by a local identity
              </FormLabel>
              <NumberInput
                name="maxOwnershipCountryLocalPercentage"
                variant="outline"
                value={form.values.maxOwnershipCountryLocalPercentage}
                min={0}
                max={10000}
                precision={0}
                onChange={(value) =>
                  form.setFieldValue(
                    "maxOwnershipCountryLocalPercentage",
                    value,
                  )
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <FormHelperText>
                Set value in basis points (e.g. 185 = 1.85%))
              </FormHelperText>
              <FormHelperText>
                Current value in % is:{" "}
                {form.values.maxOwnershipCountryLocalPercentage / 100}%
              </FormHelperText>
            </FormControl>

            <FormControl pt={5}>
              <FormLabel>
                Max percentage of tokens owned by a non-local identity
              </FormLabel>
              <NumberInput
                name="maxOwnershipCountryLocalPercentage"
                variant="outline"
                value={form.values.maxOwnershipCountryNonLocalPercentage}
                min={0}
                max={10000}
                precision={0}
                onChange={(value) =>
                  form.setFieldValue(
                    "maxOwnershipCountryNonLocalPercentage",
                    value,
                  )
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <FormHelperText>
                Set value in basis points (e.g. 185 = 1.85%))
              </FormHelperText>
              <FormHelperText>
                Current value in % is:{" "}
                {form.values.maxOwnershipCountryNonLocalPercentage / 100}%
              </FormHelperText>
            </FormControl>

            {complianceError && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>compliance module error!</AlertTitle>
                <AlertDescription>{complianceError}</AlertDescription>
              </Alert>
            )}
          </>
        );

      case onlyUsaModuleAddress:
      case transferLimitOneHundredModuleAddress:
      case maxTenPercentOwnershipModuleAddress:
        return null;
    }
  }, [complianceModuleSelected, complianceError, form]);

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
            label="Select compliance module"
            data={
              complianceModulesList as unknown as GroupBase<string | number>[]
            }
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
          <Stack spacing={4} direction="row" align="center" pt={5}>
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
              mt="4"
            >
              Close
            </Button>
          </>
        )}
      </VStack>
    </form>
  );
}
