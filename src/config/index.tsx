// import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, walletConnect } from "@wagmi/connectors";

//@TODO create prod id and move to env
// Get projectId at https://cloud.walletconnect.com
// export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
export const projectId = "1c80b9743b6bb6c2e7e615647dde0c74";

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
