import { defineConfig, loadEnv } from "@wagmi/cli";
import { fetch, actions } from "@wagmi/cli/plugins";
import fs from "fs";

type RawJson = {
  [k: string]: {
    [contractName: string]: string;
  };
};

const env = loadEnv({
  mode: process.env.NODE_ENV,
  envDir: process.cwd(),
});

const rawJson: RawJson = JSON.parse(
  fs.readFileSync("./scripts/download-json.json").toString(),
);

type Contracts = Array<{
  name: string;
  address: string;
  url: string;
}>;

const ignore = env.SYNC_CONTRACTS_IGNORE.split(";");

const contracts: Contracts = [
  {
    name: "ERC20",
    address: "0x0000000000000000000000000000000000387719", // Dummy address, will be overridden on every call
    url: `https://raw.githubusercontent.com/hashgraph/hedera-accelerator-defi-eip/main/data/abis/ERC20.json`,
  },
  {
    name: "OnlyUsaModule",
    address: "0xDaBdA04476928f0beeFA428721eD2a7E0E6Eb07a",
    url: `https://raw.githubusercontent.com/hashgraph/hedera-accelerator-defi-eip/79c4de63bf9bd4ce0b32939d404b4e674a3d49c6/data/abis/OnlyUsaModule.json`,
  },
  {
    name: "MaxTenPercentOwnershipModule",
    address: "0xb4224765b8d201D536d56Ce84654d687c26B3B7b",
    url: `https://raw.githubusercontent.com/hashgraph/hedera-accelerator-defi-eip/79c4de63bf9bd4ce0b32939d404b4e674a3d49c6/data/abis/MaxTenPercentOwnershipModule.json`,
  },
  {
    name: "TransferLimitOneHundredModule",
    address: "0xF29a8A633018984A19315D1080975FA793118076",
    url: `https://raw.githubusercontent.com/hashgraph/hedera-accelerator-defi-eip/79c4de63bf9bd4ce0b32939d404b4e674a3d49c6/data/abis/TransferLimitOneHundredModule.json`,
  },
];

for (const key in rawJson) {
  for (const contractName in rawJson[key]) {
    !ignore.includes(contractName) &&
      contracts.push({
        name: contractName,
        address: rawJson[key][contractName],
        url: `${env.SYNC_CONTRACTS_ABI_PATH}/${contractName}.json`,
      });
  }
}

export default defineConfig({
  out: "src/services/contracts/wagmiGenActions.ts",
  plugins: [
    actions(),
    fetch({
      cacheDuration: 1,
      contracts: contracts.map((item) => ({
        name: item.name,
        address: item.address as `0x${string}`,
      })),
      async parse({ response }) {
        try {
          if (response.status === 404)
            throw new Error("Contract abi .json file fetch failed - Not Found");

          const json = await response.json();
          if (json.status === "0") throw new Error(JSON.stringify(response));
          return json.abi;
        } catch (e) {
          console.error(e);
          throw new Error(JSON.stringify(e));
        }
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
