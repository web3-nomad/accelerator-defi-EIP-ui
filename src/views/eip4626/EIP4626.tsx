import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useWalletInterface } from "@/services/wallets/useWalletInterface";
import Admin from "@/components/eip4626/Admin";
import User from "@/components/eip4626/User";
import NoWalletConnected from "@/components/NoWalletConnected";
import { WatchContractEventReturnType } from "@/services/contracts/watchContractEvent";
import { useContext, useEffect, useState } from "react";
import { Eip4626Context } from "@/contexts/Eip4626Context";
import {
  readTokenName,
  readHtsTokenTokenAddress,
  watchHtsTokenFactoryTokenDeployedEvent,
  watchVaultFactoryVaultDeployedEvent,
} from "@/services/contracts/wagmiGenActions";

export default function EIP4626() {
  const { accountId } = useWalletInterface();
  const [tabIndex, setTabIndex] = useState(0);
  const {
    setDeployedVaults,
    setDeployedProxyHtsTokens,
    setDeployedHtsTokenNames,
    deployedProxyHtsTokens,
  } = useContext(Eip4626Context);

  useEffect(() => {
    deployedProxyHtsTokens.forEach((token) => {
      readHtsTokenTokenAddress({}, token).then((value) => {
        readTokenName({}, (value as unknown as `0x${string}`[])[0]).then(
          (data) => {
            setDeployedHtsTokenNames((prev: any) => ({
              ...prev,
              [token]: data[0],
            }));
          },
        );
      });
    });
  }, [deployedProxyHtsTokens, setDeployedHtsTokenNames]);

  useEffect(() => {
    const unsub: WatchContractEventReturnType =
      watchVaultFactoryVaultDeployedEvent({
        onLogs: (data) => {
          setDeployedVaults(((prev: any) => {
            return [...prev, ...data];
          }) as any);
        },
      });
    return () => {
      unsub();
    };
  }, [setDeployedVaults]);

  useEffect(() => {
    const unsub: WatchContractEventReturnType =
      watchHtsTokenFactoryTokenDeployedEvent({
        onLogs: (data) => {
          setDeployedProxyHtsTokens(((prev: any) => {
            return [
              ...prev,
              ...data
                .map((item: any) => item.args[0])
                .filter((item) => !prev.includes(item)),
            ];
          }) as any);
        },
      });
    return () => {
      unsub();
    };
  }, [setDeployedProxyHtsTokens]);

  if (!accountId) return <NoWalletConnected />;

  const updateTabIndex = (newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <>
      <Tabs tabIndex={tabIndex}>
        <TabList>
          <Tab>User Area</Tab>
          <Tab>Admin Area</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <User />
          </TabPanel>
          <TabPanel>
            <Admin />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
