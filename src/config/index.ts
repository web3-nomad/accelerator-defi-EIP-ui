import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { hederaTestnet } from "wagmi/chains";
import { injected, walletConnect } from "@wagmi/connectors";

import { networkConfig } from "./networks";
import { AppConfig } from "./type";
import * as constants from "./constants";

export * from "./type";

export const appConfig: AppConfig & {
  constants: typeof constants;
} = {
  networks: networkConfig,
  constants,
};
