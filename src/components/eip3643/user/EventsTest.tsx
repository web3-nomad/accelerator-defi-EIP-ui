import { Button, Heading, VStack } from "@chakra-ui/react";

import { watchTrexFactoryTrexSuiteDeployedEvent } from "@/services/contracts/wagmiGenActions";

export default function EventsTest() {
  return (
    <VStack gap={2} alignItems="flex-start">
      <Heading size={"md"}>EventsTest</Heading>

      <Button
        onClick={async () => {
          console.log("EVENT start");
          const unsub = await watchTrexFactoryTrexSuiteDeployedEvent({
            onLogs: (data) => {
              console.log("EVENT onLogs", data);
            },
          });

          // unsub after 10 secs
          setTimeout(() => {
            unsub();
            console.log("EVENT unsub");
          }, 10000);
        }}
      >
        Fetch+watch
      </Button>
    </VStack>
  );
}
