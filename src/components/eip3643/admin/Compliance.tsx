import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { TokenNameItem } from "@/types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/hooks/types";
import {
  hederaNftAddress,
  readModularComplianceGetModules,
  readTokenCompliance,
  readTokenName,
  watchModularComplianceModuleAddedEvent,
} from "@/services/contracts/wagmiGenActions";
import { useEffect, useState } from "react";
import { WatchContractEventReturnType } from "viem";
import { useFormik } from "formik";
import { useAddRequiresNFTModule } from "@/hooks/mutations/useAddRequiresNFTModule";
import { useCallModuleFunction } from "@/hooks/mutations/useCallModuleFunction";

export default function Compliance({
  tokenSelected,
}: {
  tokenSelected: TokenNameItem | null;
}) {
  const queryClient = useQueryClient();

  const { data: modularComplianceAddress } = useQuery({
    enabled: !!tokenSelected?.address,
    queryKey: [QueryKeys.ReadTokenCompliance, tokenSelected?.address],
    queryFn: () => readTokenCompliance({}, tokenSelected?.address),
  });

  const { data: addedModules } = useQuery({
    enabled: !!modularComplianceAddress,
    queryKey: [
      QueryKeys.ReadModularComplianceGetModules,
      modularComplianceAddress,
    ],
    queryFn: () =>
      readModularComplianceGetModules(
        {},
        modularComplianceAddress?.toString() as `0x${string}`,
      ),
  });

  const {
    mutateAsync: addRequiresNFTModule,
    error: addRequiresNFTModuleError,
    data: addRequiresNFTModuleData,
    isPending: addRequiresNFTModulePending,
  } = useAddRequiresNFTModule();

  const {
    mutateAsync: callModuleFunction,
    error: callModuleFunctionError,
    data: callModuleFunctionData,
    isPending: callModuleFunctionPending,
  } = useCallModuleFunction();

  const form = useFormik({
    initialValues: {
      nftAddress: "",
    },
    onSubmit: ({ nftAddress }) => {
      addRequiresNFTModule(
        { modularComplianceAddress },
        {
          onSuccess: async () => {
            await callModuleFunction({ nftAddress, modularComplianceAddress });
            queryClient.invalidateQueries({
              queryKey: [QueryKeys.ReadModularComplianceGetModules],
            });
          },
        },
      );
    },
  });

  return (
    <>
      <Heading size={"md"}>Compliance</Heading>
      <Text>
        ModularCompliance address of current selected token:{" "}
        {modularComplianceAddress}
      </Text>
      <Text>
        Modules added: {addedModules && addedModules.map((module) => module)}
      </Text>

      <Divider my={10} />

      <Heading size={"md"}>
        Compliance, add RequiresNFTModule module (2 step process)
      </Heading>
      <form onSubmit={form.handleSubmit}>
        <VStack gap={2} alignItems="flex-start">
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
                Use demo NFT
              </Button>
            </FormHelperText>
            <FormHelperText>
              If entered, it will be required for the token operators to have an
              NFT of the provided address. If empty, compliance functionality
              will be ignored.
            </FormHelperText>
            <Button
              type="submit"
              isLoading={
                addRequiresNFTModulePending || callModuleFunctionPending
              }
              isDisabled={!form.values.nftAddress}
            >
              Deploy
            </Button>
          </FormControl>

          {addRequiresNFTModuleData && (
            <Alert status="success">
              <AlertIcon />
              <AlertTitle>AddRequiresNFTModule success!</AlertTitle>
              <AlertDescription>
                TxId: {addRequiresNFTModuleData}
              </AlertDescription>
            </Alert>
          )}
          {addRequiresNFTModuleError && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>addRequiresNFTModuleError error!</AlertTitle>
              <AlertDescription>
                {addRequiresNFTModuleError.toString()}
              </AlertDescription>
            </Alert>
          )}

          {callModuleFunctionData && (
            <Alert status="success">
              <AlertIcon />
              <AlertTitle>callModuleFunctionData success!</AlertTitle>
              <AlertDescription>
                TxId: {callModuleFunctionData}
              </AlertDescription>
            </Alert>
          )}
          {callModuleFunctionError && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>callModuleFunctionError error!</AlertTitle>
              <AlertDescription>
                {callModuleFunctionError.toString()}
              </AlertDescription>
            </Alert>
          )}
        </VStack>
      </form>
    </>
  );
}
