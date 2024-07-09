import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

type Props = {
  error?: boolean;
  transformed?: string;
};

export const AccountIdResult = ({ error, transformed }: Props) => {
  if (error) {
    return (
      <Alert status="error" mt="4">
        <AlertIcon />
        <AlertTitle>Hedera Account detected in input!</AlertTitle>
        <AlertDescription>
          Hedera Account Id detected. But here is an error converting it to EVM
          address.
        </AlertDescription>
      </Alert>
    );
  } else if (transformed) {
    return (
      <Alert status="success" mt="4">
        <AlertIcon />
        <AlertTitle>Hedera Account detected in input!</AlertTitle>
        <AlertDescription>
          Hedera account converted to {transformed}.
        </AlertDescription>
      </Alert>
    );
  }

  return <></>;
};
