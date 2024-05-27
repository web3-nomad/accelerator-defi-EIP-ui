import TransferToken from "@/components/eip3643/user/TransferToken";
import DeployedTokensList from "@/components/eip3643/user/DeployedTokensList";

export default function User() {
  return (
    <>
      <TransferToken />

      <DeployedTokensList />
    </>
  );
}
