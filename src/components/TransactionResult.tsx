import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
} from "@chakra-ui/react";

export enum ActionName {
  Deposit = "Deposit",
  Withdraw = "Withdraw",
  Approve = "Approve",
  Associate = "Associate",
  Mint = "Mint",
  Claim = "Claim",
}

const getAlertTitle = (isSuccess = true, actionType?: ActionName) => {
  return `${actionType} ${isSuccess ? "success" : "error"}`;
};

export const TransactionResult = ({
  actionName,
  transactionResult,
  transactionError,
}: {
  actionName: ActionName | undefined;
  transactionResult: `0x${string}` | undefined;
  transactionError: Error | null | undefined;
}) => {
  if (!actionName || !(transactionResult && transactionError)) {
    return null;
  }

  return (
    <Flex direction="column" mt="4" gap="2">
      {transactionResult && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>{getAlertTitle(true, actionName)}</AlertTitle>
          <AlertDescription>TxId: {transactionResult}</AlertDescription>
        </Alert>
      )}
      {transactionError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{getAlertTitle(false, actionName)}</AlertTitle>
          <AlertDescription>{transactionError.toString()}</AlertDescription>
        </Alert>
      )}
    </Flex>
  );
};
