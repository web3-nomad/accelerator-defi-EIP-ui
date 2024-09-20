import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
} from "@chakra-ui/react";

type Props = {
  approveResult?: `0x${string}`;
  approveError: Error | null;
  depositResult?: `0x${string}`;
  depositError: Error | null;
};

export const VaultActionResults = ({
  approveResult,
  approveError,
  depositResult,
  depositError,
}: Props) => {
  return (
    <Flex direction="column" mt="4" gap="2">
      {approveResult && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Approve success!</AlertTitle>
          <AlertDescription>TxId: {approveResult}</AlertDescription>
        </Alert>
      )}
      {approveError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Approve token error!</AlertTitle>
          <AlertDescription>{approveError.toString()}</AlertDescription>
        </Alert>
      )}
      {depositResult && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Deposit success!</AlertTitle>
          <AlertDescription>TxId: {depositResult}</AlertDescription>
        </Alert>
      )}
      {depositError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Deposit token error!</AlertTitle>
          <AlertDescription>{depositError.toString()}</AlertDescription>
        </Alert>
      )}
    </Flex>
  );
};
