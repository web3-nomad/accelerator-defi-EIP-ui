import { defineConfig } from "@wagmi/cli";
import { fetch, react, actions } from "@wagmi/cli/plugins";

type RawJson = {
  [k: string]: {
    [contractName: string]: string;
  };
};

type Contracts = Array<{
  name: string;
  address: string;
  url: string;
}>;

const rawJson: RawJson = {
  implementations: {
    Token: "0xb54ffB10566aED06D9292b1B9Ce85d86E68EB00E",
    ClaimTopicsRegistry: "0x7C5803D5703aba58C0fdA80b318F3ccA48346ED2",
    TrustedIssuersRegistry: "0xFeb1b01720b590Ec9D4609fD42a1380B87b09336",
    IdentityRegistryStorage: "0xfA112d166DB1128671a6db414106db18575f371F",
    IdentityRegistry: "0x32f8aEb90ba4f0eaBcB4134a3c9d36E2f8d2970E",
    ModularCompliance: "0x99339bA4627179775FF3390Abd5cbFBD46835090",
    Identity: "0xFCE67bb91482b10a2bA9feE0F5291069df041A9a",
    ImplementationAuthority: "0x3259690Cc310E532c9b2D68a6f1496084ccf9573",
  },
  factories: {
    IIdFactory: "0xB82cD6B012f14d19ff17084e7f2D00811FC6450D",
    TREXImplementationAuthority: "0x6E00fEe5bfD308eC99672a4365B653f893Db9032",
    TREXFactory: "0xF876543047f08c52f5459BdffC192D41C39B189f",
  },
  compliance: {
    RequiresNFTModule: "0xe52C9FD90F31F57Db36AfFF4212228276D1c2676",
    CountryAllowModule: "0xAb5b7F9BAE717fC6Df8Ecc42685A8bDd3D5d1017",
  },
  vault: {},
};

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
  out: "src/services/contracts/wagmi-gen-actions.ts",
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
