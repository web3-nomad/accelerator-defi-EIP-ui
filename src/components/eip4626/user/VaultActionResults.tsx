import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
} from "@chakra-ui/react";

type Props = {
  approveResult?: `0x${string}`;
  approveError?: Error | null;
  depositResult?: `0x${string}`;
  depositError?: Error | null;
  mintResult?: `0x${string}`;
  mintError?: Error | null;
  associateResult?: `0x${string}`;
  associateError?: Error | null;
};

export const VaultActionResults = ({
  approveResult,
  approveError,
  depositResult,
  depositError,
  mintError,
  mintResult,
  associateError,
  associateResult,
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
      {mintResult && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Mint success!</AlertTitle>
          <AlertDescription>TxId: {mintResult}</AlertDescription>
        </Alert>
      )}
      {mintError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Mint token error!</AlertTitle>
          <AlertDescription>{mintError.toString()}</AlertDescription>
        </Alert>
      )}
      {associateResult && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Associate success!</AlertTitle>
          <AlertDescription>TxId: {associateResult}</AlertDescription>
        </Alert>
      )}
      {associateError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Associate token error!</AlertTitle>
          <AlertDescription>{associateError.toString()}</AlertDescription>
        </Alert>
      )}
    </Flex>
  );
};
