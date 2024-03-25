import { defineConfig } from "@wagmi/cli";
import { fetch, react, actions } from "@wagmi/cli/plugins";

const contracts = [
  {
    name: "MeaningOfLife",
    address: "0x0000000000000000000000000000000000000001",
    url: `https://raw.githubusercontent.com/web3-nomad/accelerator-defi-EIP/main/data/abis/MeaningOfLife.json`,
  },
  {
    name: "ERC20",
    address: "0x0000000000000000000000000000000000000002",
    url: `https://raw.githubusercontent.com/Swiss-Digital-Assets-Institute/token-wrapper/main/artifacts/contracts/ERC20.sol/ERC20.json`,
  },
];

export default defineConfig({
  out: "src/services/contracts/wagmi-gen-actions.ts",
  plugins: [
    //    react(),
    actions(),
    fetch({
      cacheDuration: 1,
      contracts: contracts.map((item) => ({
        name: item.name,
        address: item.address as `0x${string}`,
      })),
      async parse({ response }) {
        const json = await response.json();
        if (json.status === "0") throw new Error(json.message);
        return json.abi;
      },
      request(contract) {
        const url = contracts.find(
          (item) => item.address === contract.address,
        )?.url;
        if (!url) throw new Error("Cannot find url for " + contract.address);
        return {
          url,
        };
      },
    }),
  ],
});
