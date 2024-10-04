import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Heading,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import { useContext, useMemo, useState } from "react";
import { useRegisterIdentity } from "@/hooks/mutations/useRegisterIdentity";
import { CountryCodesISO, EvmAddress, TokenNameItem } from "@/types/types";
import { Eip3643Context } from "@/contexts/Eip3643Context";
import { useTokenIdentityRegistry } from "@/hooks/useTokenIdentityRegistry";
import { MenuSelect } from "@/components/MenuSelect";
import { investorCountriesItems } from "@/components/manage-registry/manage-identities/ManageIdentities";
import { useReadTokenIsAgent } from "@/hooks/eip3643/useReadTokenIsAgent";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import { useReadTokenOwner } from "@/hooks/eip3643/useReadTokenOwner";
import { useReadIdentityRegistryInvestorCountry } from "@/hooks/eip3643/useReadIdentityRegistryInvestorCountry";
import { GroupBase } from "react-select";

export default function RegisterIdentity({
  tokenSelected,
}: {
  tokenSelected: TokenNameItem;
}) {
  const { accountEvm } = useWalletInterface();

  const { currentIdentityAddress, currentIdentityWallet } =
    useContext(Eip3643Context);
  const {
    data,
    mutateAsync: register,
    error,
    isPending,
  } = useRegisterIdentity();

  const { registry, registryIdentities } =
    useTokenIdentityRegistry(tokenSelected);

  const registryIdentityAddresses = registryIdentities.map(
    (identity) => identity.walletAddr,
  );

  const [selectedCountry, setSelectedCountry] = useState<CountryCodesISO>(
    CountryCodesISO.US,
  );

  const handleChangeIdentityCountry = (value: any) => {
    setSelectedCountry(value);
  };

  const isIdentityAddedToRegistry = useMemo(
    () =>
      Boolean(
        currentIdentityAddress &&
          registryIdentityAddresses.includes(
            currentIdentityWallet as EvmAddress,
          ),
      ),
    [currentIdentityAddress, registryIdentityAddresses, currentIdentityWallet],
  );

  const { data: isAgent } = useReadTokenIsAgent(
    tokenSelected.address,
    accountEvm as EvmAddress,
  );

  const { data: tokenOwnerAddress } = useReadTokenOwner(tokenSelected.address);

  const isCurrentUserATokenOwner = useMemo(
    () =>
      String(tokenOwnerAddress).toLowerCase() ==
      String(accountEvm).toLowerCase(),
    [tokenOwnerAddress, accountEvm],
  );

  const { data: countryStored } = useReadIdentityRegistryInvestorCountry(
    accountEvm as EvmAddress,
    registry as EvmAddress,
  );

  if (!tokenSelected || !accountEvm) return null;

  //@TODO fix detection if identity added to the registry
  //https://github.com/web3-nomad/accelerator-defi-EIP-ui/issues/80

  return (
    <>
      <Box mb={4}>
        <MenuSelect
          data={
            investorCountriesItems as unknown as GroupBase<string | number>[]
          }
          label="Select country"
          onTokenSelect={handleChangeIdentityCountry}
        />
        <FormControl>
          <FormHelperText>
            <b>Selected country:</b> {CountryCodesISO[selectedCountry]}
          </FormHelperText>
        </FormControl>
      </Box>

      <Button
        isDisabled={isIdentityAddedToRegistry}
        isLoading={isPending}
        size={"md"}
        onClick={async () => {
          register({
            address: currentIdentityWallet as EvmAddress,
            identity: currentIdentityAddress as EvmAddress,
            registry: registry as EvmAddress,
            country: selectedCountry,
          });
        }}
      >
        Add Identity to Registry{" "}
        {!currentIdentityAddress && "[Identity not created]"}
        {isIdentityAddedToRegistry && "[Already added] ✅"}
      </Button>

      <FormControl>
        <FormHelperText>
          <b>User Identity address:</b> {currentIdentityAddress}
        </FormHelperText>
        <FormHelperText>
          <b>Token Identity Registry address:</b> {registry}
        </FormHelperText>
        <FormHelperText>
          <b>User Identity is added to Registry:</b>{" "}
          {String(isIdentityAddedToRegistry)}
        </FormHelperText>
        <FormHelperText>
          <b>User has Token Owner role:</b> {String(isCurrentUserATokenOwner)}
        </FormHelperText>
        <FormHelperText>
          <b>User has Agent role:</b> {String(isAgent)}
        </FormHelperText>
        <FormHelperText>
          <b>User can add identity to registry:</b> {String(isAgent)}
        </FormHelperText>
        <FormHelperText>
          <b>User identity country:</b> {countryStored}
        </FormHelperText>
      </FormControl>

      {registryIdentityAddresses.length === 0 && (
        <Text>No identities found</Text>
      )}
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Register identity error!</AlertTitle>
          <AlertDescription>{error.toString()}</AlertDescription>
        </Alert>
      )}
      {data && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Register identity success!</AlertTitle>
          <AlertDescription>TxId: {data}</AlertDescription>
        </Alert>
      )}

      <Divider my={10} />

      <Heading size={"md"}>Wallet addresses with registered identities</Heading>
      <OrderedList>
        {registryIdentityAddresses.map((address) => (
          <ListItem key={address}>{address}</ListItem>
        ))}
      </OrderedList>
    </>
  );
}
