import { defineConfig } from "@wagmi/cli";
import { fetch, actions } from "@wagmi/cli/plugins";
import fs from "fs";

type RawJson = {
  [k: string]: {
    [contractName: string]: string;
  };
};

const rawJson: RawJson = JSON.parse(
  fs.readFileSync("./scripts/download-json.json").toString(),
);

type Contracts = Array<{
  name: string;
  address: string;
  url: string;
}>;

const contracts: Contracts = [
  {
    name: "MeaningOfLife",
    address: "0x8546fc43a9F2dC6A10a2d3155f653F30B18eD56d",
    url: `https://raw.githubusercontent.com/web3-nomad/accelerator-defi-EIP/main/data/abis/MeaningOfLife.json`,
  },
  {
    name: "ERC20",
    address: "0x0000000000000000000000000000000000387719",
    url: `https://raw.githubusercontent.com/Swiss-Digital-Assets-Institute/token-wrapper/main/artifacts/contracts/ERC20.sol/ERC20.json`,
  },
  //@TODO move to 296.json and find the way to get bytecode, as wagmi generates only ABIs
  // {
  //   name: "IdentityProxy",
  //   address: "0x0000000000000000000000000000000000000000",
  //   url: "https://raw.githubusercontent.com/web3-nomad/accelerator-defi-EIP/main/data/abis/IdentityProxy.json",
  // },
];

for (const key in rawJson) {
  for (const contractName in rawJson[key]) {
    contracts.push({
      name: contractName,
      address: rawJson[key][contractName],
      url: `https://raw.githubusercontent.com/CamposBruno/accelerator-defi-EIP/fix/deployment/data/abis/${contractName}.json`,
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
