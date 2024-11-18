import {
  Flex,
  Button,
  Heading,
  Input,
  FormControl,
  FormHelperText,
  Checkbox,
} from "@chakra-ui/react";
import { MenuSelect } from "@/components/MenuSelect";
import { RebalancerModal } from "./RebalancerModal";
import { useState } from "react";
import { useTokenRebalancer } from "@/hooks/eip4626/mutations/useTokenRebalancer";
import { GroupBase } from "react-select";
import { EvmAddress } from "@/types/types";
import { TransactionResult } from "@/components/TransactionResult";

// todo: replace hardcode values with real one
const pythPriceIds = ["bytes32_pyth_oracle_id"];
const tokensToTrack = ["0x3e17e7B35daEc96F5D61b974b888b6bcfF2e5c8f"];

export const Rebalancer = () => {
  const [isModalsOpen, setIsModalsOpen] = useState({
    rebalance: false,
    addTrackingToken: false,
    setAllocationPercentage: false,
  });
  const [tokenPercentage, setTokenPercentage] = useState(0);
  const [newAllocationTokenPercentage, setNewAllocationTokenPercentage] =
    useState(0);
  const [token, setToken] = useState<EvmAddress>();
  const [isAutoCompaunder, setIsAutoCompaunder] = useState(true);
  const [newAllocationToken, setNewAllocationToken] = useState<EvmAddress>();
  const [pythPriceId, setPythPriceId] = useState<EvmAddress>();

  const {
    mutateAddTrackingToken,
    mutateRebalance,
    mutateSetAllocationPercentage,
    txState,
    addedTokens,
  } = useTokenRebalancer();

  const openAddTrackingToken = () => {
    setIsModalsOpen((prev) => ({
      ...prev,
      addTrackingToken: true,
    }));
  };

  const openSetAllocationPercentage = () => {
    setIsModalsOpen((prev) => ({
      ...prev,
      setAllocationPercentage: true,
    }));
  };

  const closeModal = (type: string) => {
    setIsModalsOpen((prev) => ({
      ...prev,
      [type]: false,
    }));
  };

  const handleNewAddTokenSelect = (value: string) => {
    setToken(value as unknown as EvmAddress);
  };

  const handleNewAllocationTokenSelect = (value: string) => {
    setNewAllocationToken(value as unknown as EvmAddress);
  };

  const handlePythOracleSelect = (value: string) => {
    setPythPriceId(value as EvmAddress);
  };

  return (
    <Flex direction="column" mt="6">
      <Heading size={"md"}>Rebalancer</Heading>
      <Flex gap="5" mt="5">
        <Button onClick={() => mutateRebalance()}>Rebalance</Button>
        <Button onClick={openAddTrackingToken}>Add tracking token</Button>
        <Button onClick={openSetAllocationPercentage}>
          Set allocation percentage
        </Button>
      </Flex>
      <RebalancerModal
        isOpen={isModalsOpen.addTrackingToken}
        title="Add tracking token"
        onClose={() => closeModal("addTrackingToken")}
      >
        <Flex direction="column" gap="5" paddingBottom="10" alignItems="center">
          <FormControl>
            <MenuSelect
              label="Select Token to track"
              data={
                tokensToTrack.map((tokenAddr) => ({
                  value: tokenAddr,
                  label: tokenAddr,
                })) as unknown as GroupBase<string | number>[]
              }
              onTokenSelect={handleNewAddTokenSelect}
            />
            <FormHelperText>
              New token address to be tracked by balancer
            </FormHelperText>
          </FormControl>
          <FormControl>
            <MenuSelect
              label="Select Pyth Oracle ID"
              data={
                pythPriceIds.map((id) => ({
                  value: id,
                  label: id,
                })) as unknown as GroupBase<string | number>[]
              }
              onTokenSelect={handlePythOracleSelect}
            />
            <FormHelperText>
              Phythical oracle address to use balances from
            </FormHelperText>
          </FormControl>
          <FormControl>
            <Input
              name="tokenAllocationPercentage"
              variant="outline"
              value={tokenPercentage}
              onChange={(e) => {
                setTokenPercentage(Number(e.target.value));
              }}
            />
            <FormHelperText>
              Allocation percentage (*100, example: 10% = 1000)
            </FormHelperText>
          </FormControl>
          <FormControl>
            <Checkbox
              isChecked={isAutoCompaunder}
              onChange={(e) => {
                setIsAutoCompaunder(e.target.checked);
              }}
            >
              Is auto compounder
            </Checkbox>
            <FormHelperText>Are auto compounded tokens</FormHelperText>
          </FormControl>
          <Button
            isDisabled={!tokenPercentage}
            maxWidth="50%"
            onClick={() =>
              mutateAddTrackingToken({
                token: token as EvmAddress,
                priceId: pythPriceId as EvmAddress,
                percentage: tokenPercentage,
                isAutoCompaunder,
              })
            }
          >
            Add tracking token
          </Button>
        </Flex>
      </RebalancerModal>
      <RebalancerModal
        isOpen={isModalsOpen.setAllocationPercentage}
        title="Set allocation percentage for a token"
        onClose={() => closeModal("setAllocationPercentage")}
      >
        <Flex direction="column" gap="5" paddingBottom="10" alignItems="center">
          <FormControl>
            <MenuSelect
              label="Select token to update allocation"
              data={
                addedTokens?.map((tokenAddr) => ({
                  value: tokenAddr,
                  label: tokenAddr,
                })) as unknown as GroupBase<string | number>[]
              }
              onTokenSelect={handleNewAllocationTokenSelect}
            />
            <FormHelperText>
              Token address to set a new allocation
            </FormHelperText>
          </FormControl>
          {newAllocationToken && (
            <FormControl>
              <Input
                name="newTokenAllocationPercentage"
                variant="outline"
                value={newAllocationTokenPercentage}
                onChange={(e) => {
                  setNewAllocationTokenPercentage(Number(e.target.value));
                }}
              />
              <FormHelperText>
                Allocation percentage (*100, example: 10% = 1000)
              </FormHelperText>
            </FormControl>
          )}
          <Button
            isDisabled={!newAllocationTokenPercentage}
            onClick={() =>
              mutateSetAllocationPercentage({
                token: newAllocationToken as EvmAddress,
                percentage: newAllocationTokenPercentage,
              })
            }
          >
            Set allocation percentage
          </Button>
        </Flex>
      </RebalancerModal>
      <TransactionResult
        actionName="Rebalance"
        transactionError={txState.rebalanceError}
        transactionResult={txState.rebalanceData}
      />
      <TransactionResult
        actionName="AddTrackingToken"
        transactionError={txState.addTrackingTokenError}
        transactionResult={txState.addTrackingTokenData}
      />
      <TransactionResult
        actionName="SetTokenAllocation"
        transactionError={txState.setAllocationPercentageError}
        transactionResult={txState.setAllocationPercentageData}
      />
    </Flex>
  );
};