import EventsTest from "@/components/eip3643/user/EventsTest";
import TransferToken from "@/components/eip3643/user/TransferToken";
import DeployedTokensList from "@/components/eip3643/user/DeployedTokensList";

export default function User() {
  return (
    <>
      {/* <EventsTest /> */}

      <TransferToken />

      <DeployedTokensList />
    </>
  );
}
