import {
  Button,
  Flex,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Box,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalHeader,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { GroupBase } from "react-select";
import { useContext, useState, useEffect } from "react";
import { EvmAddress, TokenNameItem } from "@/types/types";
import { Eip3643Context } from "@/contexts/Eip3643Context";
import { MenuSelect } from "@/components/MenuSelect";
import {
  readTokenName,
  readTokenOwner,
} from "@/services/contracts/wagmiGenActions";
import { useTokenIdentityRegistry } from "@/hooks/useTokenIdentityRegistry";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { ManageAgents } from "./manage-agents/ManageAgents";
import { ManageIdentities } from "./manage-identities/ManageIdentities";

export const ManageRegistry = ({ isAgents }: { isAgents: boolean }) => {
  const [ownTokens, setOwnTokens] = useState<Array<TokenNameItem>>([]);
  const [selectedIdentity, setSelectedIdentity] = useState<{
    walletAddress: EvmAddress;
    identityAddress: EvmAddress;
  }>();
  const [selectedToken, setSelectedToken] = useState<TokenNameItem>();
  const { registry, registryIdentities } =
    useTokenIdentityRegistry(selectedToken);
  const [updateTxResult, setUpdateTxResult] = useState<string>();
  const [updateTxError, setUpdateTxError] = useState<string>();
  const { deployedTokens } = useContext(Eip3643Context);
  const { accountEvm } = useWalletInterface();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    (deployedTokens as any).map((item: any) => {
      const tokenAddress = item["args"]?.[0];
      tokenAddress &&
        readTokenOwner({}, tokenAddress).then((resOwner) => {
          resOwner[0].toString().toLowerCase() === accountEvm?.toLowerCase() &&
            readTokenName({}, tokenAddress).then((resName) => {
              setOwnTokens((prev) => {
                return [
                  ...prev.filter((itemSub) => itemSub.address !== tokenAddress),
                  {
                    address: tokenAddress,
                    name: resName[0],
                  },
                ];
              });
            });
        });
    });
  }, [accountEvm, deployedTokens, setOwnTokens]);

  const onEditIdentityRegistry = (identityRegistry: {
    walletAddress: EvmAddress;
    identityAddress: EvmAddress;
  }) => {
    onOpen();
    setSelectedIdentity(identityRegistry);
  };

  const handleTokenSelect = (tokenAddr: string) => {
    setSelectedToken(
      ownTokens.find((token) => token.address === (tokenAddr as string)),
    );
  };

  const selectedRegistryIdentity = registryIdentities.find(
    (identity) => identity.walletAddress === selectedIdentity?.walletAddress,
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent width="80%" pt="8">
          <ModalHeader mb="8">
            <Text fontSize={22} fontWeight="800" align="center" mb="2">
              Manage identity agents {"\b"}
            </Text>
            <Text fontSize={14} align="center">
              Identity address: {selectedRegistryIdentity?.identityAddress}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isAgents ? (
              <ManageAgents
                onClose={onClose}
                setUpdateTxError={setUpdateTxError}
                setUpdateTxResult={setUpdateTxResult}
                registry={registry}
              />
            ) : (
              <ManageIdentities
                onClose={onClose}
                setUpdateTxError={setUpdateTxError}
                setUpdateTxResult={setUpdateTxResult}
                registry={registry}
                selectedIdentity={selectedIdentity}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Flex direction="column" gap="2" pt="8">
        <Flex direction="column">
          <Text fontSize={20} fontWeight="800" mb="5">
            Select Token
          </Text>
          <Box width="50%">
            <MenuSelect
              loadingInProgress={!ownTokens?.length}
              styles={{
                container: (base) => ({
                  ...base,
                  width: "45%",
                }),
              }}
              data={
                ownTokens.map((tok) => ({
                  value: tok.address,
                  label: tok.name,
                })) as unknown as GroupBase<string | number>[]
              }
              label="Select token to manage identities"
              onTokenSelect={handleTokenSelect}
            />
          </Box>
          {selectedToken && (
            <Text fontWeight="bold" mt="2" style={{ fontSize: 14 }}>
              Selected token: {selectedToken?.name} ({selectedToken?.address}){" "}
              <br />
              Selected registry: {registry}
            </Text>
          )}
        </Flex>
        <Divider my={10} />
        <Flex direction="column">
          {registryIdentities?.length ? (
            <Flex direction="column">
              <Text fontSize={20} fontWeight="800" mb="4">
                Token Identities
              </Text>
              <Table>
                <Thead>
                  {registryIdentities.map((identityRegistry) => (
                    <Tr key={identityRegistry.walletAddress}>
                      {["identity", "actions"].map((column) => (
                        <Th key={column}>
                          <Text fontWeight="800">{column}</Text>
                        </Th>
                      ))}
                    </Tr>
                  ))}
                </Thead>
                <Tbody>
                  {registryIdentities.map((identityRegistry) => (
                    <Tr key={identityRegistry.identityAddress}>
                      <Td>
                        <Text fontSize={14}>
                          {identityRegistry.identityAddress}
                        </Text>
                      </Td>
                      <Td>
                        <Button
                          onClick={() =>
                            onEditIdentityRegistry(identityRegistry)
                          }
                          pl="6"
                          pr="6"
                        >
                          Edit identity
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Flex>
          ) : (
            <></>
          )}
        </Flex>
        <Flex direction="column">
          {updateTxResult && (
            <Alert status="success">
              <AlertIcon />
              <AlertTitle>Update success!</AlertTitle>
              <AlertDescription>TxId: {updateTxResult}</AlertDescription>
            </Alert>
          )}
          {updateTxError && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Update error!</AlertTitle>
              <AlertDescription>Reason: {updateTxError}</AlertDescription>
            </Alert>
          )}
        </Flex>
      </Flex>
    </>
  );
};
