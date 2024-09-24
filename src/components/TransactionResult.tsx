import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
} from "@chakra-ui/react";

export type ActionType =
  | "Deposit"
  | "Withdraw"
  | "Approve"
  | "Associate"
  | "Mint";

const getAlertTitle = (isSuccess = true, actionType: ActionType) => {
  return `${actionType} ${isSuccess ? "success" : "error"}`;
};

export const TransactionResult = ({
  actionType,
  transactionResult,
  transactionError,
}: {
  actionType: ActionType;
  transactionResult?: `0x${string}`;
  transactionError?: Error | null;
}) => {
  return (
    <Flex direction="column" mt="4" gap="2">
      {transactionResult && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>{getAlertTitle(true, actionType)}</AlertTitle>
          <AlertDescription>TxId: {transactionResult}</AlertDescription>
        </Alert>
      )}
      {transactionError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{getAlertTitle(false, actionType)}</AlertTitle>
          <AlertDescription>{transactionError.toString()}</AlertDescription>
        </Alert>
      )}
    </Flex>
  );
};
