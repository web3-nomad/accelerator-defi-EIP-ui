import { EvmAddress, TxActionName } from "@/types/types";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
} from "@chakra-ui/react";

export function TransactionResult({
  actionName,
  transactionResult,
  transactionError,
}: {
  actionName: TxActionName | string;
  transactionResult: EvmAddress | undefined;
  transactionError: Error | null;
}) {
  if (!actionName || !(transactionResult || transactionError)) {
    return null;
  }

  return (
    <Flex direction="column" mt="4" gap="2">
      {transactionResult && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>{`${actionName} success`}</AlertTitle>
          <AlertDescription>TxId: {transactionResult}</AlertDescription>
        </Alert>
      )}
      {transactionError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{`${actionName} error`}</AlertTitle>
          <AlertDescription>{transactionError.toString()}</AlertDescription>
        </Alert>
      )}
    </Flex>
  );
}
