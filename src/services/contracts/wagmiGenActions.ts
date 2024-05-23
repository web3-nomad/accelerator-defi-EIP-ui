import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from "./codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ClaimTopicsRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const claimTopicsRegistryAbi = [
  { type: "error", inputs: [], name: "InvalidInitialization" },
  { type: "error", inputs: [], name: "NotInitializing" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "claimTopic",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "ClaimTopicAdded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "claimTopic",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "ClaimTopicRemoved",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "version",
        internalType: "uint64",
        type: "uint64",
        indexed: false,
      },
    ],
    name: "Initialized",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "function",
    inputs: [{ name: "_claimTopic", internalType: "uint256", type: "uint256" }],
    name: "addClaimTopic",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "getClaimTopics",
    outputs: [{ name: "", internalType: "uint256[]", type: "uint256[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_claimTopic", internalType: "uint256", type: "uint256" }],
    name: "removeClaimTopic",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export const claimTopicsRegistryAddress =
  "0x6396f3444dc7b0E06E5D6453bf367E9dfa7A635C" as const;

export const claimTopicsRegistryConfig = {
  address: claimTopicsRegistryAddress,
  abi: claimTopicsRegistryAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CountryAllowModule
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const countryAllowModuleAbi = [
  {
    type: "error",
    inputs: [
      { name: "_compliance", internalType: "address", type: "address" },
      { name: "_country", internalType: "uint16", type: "uint16" },
    ],
    name: "CountryAlreadyAllowed",
  },
  {
    type: "error",
    inputs: [
      { name: "_compliance", internalType: "address", type: "address" },
      { name: "_country", internalType: "uint16", type: "uint16" },
    ],
    name: "CountryNotAllowed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_compliance",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "ComplianceBound",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_compliance",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "ComplianceUnbound",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_compliance",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "_country",
        internalType: "uint16",
        type: "uint16",
        indexed: false,
      },
    ],
    name: "CountryAllowed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_compliance",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "_country",
        internalType: "uint16",
        type: "uint16",
        indexed: false,
      },
    ],
    name: "CountryUnallowed",
  },
  {
    type: "function",
    inputs: [{ name: "_country", internalType: "uint16", type: "uint16" }],
    name: "addAllowedCountry",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_countries", internalType: "uint16[]", type: "uint16[]" },
    ],
    name: "batchAllowCountries",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_countries", internalType: "uint16[]", type: "uint16[]" },
    ],
    name: "batchDisallowCountries",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_compliance", internalType: "address", type: "address" }],
    name: "bindCompliance",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "canComplianceBind",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_compliance", internalType: "address", type: "address" }],
    name: "isComplianceBound",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_compliance", internalType: "address", type: "address" },
      { name: "_country", internalType: "uint16", type: "uint16" },
    ],
    name: "isCountryAllowed",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "isPlugAndPlay",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_value", internalType: "uint256", type: "uint256" },
    ],
    name: "moduleBurnAction",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "_compliance", internalType: "address", type: "address" },
    ],
    name: "moduleCheck",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_to", internalType: "address", type: "address" },
      { name: "_value", internalType: "uint256", type: "uint256" },
    ],
    name: "moduleMintAction",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_value", internalType: "uint256", type: "uint256" },
    ],
    name: "moduleTransferAction",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "_name", internalType: "string", type: "string" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [{ name: "_country", internalType: "uint16", type: "uint16" }],
    name: "removeAllowedCountry",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_compliance", internalType: "address", type: "address" }],
    name: "unbindCompliance",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export const countryAllowModuleAddress =
  "0x73627F621c88A37B3cf212D33716531E53ffd460" as const;

export const countryAllowModuleConfig = {
  address: countryAllowModuleAddress,
  abi: countryAllowModuleAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  {
    type: "function",
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "nonces",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
      { name: "v", internalType: "uint8", type: "uint8" },
      { name: "r", internalType: "bytes32", type: "bytes32" },
      { name: "s", internalType: "bytes32", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
] as const;

export const erc20Address =
  "0x0000000000000000000000000000000000387719" as const;

export const erc20Config = { address: erc20Address, abi: erc20Abi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HederaVault
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const hederaVaultAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "_underlying", internalType: "contract ERC20", type: "address" },
      { name: "_name", internalType: "string", type: "string" },
      { name: "_symbol", internalType: "string", type: "string" },
      {
        name: "_feeConfig",
        internalType: "struct FeeConfiguration.FeeConfig",
        type: "tuple",
        components: [
          { name: "receiver", internalType: "address", type: "address" },
          { name: "token", internalType: "address", type: "address" },
          { name: "feePercentage", internalType: "uint256", type: "uint256" },
        ],
      },
      {
        name: "_vaultRewardController",
        internalType: "address",
        type: "address",
      },
      {
        name: "_feeConfigController",
        internalType: "address",
        type: "address",
      },
    ],
    stateMutability: "payable",
  },
  { type: "error", inputs: [], name: "AccessControlBadConfirmation" },
  {
    type: "error",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "neededRole", internalType: "bytes32", type: "bytes32" },
    ],
    name: "AccessControlUnauthorizedAccount",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "AddressInsufficientBalance",
  },
  { type: "error", inputs: [], name: "FailedInnerCall" },
  { type: "error", inputs: [], name: "MaxRewardTokensAmount" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  { type: "error", inputs: [], name: "ReentrancyGuardReentrantCall" },
  {
    type: "error",
    inputs: [
      { name: "numberOfShares", internalType: "uint256", type: "uint256" },
    ],
    name: "ZeroShares",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "createdToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "CreatedToken",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "receiver",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "assets",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "shares",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Deposit",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "feeConfig",
        internalType: "struct FeeConfiguration.FeeConfig",
        type: "tuple",
        components: [
          { name: "receiver", internalType: "address", type: "address" },
          { name: "token", internalType: "address", type: "address" },
          { name: "feePercentage", internalType: "uint256", type: "uint256" },
        ],
        indexed: false,
      },
    ],
    name: "FeeConfigUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "rewardToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "RewardAdded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "previousAdminRole",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "newAdminRole",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
    ],
    name: "RoleAdminChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RoleGranted",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RoleRevoked",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "receiver",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "assets",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "shares",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Withdraw",
  },
  {
    type: "function",
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "FEE_CONFIG_CONTROLLER_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "VAULT_REWARD_CONTROLLER_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_token", internalType: "address", type: "address" },
      { name: "_amount", internalType: "uint256", type: "uint256" },
    ],
    name: "addReward",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "asset",
    outputs: [{ name: "", internalType: "contract ERC20", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "assetTotalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "user", internalType: "address", type: "address" }],
    name: "assetsOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "assetsPerShare",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_id", internalType: "uint256", type: "uint256" }],
    name: "calculateReward",
    outputs: [{ name: "reward", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_startPosition", internalType: "uint256", type: "uint256" },
    ],
    name: "claimAllReward",
    outputs: [
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "assets", internalType: "uint256", type: "uint256" },
      { name: "receiver", internalType: "address", type: "address" },
    ],
    name: "deposit",
    outputs: [{ name: "shares", internalType: "uint256", type: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "feeConfig",
    outputs: [
      { name: "receiver", internalType: "address", type: "address" },
      { name: "token", internalType: "address", type: "address" },
      { name: "feePercentage", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "role", internalType: "bytes32", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "maxDeposit",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "maxMint",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [{ name: "user", internalType: "address", type: "address" }],
    name: "maxRedeem",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "user", internalType: "address", type: "address" }],
    name: "maxWithdraw",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "shares", internalType: "uint256", type: "uint256" },
      { name: "to", internalType: "address", type: "address" },
    ],
    name: "mint",
    outputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "nonces",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
      { name: "v", internalType: "uint8", type: "uint8" },
      { name: "r", internalType: "bytes32", type: "bytes32" },
      { name: "s", internalType: "bytes32", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "previewDeposit",
    outputs: [{ name: "shares", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "shares", internalType: "uint256", type: "uint256" }],
    name: "previewMint",
    outputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "shares", internalType: "uint256", type: "uint256" }],
    name: "previewRedeem",
    outputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    name: "previewWithdraw",
    outputs: [{ name: "shares", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "shares", internalType: "uint256", type: "uint256" },
      { name: "receiver", internalType: "address", type: "address" },
      { name: "from", internalType: "address", type: "address" },
    ],
    name: "redeem",
    outputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "callerConfirmation", internalType: "address", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "rewardTokens",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "share",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "tokensRewardInfo",
    outputs: [
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "exist", internalType: "bool", type: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalAssets",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_feeConfig",
        internalType: "struct FeeConfiguration.FeeConfig",
        type: "tuple",
        components: [
          { name: "receiver", internalType: "address", type: "address" },
          { name: "token", internalType: "address", type: "address" },
          { name: "feePercentage", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
    name: "updateFeeConfig",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "userContribution",
    outputs: [
      { name: "sharesAmount", internalType: "uint256", type: "uint256" },
      { name: "exist", internalType: "bool", type: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "receiver", internalType: "address", type: "address" },
      { name: "from", internalType: "address", type: "address" },
    ],
    name: "withdraw",
    outputs: [{ name: "shares", internalType: "uint256", type: "uint256" }],
    stateMutability: "nonpayable",
  },
] as const;

export const hederaVaultAddress =
  "0xe95E635753a8A233cB736c5CB0dF181Bb865a90b" as const;

export const hederaVaultConfig = {
  address: hederaVaultAddress,
  abi: hederaVaultAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IdFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const idFactoryAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "implementationAuthority",
        internalType: "address",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_addr",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "Deployed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "factory",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "TokenFactoryAdded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "factory",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "TokenFactoryRemoved",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "token",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "identity",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "TokenLinked",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "wallet",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "identity",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "WalletLinked",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "wallet",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "identity",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "WalletUnlinked",
  },
  {
    type: "function",
    inputs: [{ name: "_factory", internalType: "address", type: "address" }],
    name: "addTokenFactory",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_wallet", internalType: "address", type: "address" },
      { name: "_salt", internalType: "string", type: "string" },
    ],
    name: "createIdentity",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_wallet", internalType: "address", type: "address" },
      { name: "_salt", internalType: "string", type: "string" },
      { name: "_managementKeys", internalType: "bytes32[]", type: "bytes32[]" },
    ],
    name: "createIdentityWithManagementKeys",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_token", internalType: "address", type: "address" },
      { name: "_tokenOwner", internalType: "address", type: "address" },
      { name: "_salt", internalType: "string", type: "string" },
    ],
    name: "createTokenIdentity",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_wallet", internalType: "address", type: "address" }],
    name: "getIdentity",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_identity", internalType: "address", type: "address" }],
    name: "getToken",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_identity", internalType: "address", type: "address" }],
    name: "getWallets",
    outputs: [{ name: "", internalType: "address[]", type: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "implementationAuthority",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_salt", internalType: "string", type: "string" }],
    name: "isSaltTaken",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_factory", internalType: "address", type: "address" }],
    name: "isTokenFactory",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_newWallet", internalType: "address", type: "address" }],
    name: "linkWallet",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_factory", internalType: "address", type: "address" }],
    name: "removeTokenFactory",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_oldWallet", internalType: "address", type: "address" }],
    name: "unlinkWallet",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export const idFactoryAddress =
  "0xCe444169a11761b361D212005334b13A9d454061" as const;

export const idFactoryConfig = {
  address: idFactoryAddress,
  abi: idFactoryAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Identity
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const identityAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "initialManagementKey",
        internalType: "address",
        type: "address",
      },
      { name: "_isLibrary", internalType: "bool", type: "bool" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "executionId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      { name: "approved", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "Approved",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "claimId",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "topic",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "scheme",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "issuer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "signature",
        internalType: "bytes",
        type: "bytes",
        indexed: false,
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: false },
      { name: "uri", internalType: "string", type: "string", indexed: false },
    ],
    name: "ClaimAdded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "claimId",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "topic",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "scheme",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "issuer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "signature",
        internalType: "bytes",
        type: "bytes",
        indexed: false,
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: false },
      { name: "uri", internalType: "string", type: "string", indexed: false },
    ],
    name: "ClaimChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "claimId",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "topic",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "scheme",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "issuer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "signature",
        internalType: "bytes",
        type: "bytes",
        indexed: false,
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: false },
      { name: "uri", internalType: "string", type: "string", indexed: false },
    ],
    name: "ClaimRemoved",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "executionId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: false },
    ],
    name: "Executed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "executionId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: false },
    ],
    name: "ExecutionFailed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "executionId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      { name: "data", internalType: "bytes", type: "bytes", indexed: false },
    ],
    name: "ExecutionRequested",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "purpose",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "keyType",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "KeyAdded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "purpose",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "keyType",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "KeyRemoved",
  },
  {
    type: "function",
    inputs: [
      { name: "_topic", internalType: "uint256", type: "uint256" },
      { name: "_scheme", internalType: "uint256", type: "uint256" },
      { name: "_issuer", internalType: "address", type: "address" },
      { name: "_signature", internalType: "bytes", type: "bytes" },
      { name: "_data", internalType: "bytes", type: "bytes" },
      { name: "_uri", internalType: "string", type: "string" },
    ],
    name: "addClaim",
    outputs: [
      { name: "claimRequestId", internalType: "bytes32", type: "bytes32" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_key", internalType: "bytes32", type: "bytes32" },
      { name: "_purpose", internalType: "uint256", type: "uint256" },
      { name: "_type", internalType: "uint256", type: "uint256" },
    ],
    name: "addKey",
    outputs: [{ name: "success", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_id", internalType: "uint256", type: "uint256" },
      { name: "_approve", internalType: "bool", type: "bool" },
    ],
    name: "approve",
    outputs: [{ name: "success", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_to", internalType: "address", type: "address" },
      { name: "_value", internalType: "uint256", type: "uint256" },
      { name: "_data", internalType: "bytes", type: "bytes" },
    ],
    name: "execute",
    outputs: [
      { name: "executionId", internalType: "uint256", type: "uint256" },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [{ name: "_claimId", internalType: "bytes32", type: "bytes32" }],
    name: "getClaim",
    outputs: [
      { name: "topic", internalType: "uint256", type: "uint256" },
      { name: "scheme", internalType: "uint256", type: "uint256" },
      { name: "issuer", internalType: "address", type: "address" },
      { name: "signature", internalType: "bytes", type: "bytes" },
      { name: "data", internalType: "bytes", type: "bytes" },
      { name: "uri", internalType: "string", type: "string" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_topic", internalType: "uint256", type: "uint256" }],
    name: "getClaimIdsByTopic",
    outputs: [
      { name: "claimIds", internalType: "bytes32[]", type: "bytes32[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_key", internalType: "bytes32", type: "bytes32" }],
    name: "getKey",
    outputs: [
      { name: "purposes", internalType: "uint256[]", type: "uint256[]" },
      { name: "keyType", internalType: "uint256", type: "uint256" },
      { name: "key", internalType: "bytes32", type: "bytes32" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_key", internalType: "bytes32", type: "bytes32" }],
    name: "getKeyPurposes",
    outputs: [
      { name: "_purposes", internalType: "uint256[]", type: "uint256[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_purpose", internalType: "uint256", type: "uint256" }],
    name: "getKeysByPurpose",
    outputs: [{ name: "keys", internalType: "bytes32[]", type: "bytes32[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "sig", internalType: "bytes", type: "bytes" },
      { name: "dataHash", internalType: "bytes32", type: "bytes32" },
    ],
    name: "getRecoveredAddress",
    outputs: [{ name: "addr", internalType: "address", type: "address" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [
      {
        name: "initialManagementKey",
        internalType: "address",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_identity",
        internalType: "contract IIdentity",
        type: "address",
      },
      { name: "claimTopic", internalType: "uint256", type: "uint256" },
      { name: "sig", internalType: "bytes", type: "bytes" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "isClaimValid",
    outputs: [{ name: "claimValid", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_key", internalType: "bytes32", type: "bytes32" },
      { name: "_purpose", internalType: "uint256", type: "uint256" },
    ],
    name: "keyHasPurpose",
    outputs: [{ name: "result", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_claimId", internalType: "bytes32", type: "bytes32" }],
    name: "removeClaim",
    outputs: [{ name: "success", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_key", internalType: "bytes32", type: "bytes32" },
      { name: "_purpose", internalType: "uint256", type: "uint256" },
    ],
    name: "removeKey",
    outputs: [{ name: "success", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "version",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "pure",
  },
] as const;

export const identityAddress =
  "0xdf72070C2bCA419215f1b4A57837396F52c0e1B8" as const;

export const identityConfig = {
  address: identityAddress,
  abi: identityAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IdentityGateway
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const identityGatewayAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "idFactoryAddress", internalType: "address", type: "address" },
      {
        name: "signersToApprove",
        internalType: "address[]",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
  },
  { type: "error", inputs: [], name: "ECDSAInvalidSignature" },
  {
    type: "error",
    inputs: [{ name: "length", internalType: "uint256", type: "uint256" }],
    name: "ECDSAInvalidSignatureLength",
  },
  {
    type: "error",
    inputs: [{ name: "s", internalType: "bytes32", type: "bytes32" }],
    name: "ECDSAInvalidSignatureS",
  },
  {
    type: "error",
    inputs: [{ name: "signature", internalType: "bytes", type: "bytes" }],
    name: "ExpiredSignature",
  },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "error",
    inputs: [{ name: "signature", internalType: "bytes", type: "bytes" }],
    name: "RevokedSignature",
  },
  {
    type: "error",
    inputs: [{ name: "signature", internalType: "bytes", type: "bytes" }],
    name: "SignatureAlreadyRevoked",
  },
  {
    type: "error",
    inputs: [{ name: "signature", internalType: "bytes", type: "bytes" }],
    name: "SignatureNotRevoked",
  },
  {
    type: "error",
    inputs: [{ name: "signer", internalType: "address", type: "address" }],
    name: "SignerAlreadyApproved",
  },
  {
    type: "error",
    inputs: [{ name: "signer", internalType: "address", type: "address" }],
    name: "SignerAlreadyNotApproved",
  },
  {
    type: "error",
    inputs: [
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "length", internalType: "uint256", type: "uint256" },
    ],
    name: "StringsInsufficientHexLength",
  },
  { type: "error", inputs: [], name: "TooManySigners" },
  {
    type: "error",
    inputs: [{ name: "signer", internalType: "address", type: "address" }],
    name: "UnapprovedSigner",
  },
  { type: "error", inputs: [], name: "ZeroAddress" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "signature",
        internalType: "bytes",
        type: "bytes",
        indexed: true,
      },
    ],
    name: "SignatureApproved",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "signature",
        internalType: "bytes",
        type: "bytes",
        indexed: true,
      },
    ],
    name: "SignatureRevoked",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "signer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "SignerApproved",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "signer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "SignerRevoked",
  },
  {
    type: "function",
    inputs: [{ name: "signature", internalType: "bytes", type: "bytes" }],
    name: "approveSignature",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "signer", internalType: "address", type: "address" }],
    name: "approveSigner",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "approvedSigners",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "data", internalType: "bytes", type: "bytes" }],
    name: "callFactory",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "identityOwner", internalType: "address", type: "address" },
    ],
    name: "deployIdentityForWallet",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "identityOwner", internalType: "address", type: "address" },
      { name: "salt", internalType: "string", type: "string" },
      { name: "signatureExpiry", internalType: "uint256", type: "uint256" },
      { name: "signature", internalType: "bytes", type: "bytes" },
    ],
    name: "deployIdentityWithSalt",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "identityOwner", internalType: "address", type: "address" },
      { name: "salt", internalType: "string", type: "string" },
      { name: "managementKeys", internalType: "bytes32[]", type: "bytes32[]" },
      { name: "signatureExpiry", internalType: "uint256", type: "uint256" },
      { name: "signature", internalType: "bytes", type: "bytes" },
    ],
    name: "deployIdentityWithSaltAndManagementKeys",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "idFactory",
    outputs: [
      { name: "", internalType: "contract IdFactory", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "signature", internalType: "bytes", type: "bytes" }],
    name: "revokeSignature",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "signer", internalType: "address", type: "address" }],
    name: "revokeSigner",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "bytes", type: "bytes" }],
    name: "revokedSignatures",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferFactoryOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export const identityGatewayAddress =
  "0xcfCF11BEe5575c59e1F4a9D5a53c90A4e5e49D0C" as const;

export const identityGatewayConfig = {
  address: identityGatewayAddress,
  abi: identityGatewayAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IdentityRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const identityRegistryAbi = [
  { type: "error", inputs: [], name: "InvalidInitialization" },
  { type: "error", inputs: [], name: "NotInitializing" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_agent",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "AgentAdded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_agent",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "AgentRemoved",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "claimTopicsRegistry",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "ClaimTopicsRegistrySet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "investorAddress",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "country",
        internalType: "uint16",
        type: "uint16",
        indexed: true,
      },
    ],
    name: "CountryUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "investorAddress",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "identity",
        internalType: "contract IIdentity",
        type: "address",
        indexed: true,
      },
    ],
    name: "IdentityRegistered",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "investorAddress",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "identity",
        internalType: "contract IIdentity",
        type: "address",
        indexed: true,
      },
    ],
    name: "IdentityRemoved",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "identityStorage",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "IdentityStorageSet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "oldIdentity",
        internalType: "contract IIdentity",
        type: "address",
        indexed: true,
      },
      {
        name: "newIdentity",
        internalType: "contract IIdentity",
        type: "address",
        indexed: true,
      },
    ],
    name: "IdentityUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "version",
        internalType: "uint64",
        type: "uint64",
        indexed: false,
      },
    ],
    name: "Initialized",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "trustedIssuersRegistry",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "TrustedIssuersRegistrySet",
  },
  {
    type: "function",
    inputs: [{ name: "_agent", internalType: "address", type: "address" }],
    name: "addAgent",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddresses", internalType: "address[]", type: "address[]" },
      {
        name: "_identities",
        internalType: "contract IIdentity[]",
        type: "address[]",
      },
      { name: "_countries", internalType: "uint16[]", type: "uint16[]" },
    ],
    name: "batchRegisterIdentity",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
    ],
    name: "contains",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
    ],
    name: "deleteIdentity",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
    ],
    name: "identity",
    outputs: [
      { name: "", internalType: "contract IIdentity", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "identityStorage",
    outputs: [
      {
        name: "",
        internalType: "contract IIdentityRegistryStorage",
        type: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_trustedIssuersRegistry",
        internalType: "address",
        type: "address",
      },
      {
        name: "_claimTopicsRegistry",
        internalType: "address",
        type: "address",
      },
      { name: "_identityStorage", internalType: "address", type: "address" },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
    ],
    name: "investorCountry",
    outputs: [{ name: "", internalType: "uint16", type: "uint16" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_agent", internalType: "address", type: "address" }],
    name: "isAgent",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
    ],
    name: "isVerified",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "issuersRegistry",
    outputs: [
      {
        name: "",
        internalType: "contract ITrustedIssuersRegistry",
        type: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
      {
        name: "_identity",
        internalType: "contract IIdentity",
        type: "address",
      },
      { name: "_country", internalType: "uint16", type: "uint16" },
    ],
    name: "registerIdentity",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_agent", internalType: "address", type: "address" }],
    name: "removeAgent",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_claimTopicsRegistry",
        internalType: "address",
        type: "address",
      },
    ],
    name: "setClaimTopicsRegistry",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_identityRegistryStorage",
        internalType: "address",
        type: "address",
      },
    ],
    name: "setIdentityRegistryStorage",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_trustedIssuersRegistry",
        internalType: "address",
        type: "address",
      },
    ],
    name: "setTrustedIssuersRegistry",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "topicsRegistry",
    outputs: [
      {
        name: "",
        internalType: "contract IClaimTopicsRegistry",
        type: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
      { name: "_country", internalType: "uint16", type: "uint16" },
    ],
    name: "updateCountry",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
      {
        name: "_identity",
        internalType: "contract IIdentity",
        type: "address",
      },
    ],
    name: "updateIdentity",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export const identityRegistryAddress =
  "0xb0b0671aA04d79059BdcBAB5C59270bac5dc80A5" as const;

export const identityRegistryConfig = {
  address: identityRegistryAddress,
  abi: identityRegistryAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IdentityRegistryStorage
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const identityRegistryStorageAbi = [
  { type: "error", inputs: [], name: "InvalidInitialization" },
  { type: "error", inputs: [], name: "NotInitializing" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_agent",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "AgentAdded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_agent",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "AgentRemoved",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "investorAddress",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "country",
        internalType: "uint16",
        type: "uint16",
        indexed: true,
      },
    ],
    name: "CountryModified",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "oldIdentity",
        internalType: "contract IIdentity",
        type: "address",
        indexed: true,
      },
      {
        name: "newIdentity",
        internalType: "contract IIdentity",
        type: "address",
        indexed: true,
      },
    ],
    name: "IdentityModified",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "identityRegistry",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "IdentityRegistryBound",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "identityRegistry",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "IdentityRegistryUnbound",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "investorAddress",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "identity",
        internalType: "contract IIdentity",
        type: "address",
        indexed: true,
      },
    ],
    name: "IdentityStored",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "investorAddress",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "identity",
        internalType: "contract IIdentity",
        type: "address",
        indexed: true,
      },
    ],
    name: "IdentityUnstored",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "version",
        internalType: "uint64",
        type: "uint64",
        indexed: false,
      },
    ],
    name: "Initialized",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "function",
    inputs: [{ name: "_agent", internalType: "address", type: "address" }],
    name: "addAgent",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
      {
        name: "_identity",
        internalType: "contract IIdentity",
        type: "address",
      },
      { name: "_country", internalType: "uint16", type: "uint16" },
    ],
    name: "addIdentityToStorage",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_identityRegistry", internalType: "address", type: "address" },
    ],
    name: "bindIdentityRegistry",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_agent", internalType: "address", type: "address" }],
    name: "isAgent",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "linkedIdentityRegistries",
    outputs: [{ name: "", internalType: "address[]", type: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
      {
        name: "_identity",
        internalType: "contract IIdentity",
        type: "address",
      },
    ],
    name: "modifyStoredIdentity",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
      { name: "_country", internalType: "uint16", type: "uint16" },
    ],
    name: "modifyStoredInvestorCountry",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_agent", internalType: "address", type: "address" }],
    name: "removeAgent",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
    ],
    name: "removeIdentityFromStorage",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
    ],
    name: "storedIdentity",
    outputs: [
      { name: "", internalType: "contract IIdentity", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
    ],
    name: "storedInvestorCountry",
    outputs: [{ name: "", internalType: "uint16", type: "uint16" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_identityRegistry", internalType: "address", type: "address" },
    ],
    name: "unbindIdentityRegistry",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export const identityRegistryStorageAddress =
  "0xA0AEA5e7Caa342297c4a9309eC1Db7E9aa15a3EB" as const;

export const identityRegistryStorageConfig = {
  address: identityRegistryStorageAddress,
  abi: identityRegistryStorageAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ImplementationAuthority
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const implementationAuthorityAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "implementation", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "newAddress",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "UpdatedImplementation",
  },
  {
    type: "function",
    inputs: [],
    name: "getImplementation",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_newImplementation", internalType: "address", type: "address" },
    ],
    name: "updateImplementation",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export const implementationAuthorityAddress =
  "0x0EE2CDdFFcDe197319Ba2Ea8684469bbD25c2e79" as const;

export const implementationAuthorityConfig = {
  address: implementationAuthorityAddress,
  abi: implementationAuthorityAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MaxOwnershipByCountryModule
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const maxOwnershipByCountryModuleAbi = [
  {
    type: "error",
    inputs: [
      { name: "_compliance", internalType: "address", type: "address" },
      { name: "_id", internalType: "address[]", type: "address[]" },
      { name: "_balance", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "InvalidPresetValues",
  },
  { type: "error", inputs: [], name: "MathOverflowedMulDiv" },
  {
    type: "error",
    inputs: [
      { name: "_compliance", internalType: "address", type: "address" },
      { name: "_value", internalType: "uint256", type: "uint256" },
    ],
    name: "MaxOwnershipExceeded",
  },
  {
    type: "error",
    inputs: [{ name: "_compliance", internalType: "address", type: "address" }],
    name: "OnlyComplianceOwnerCanCall",
  },
  {
    type: "error",
    inputs: [{ name: "_compliance", internalType: "address", type: "address" }],
    name: "TokenAlreadyBound",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_compliance",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "ComplianceBound",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_compliance",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "ComplianceUnbound",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_compliance",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "_id", internalType: "address", type: "address", indexed: true },
      {
        name: "_balance",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "IDBalancePreSet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_compliance",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "_maxPercetageLocal",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "_maxPercetageNonlocal",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "MaxPercentageSet",
  },
  {
    type: "function",
    inputs: [
      { name: "_compliance", internalType: "address", type: "address" },
      { name: "_id", internalType: "address[]", type: "address[]" },
      { name: "_balance", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "batchPreSetModuleState",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_compliance", internalType: "address", type: "address" }],
    name: "bindCompliance",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_compliance", internalType: "address", type: "address" }],
    name: "canComplianceBind",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_compliance", internalType: "address", type: "address" },
      { name: "_identity", internalType: "address", type: "address" },
    ],
    name: "getIDBalance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_compliance", internalType: "address", type: "address" }],
    name: "isComplianceBound",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "isPlugAndPlay",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_value", internalType: "uint256", type: "uint256" },
    ],
    name: "moduleBurnAction",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_value", internalType: "uint256", type: "uint256" },
      { name: "_compliance", internalType: "address", type: "address" },
    ],
    name: "moduleCheck",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_to", internalType: "address", type: "address" },
      { name: "_value", internalType: "uint256", type: "uint256" },
    ],
    name: "moduleMintAction",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_value", internalType: "uint256", type: "uint256" },
    ],
    name: "moduleTransferAction",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "_name", internalType: "string", type: "string" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [
      { name: "_compliance", internalType: "address", type: "address" },
      { name: "_id", internalType: "address", type: "address" },
      { name: "_balance", internalType: "uint256", type: "uint256" },
    ],
    name: "preSetModuleState",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_compliance", internalType: "address", type: "address" }],
    name: "presetCompleted",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_country", internalType: "uint16", type: "uint16" },
      { name: "_maxLocal", internalType: "uint16", type: "uint16" },
      { name: "_maxNonlocal", internalType: "uint16", type: "uint16" },
    ],
    name: "setMaxPercentage",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_compliance", internalType: "address", type: "address" }],
    name: "unbindCompliance",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export const maxOwnershipByCountryModuleAddress =
  "0x66bf2c085f88AF1b1993364ddB1332095B7AD3Ae" as const;

export const maxOwnershipByCountryModuleConfig = {
  address: maxOwnershipByCountryModuleAddress,
  abi: maxOwnershipByCountryModuleAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ModularCompliance
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const modularComplianceAbi = [
  { type: "error", inputs: [], name: "InvalidInitialization" },
  { type: "error", inputs: [], name: "NotInitializing" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "version",
        internalType: "uint64",
        type: "uint64",
        indexed: false,
      },
    ],
    name: "Initialized",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_module",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "ModuleAdded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "target",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "selector",
        internalType: "bytes4",
        type: "bytes4",
        indexed: false,
      },
    ],
    name: "ModuleInteraction",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_module",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "ModuleRemoved",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_token",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "TokenBound",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_token",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "TokenUnbound",
  },
  {
    type: "function",
    inputs: [{ name: "_module", internalType: "address", type: "address" }],
    name: "addModule",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_token", internalType: "address", type: "address" }],
    name: "bindToken",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "callData", internalType: "bytes", type: "bytes" },
      { name: "_module", internalType: "address", type: "address" },
    ],
    name: "callModuleFunction",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_value", internalType: "uint256", type: "uint256" },
    ],
    name: "canTransfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_to", internalType: "address", type: "address" },
      { name: "_value", internalType: "uint256", type: "uint256" },
    ],
    name: "created",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_value", internalType: "uint256", type: "uint256" },
    ],
    name: "destroyed",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "getModules",
    outputs: [{ name: "", internalType: "address[]", type: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getTokenBound",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_module", internalType: "address", type: "address" }],
    name: "isModuleBound",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_module", internalType: "address", type: "address" }],
    name: "removeModule",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_value", internalType: "uint256", type: "uint256" },
    ],
    name: "transferred",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_token", internalType: "address", type: "address" }],
    name: "unbindToken",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export const modularComplianceAddress =
  "0x3134520cBB0cC9d0fEA9EAE182cCc29b3b20f0C8" as const;

export const modularComplianceConfig = {
  address: modularComplianceAddress,
  abi: modularComplianceAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RequiresNFTModule
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const requiresNftModuleAbi = [
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_compliance",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "ComplianceBound",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_compliance",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "ComplianceUnbound",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_compliance",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "_nftAddress",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "NFTRequired",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_compliance",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "NFTUnrequired",
  },
  {
    type: "function",
    inputs: [{ name: "_compliance", internalType: "address", type: "address" }],
    name: "bindCompliance",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "canComplianceBind",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_compliance", internalType: "address", type: "address" }],
    name: "isComplianceBound",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "isPlugAndPlay",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_value", internalType: "uint256", type: "uint256" },
    ],
    name: "moduleBurnAction",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "_compliance", internalType: "address", type: "address" },
    ],
    name: "moduleCheck",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_to", internalType: "address", type: "address" },
      { name: "_value", internalType: "uint256", type: "uint256" },
    ],
    name: "moduleMintAction",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_value", internalType: "uint256", type: "uint256" },
    ],
    name: "moduleTransferAction",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "_name", internalType: "string", type: "string" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    inputs: [{ name: "_nftAddress", internalType: "address", type: "address" }],
    name: "requireNFT",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_compliance", internalType: "address", type: "address" }],
    name: "unbindCompliance",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "unrequireNFT",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export const requiresNftModuleAddress =
  "0xA318d349488531882b4fCa6b412A8766F7421044" as const;

export const requiresNftModuleConfig = {
  address: requiresNftModuleAddress,
  abi: requiresNftModuleAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TREXFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const trexFactoryAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "implementationAuthority_",
        internalType: "address",
        type: "address",
      },
      { name: "idFactory_", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_addr",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "Deployed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_idFactory",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "IdFactorySet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_implementationAuthority",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "ImplementationAuthoritySet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_token",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "_ir", internalType: "address", type: "address", indexed: false },
      {
        name: "_irs",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "_tir",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "_ctr",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      { name: "_mc", internalType: "address", type: "address", indexed: false },
      { name: "_salt", internalType: "string", type: "string", indexed: true },
    ],
    name: "TREXSuiteDeployed",
  },
  {
    type: "function",
    inputs: [
      { name: "_salt", internalType: "string", type: "string" },
      {
        name: "_tokenDetails",
        internalType: "struct ITREXFactory.TokenDetails",
        type: "tuple",
        components: [
          { name: "owner", internalType: "address", type: "address" },
          { name: "name", internalType: "string", type: "string" },
          { name: "symbol", internalType: "string", type: "string" },
          { name: "decimals", internalType: "uint8", type: "uint8" },
          { name: "irs", internalType: "address", type: "address" },
          { name: "ONCHAINID", internalType: "address", type: "address" },
          { name: "irAgents", internalType: "address[]", type: "address[]" },
          { name: "tokenAgents", internalType: "address[]", type: "address[]" },
          {
            name: "complianceModules",
            internalType: "address[]",
            type: "address[]",
          },
          {
            name: "complianceSettings",
            internalType: "bytes[]",
            type: "bytes[]",
          },
        ],
      },
      {
        name: "_claimDetails",
        internalType: "struct ITREXFactory.ClaimDetails",
        type: "tuple",
        components: [
          { name: "claimTopics", internalType: "uint256[]", type: "uint256[]" },
          { name: "issuers", internalType: "address[]", type: "address[]" },
          {
            name: "issuerClaims",
            internalType: "uint256[][]",
            type: "uint256[][]",
          },
        ],
      },
    ],
    name: "deployTREXSuite",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "getIdFactory",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getImplementationAuthority",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_salt", internalType: "string", type: "string" }],
    name: "getToken",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_contract", internalType: "address", type: "address" },
      { name: "_newOwner", internalType: "address", type: "address" },
    ],
    name: "recoverContractOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "idFactory_", internalType: "address", type: "address" }],
    name: "setIdFactory",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "implementationAuthority_",
        internalType: "address",
        type: "address",
      },
    ],
    name: "setImplementationAuthority",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "string", type: "string" }],
    name: "tokenDeployed",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export const trexFactoryAddress =
  "0xf17A4C9E2B00398fB11c88060FdE39066b6269b0" as const;

export const trexFactoryConfig = {
  address: trexFactoryAddress,
  abi: trexFactoryAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TREXGateway
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const trexGatewayAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "factory", internalType: "address", type: "address" },
      { name: "publicDeploymentStatus", internalType: "bool", type: "bool" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    inputs: [{ name: "lengthLimit", internalType: "uint16", type: "uint16" }],
    name: "BatchMaxLengthExceeded",
  },
  {
    type: "error",
    inputs: [{ name: "deployer", internalType: "address", type: "address" }],
    name: "DeployerAlreadyExists",
  },
  {
    type: "error",
    inputs: [{ name: "deployer", internalType: "address", type: "address" }],
    name: "DeployerDoesNotExist",
  },
  { type: "error", inputs: [], name: "DeploymentFeesAlreadyDisabled" },
  { type: "error", inputs: [], name: "DeploymentFeesAlreadyEnabled" },
  { type: "error", inputs: [], name: "DiscountOutOfRange" },
  { type: "error", inputs: [], name: "OnlyAdminCall" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  { type: "error", inputs: [], name: "PublicCannotDeployOnBehalf" },
  { type: "error", inputs: [], name: "PublicDeploymentAlreadyDisabled" },
  { type: "error", inputs: [], name: "PublicDeploymentAlreadyEnabled" },
  { type: "error", inputs: [], name: "PublicDeploymentsNotAllowed" },
  {
    type: "error",
    inputs: [
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "length", internalType: "uint256", type: "uint256" },
    ],
    name: "StringsInsufficientHexLength",
  },
  { type: "error", inputs: [], name: "ZeroAddress" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_agent",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "AgentAdded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_agent",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "AgentRemoved",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "deployer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "DeployerAdded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "deployer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "DeployerRemoved",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "isEnabled", internalType: "bool", type: "bool", indexed: true },
    ],
    name: "DeploymentFeeEnabled",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "fee", internalType: "uint256", type: "uint256", indexed: true },
      {
        name: "feeToken",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "feeCollector",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "DeploymentFeeSet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "factory",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "FactorySet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "deployer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "discount",
        internalType: "uint16",
        type: "uint16",
        indexed: false,
      },
    ],
    name: "FeeDiscountApplied",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "requester",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "intendedOwner",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "feeApplied",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "GatewaySuiteDeploymentProcessed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "publicDeploymentStatus",
        internalType: "bool",
        type: "bool",
        indexed: true,
      },
    ],
    name: "PublicDeploymentStatusSet",
  },
  {
    type: "function",
    inputs: [{ name: "_agent", internalType: "address", type: "address" }],
    name: "addAgent",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "deployer", internalType: "address", type: "address" }],
    name: "addDeployer",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "deployer", internalType: "address", type: "address" },
      { name: "discount", internalType: "uint16", type: "uint16" },
    ],
    name: "applyFeeDiscount",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "deployers", internalType: "address[]", type: "address[]" },
    ],
    name: "batchAddDeployer",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "deployers", internalType: "address[]", type: "address[]" },
      { name: "discounts", internalType: "uint16[]", type: "uint16[]" },
    ],
    name: "batchApplyFeeDiscount",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_tokenDetails",
        internalType: "struct ITREXFactory.TokenDetails[]",
        type: "tuple[]",
        components: [
          { name: "owner", internalType: "address", type: "address" },
          { name: "name", internalType: "string", type: "string" },
          { name: "symbol", internalType: "string", type: "string" },
          { name: "decimals", internalType: "uint8", type: "uint8" },
          { name: "irs", internalType: "address", type: "address" },
          { name: "ONCHAINID", internalType: "address", type: "address" },
          { name: "irAgents", internalType: "address[]", type: "address[]" },
          { name: "tokenAgents", internalType: "address[]", type: "address[]" },
          {
            name: "complianceModules",
            internalType: "address[]",
            type: "address[]",
          },
          {
            name: "complianceSettings",
            internalType: "bytes[]",
            type: "bytes[]",
          },
        ],
      },
      {
        name: "_claimDetails",
        internalType: "struct ITREXFactory.ClaimDetails[]",
        type: "tuple[]",
        components: [
          { name: "claimTopics", internalType: "uint256[]", type: "uint256[]" },
          { name: "issuers", internalType: "address[]", type: "address[]" },
          {
            name: "issuerClaims",
            internalType: "uint256[][]",
            type: "uint256[][]",
          },
        ],
      },
    ],
    name: "batchDeployTREXSuite",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "deployers", internalType: "address[]", type: "address[]" },
    ],
    name: "batchRemoveDeployer",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "deployer", internalType: "address", type: "address" }],
    name: "calculateFee",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_tokenDetails",
        internalType: "struct ITREXFactory.TokenDetails",
        type: "tuple",
        components: [
          { name: "owner", internalType: "address", type: "address" },
          { name: "name", internalType: "string", type: "string" },
          { name: "symbol", internalType: "string", type: "string" },
          { name: "decimals", internalType: "uint8", type: "uint8" },
          { name: "irs", internalType: "address", type: "address" },
          { name: "ONCHAINID", internalType: "address", type: "address" },
          { name: "irAgents", internalType: "address[]", type: "address[]" },
          { name: "tokenAgents", internalType: "address[]", type: "address[]" },
          {
            name: "complianceModules",
            internalType: "address[]",
            type: "address[]",
          },
          {
            name: "complianceSettings",
            internalType: "bytes[]",
            type: "bytes[]",
          },
        ],
      },
      {
        name: "_claimDetails",
        internalType: "struct ITREXFactory.ClaimDetails",
        type: "tuple",
        components: [
          { name: "claimTopics", internalType: "uint256[]", type: "uint256[]" },
          { name: "issuers", internalType: "address[]", type: "address[]" },
          {
            name: "issuerClaims",
            internalType: "uint256[][]",
            type: "uint256[][]",
          },
        ],
      },
    ],
    name: "deployTREXSuite",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_isEnabled", internalType: "bool", type: "bool" }],
    name: "enableDeploymentFee",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "getDeploymentFee",
    outputs: [
      {
        name: "",
        internalType: "struct ITREXGateway.Fee",
        type: "tuple",
        components: [
          { name: "fee", internalType: "uint256", type: "uint256" },
          { name: "feeToken", internalType: "address", type: "address" },
          { name: "feeCollector", internalType: "address", type: "address" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getFactory",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getPublicDeploymentStatus",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_agent", internalType: "address", type: "address" }],
    name: "isAgent",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "deployer", internalType: "address", type: "address" }],
    name: "isDeployer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "isDeploymentFeeEnabled",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "_agent", internalType: "address", type: "address" }],
    name: "removeAgent",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "deployer", internalType: "address", type: "address" }],
    name: "removeDeployer",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_fee", internalType: "uint256", type: "uint256" },
      { name: "_feeToken", internalType: "address", type: "address" },
      { name: "_feeCollector", internalType: "address", type: "address" },
    ],
    name: "setDeploymentFee",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "factory", internalType: "address", type: "address" }],
    name: "setFactory",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_isEnabled", internalType: "bool", type: "bool" }],
    name: "setPublicDeploymentStatus",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_newOwner", internalType: "address", type: "address" }],
    name: "transferFactoryOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export const trexGatewayAddress =
  "0x56C433eca9E534FF5024Eaedb95C652d31B44a09" as const;

export const trexGatewayConfig = {
  address: trexGatewayAddress,
  abi: trexGatewayAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TREXImplementationAuthority
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const trexImplementationAuthorityAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "referenceStatus", internalType: "bool", type: "bool" },
      { name: "trexFactory", internalType: "address", type: "address" },
      { name: "iaFactory", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "iaFactory",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "IAFactorySet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_token",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "_newImplementationAuthority",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "ImplementationAuthorityChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "referenceStatus",
        internalType: "bool",
        type: "bool",
        indexed: false,
      },
      {
        name: "trexFactory",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "ImplementationAuthoritySet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "trexFactory",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "TREXFactorySet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "version",
        internalType: "struct ITREXImplementationAuthority.Version",
        type: "tuple",
        components: [
          { name: "major", internalType: "uint8", type: "uint8" },
          { name: "minor", internalType: "uint8", type: "uint8" },
          { name: "patch", internalType: "uint8", type: "uint8" },
        ],
        indexed: true,
      },
      {
        name: "trex",
        internalType: "struct ITREXImplementationAuthority.TREXContracts",
        type: "tuple",
        components: [
          {
            name: "tokenImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "ctrImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "irImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "irsImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "tirImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "mcImplementation",
            internalType: "address",
            type: "address",
          },
        ],
        indexed: true,
      },
    ],
    name: "TREXVersionAdded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "version",
        internalType: "struct ITREXImplementationAuthority.Version",
        type: "tuple",
        components: [
          { name: "major", internalType: "uint8", type: "uint8" },
          { name: "minor", internalType: "uint8", type: "uint8" },
          { name: "patch", internalType: "uint8", type: "uint8" },
        ],
        indexed: true,
      },
      {
        name: "trex",
        internalType: "struct ITREXImplementationAuthority.TREXContracts",
        type: "tuple",
        components: [
          {
            name: "tokenImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "ctrImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "irImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "irsImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "tirImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "mcImplementation",
            internalType: "address",
            type: "address",
          },
        ],
        indexed: true,
      },
    ],
    name: "TREXVersionFetched",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "version",
        internalType: "struct ITREXImplementationAuthority.Version",
        type: "tuple",
        components: [
          { name: "major", internalType: "uint8", type: "uint8" },
          { name: "minor", internalType: "uint8", type: "uint8" },
          { name: "patch", internalType: "uint8", type: "uint8" },
        ],
        indexed: true,
      },
    ],
    name: "VersionUpdated",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_version",
        internalType: "struct ITREXImplementationAuthority.Version",
        type: "tuple",
        components: [
          { name: "major", internalType: "uint8", type: "uint8" },
          { name: "minor", internalType: "uint8", type: "uint8" },
          { name: "patch", internalType: "uint8", type: "uint8" },
        ],
      },
      {
        name: "_trex",
        internalType: "struct ITREXImplementationAuthority.TREXContracts",
        type: "tuple",
        components: [
          {
            name: "tokenImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "ctrImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "irImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "irsImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "tirImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "mcImplementation",
            internalType: "address",
            type: "address",
          },
        ],
      },
    ],
    name: "addAndUseTREXVersion",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_version",
        internalType: "struct ITREXImplementationAuthority.Version",
        type: "tuple",
        components: [
          { name: "major", internalType: "uint8", type: "uint8" },
          { name: "minor", internalType: "uint8", type: "uint8" },
          { name: "patch", internalType: "uint8", type: "uint8" },
        ],
      },
      {
        name: "_trex",
        internalType: "struct ITREXImplementationAuthority.TREXContracts",
        type: "tuple",
        components: [
          {
            name: "tokenImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "ctrImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "irImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "irsImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "tirImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "mcImplementation",
            internalType: "address",
            type: "address",
          },
        ],
      },
    ],
    name: "addTREXVersion",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_token", internalType: "address", type: "address" },
      {
        name: "_newImplementationAuthority",
        internalType: "address",
        type: "address",
      },
    ],
    name: "changeImplementationAuthority",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_version",
        internalType: "struct ITREXImplementationAuthority.Version",
        type: "tuple",
        components: [
          { name: "major", internalType: "uint8", type: "uint8" },
          { name: "minor", internalType: "uint8", type: "uint8" },
          { name: "patch", internalType: "uint8", type: "uint8" },
        ],
      },
    ],
    name: "fetchVersion",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "getCTRImplementation",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_version",
        internalType: "struct ITREXImplementationAuthority.Version",
        type: "tuple",
        components: [
          { name: "major", internalType: "uint8", type: "uint8" },
          { name: "minor", internalType: "uint8", type: "uint8" },
          { name: "patch", internalType: "uint8", type: "uint8" },
        ],
      },
    ],
    name: "getContracts",
    outputs: [
      {
        name: "",
        internalType: "struct ITREXImplementationAuthority.TREXContracts",
        type: "tuple",
        components: [
          {
            name: "tokenImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "ctrImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "irImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "irsImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "tirImplementation",
            internalType: "address",
            type: "address",
          },
          {
            name: "mcImplementation",
            internalType: "address",
            type: "address",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getCurrentVersion",
    outputs: [
      {
        name: "",
        internalType: "struct ITREXImplementationAuthority.Version",
        type: "tuple",
        components: [
          { name: "major", internalType: "uint8", type: "uint8" },
          { name: "minor", internalType: "uint8", type: "uint8" },
          { name: "patch", internalType: "uint8", type: "uint8" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getIRImplementation",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getIRSImplementation",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getMCImplementation",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getReferenceContract",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getTIRImplementation",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getTREXFactory",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getTokenImplementation",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "isReferenceContract",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "iaFactory", internalType: "address", type: "address" }],
    name: "setIAFactory",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "trexFactory", internalType: "address", type: "address" }],
    name: "setTREXFactory",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_version",
        internalType: "struct ITREXImplementationAuthority.Version",
        type: "tuple",
        components: [
          { name: "major", internalType: "uint8", type: "uint8" },
          { name: "minor", internalType: "uint8", type: "uint8" },
          { name: "patch", internalType: "uint8", type: "uint8" },
        ],
      },
    ],
    name: "useTREXVersion",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export const trexImplementationAuthorityAddress =
  "0x94eDe092ea4480e00174C73BC615c2466743f3dA" as const;

export const trexImplementationAuthorityConfig = {
  address: trexImplementationAuthorityAddress,
  abi: trexImplementationAuthorityAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const tokenAbi = [
  { type: "error", inputs: [], name: "InvalidInitialization" },
  { type: "error", inputs: [], name: "NotInitializing" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_userAddress",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "_isFrozen", internalType: "bool", type: "bool", indexed: true },
      {
        name: "_owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "AddressFrozen",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_agent",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "AgentAdded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_agent",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "AgentRemoved",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "spender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_compliance",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "ComplianceAdded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_identityRegistry",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "IdentityRegistryAdded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "version",
        internalType: "uint64",
        type: "uint64",
        indexed: false,
      },
    ],
    name: "Initialized",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_userAddress",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Paused",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_lostWallet",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "_newWallet",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "_investorOnchainID",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RecoverySuccess",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_userAddress",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "_amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "TokensFrozen",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_userAddress",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "_amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "TokensUnfrozen",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "value",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Transfer",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_userAddress",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Unpaused",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "_newName",
        internalType: "string",
        type: "string",
        indexed: true,
      },
      {
        name: "_newSymbol",
        internalType: "string",
        type: "string",
        indexed: true,
      },
      {
        name: "_newDecimals",
        internalType: "uint8",
        type: "uint8",
        indexed: false,
      },
      {
        name: "_newVersion",
        internalType: "string",
        type: "string",
        indexed: false,
      },
      {
        name: "_newOnchainID",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "UpdatedTokenInformation",
  },
  {
    type: "function",
    inputs: [{ name: "_agent", internalType: "address", type: "address" }],
    name: "addAgent",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_owner", internalType: "address", type: "address" },
      { name: "_spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_spender", internalType: "address", type: "address" },
      { name: "_amount", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
    ],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddresses", internalType: "address[]", type: "address[]" },
      { name: "_amounts", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "batchBurn",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_fromList", internalType: "address[]", type: "address[]" },
      { name: "_toList", internalType: "address[]", type: "address[]" },
      { name: "_amounts", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "batchForcedTransfer",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddresses", internalType: "address[]", type: "address[]" },
      { name: "_amounts", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "batchFreezePartialTokens",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_toList", internalType: "address[]", type: "address[]" },
      { name: "_amounts", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "batchMint",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddresses", internalType: "address[]", type: "address[]" },
      { name: "_freeze", internalType: "bool[]", type: "bool[]" },
    ],
    name: "batchSetAddressFrozen",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_toList", internalType: "address[]", type: "address[]" },
      { name: "_amounts", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "batchTransfer",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddresses", internalType: "address[]", type: "address[]" },
      { name: "_amounts", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "batchUnfreezePartialTokens",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
      { name: "_amount", internalType: "uint256", type: "uint256" },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "compliance",
    outputs: [
      {
        name: "",
        internalType: "contract IModularCompliance",
        type: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_spender", internalType: "address", type: "address" },
      { name: "_subtractedValue", internalType: "uint256", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_amount", internalType: "uint256", type: "uint256" },
    ],
    name: "forcedTransfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
      { name: "_amount", internalType: "uint256", type: "uint256" },
    ],
    name: "freezePartialTokens",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
    ],
    name: "getFrozenTokens",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "identityRegistry",
    outputs: [
      { name: "", internalType: "contract IIdentityRegistry", type: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_spender", internalType: "address", type: "address" },
      { name: "_addedValue", internalType: "uint256", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_identityRegistry", internalType: "address", type: "address" },
      { name: "_compliance", internalType: "address", type: "address" },
      { name: "_name", internalType: "string", type: "string" },
      { name: "_symbol", internalType: "string", type: "string" },
      { name: "_decimals", internalType: "uint8", type: "uint8" },
      { name: "_onchainID", internalType: "address", type: "address" },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_agent", internalType: "address", type: "address" }],
    name: "isAgent",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
    ],
    name: "isFrozen",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_to", internalType: "address", type: "address" },
      { name: "_amount", internalType: "uint256", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "onchainID",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "paused",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_lostWallet", internalType: "address", type: "address" },
      { name: "_newWallet", internalType: "address", type: "address" },
      { name: "_investorOnchainID", internalType: "address", type: "address" },
    ],
    name: "recoveryAddress",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_agent", internalType: "address", type: "address" }],
    name: "removeAgent",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
      { name: "_freeze", internalType: "bool", type: "bool" },
    ],
    name: "setAddressFrozen",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_compliance", internalType: "address", type: "address" }],
    name: "setCompliance",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_identityRegistry", internalType: "address", type: "address" },
    ],
    name: "setIdentityRegistry",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_name", internalType: "string", type: "string" }],
    name: "setName",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_onchainID", internalType: "address", type: "address" }],
    name: "setOnchainID",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_symbol", internalType: "string", type: "string" }],
    name: "setSymbol",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_to", internalType: "address", type: "address" },
      { name: "_amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_userAddress", internalType: "address", type: "address" },
      { name: "_amount", internalType: "uint256", type: "uint256" },
    ],
    name: "unfreezePartialTokens",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "version",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "pure",
  },
] as const;

export const tokenAddress =
  "0xB0f1AD71bA47Cc10cD925f06E1b467A5544e9592" as const;

export const tokenConfig = { address: tokenAddress, abi: tokenAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TrustedIssuersRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const trustedIssuersRegistryAbi = [
  { type: "error", inputs: [], name: "InvalidInitialization" },
  { type: "error", inputs: [], name: "NotInitializing" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "trustedIssuer",
        internalType: "contract IClaimIssuer",
        type: "address",
        indexed: true,
      },
      {
        name: "claimTopics",
        internalType: "uint256[]",
        type: "uint256[]",
        indexed: false,
      },
    ],
    name: "ClaimTopicsUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "version",
        internalType: "uint64",
        type: "uint64",
        indexed: false,
      },
    ],
    name: "Initialized",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "trustedIssuer",
        internalType: "contract IClaimIssuer",
        type: "address",
        indexed: true,
      },
      {
        name: "claimTopics",
        internalType: "uint256[]",
        type: "uint256[]",
        indexed: false,
      },
    ],
    name: "TrustedIssuerAdded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "trustedIssuer",
        internalType: "contract IClaimIssuer",
        type: "address",
        indexed: true,
      },
    ],
    name: "TrustedIssuerRemoved",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_trustedIssuer",
        internalType: "contract IClaimIssuer",
        type: "address",
      },
      { name: "_claimTopics", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "addTrustedIssuer",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_trustedIssuer",
        internalType: "contract IClaimIssuer",
        type: "address",
      },
    ],
    name: "getTrustedIssuerClaimTopics",
    outputs: [{ name: "", internalType: "uint256[]", type: "uint256[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "getTrustedIssuers",
    outputs: [
      { name: "", internalType: "contract IClaimIssuer[]", type: "address[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "claimTopic", internalType: "uint256", type: "uint256" }],
    name: "getTrustedIssuersForClaimTopic",
    outputs: [
      { name: "", internalType: "contract IClaimIssuer[]", type: "address[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "_issuer", internalType: "address", type: "address" },
      { name: "_claimTopic", internalType: "uint256", type: "uint256" },
    ],
    name: "hasClaimTopic",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "_issuer", internalType: "address", type: "address" }],
    name: "isTrustedIssuer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_trustedIssuer",
        internalType: "contract IClaimIssuer",
        type: "address",
      },
    ],
    name: "removeTrustedIssuer",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      {
        name: "_trustedIssuer",
        internalType: "contract IClaimIssuer",
        type: "address",
      },
      { name: "_claimTopics", internalType: "uint256[]", type: "uint256[]" },
    ],
    name: "updateIssuerClaimTopics",
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export const trustedIssuersRegistryAddress =
  "0x9872BAaDb06D14f998e0185138745e8593E6D3D7" as const;

export const trustedIssuersRegistryConfig = {
  address: trustedIssuersRegistryAddress,
  abi: trustedIssuersRegistryAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// VaultFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const vaultFactoryAbi = [
  {
    type: "constructor",
    inputs: [{ name: "deployer", internalType: "address", type: "address" }],
    stateMutability: "nonpayable",
  },
  { type: "error", inputs: [], name: "AccessControlBadConfirmation" },
  {
    type: "error",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "neededRole", internalType: "bytes32", type: "bytes32" },
    ],
    name: "AccessControlUnauthorizedAccount",
  },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "previousAdminRole",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "newAdminRole",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
    ],
    name: "RoleAdminChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RoleGranted",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RoleRevoked",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "vault",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "name", internalType: "string", type: "string", indexed: false },
      {
        name: "symbol",
        internalType: "string",
        type: "string",
        indexed: false,
      },
    ],
    name: "VaultDeployed",
  },
  {
    type: "function",
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "DEPLOYER_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "vault", internalType: "address", type: "address" }],
    name: "availableVaults",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "salt", internalType: "string", type: "string" },
      {
        name: "vaultDetails",
        internalType: "struct IVaultFactory.VaultDetails",
        type: "tuple",
        components: [
          { name: "stakingToken", internalType: "address", type: "address" },
          { name: "shareTokenName", internalType: "string", type: "string" },
          { name: "shareTokenSymbol", internalType: "string", type: "string" },
          {
            name: "vaultRewardController",
            internalType: "address",
            type: "address",
          },
          {
            name: "feeConfigController",
            internalType: "address",
            type: "address",
          },
        ],
      },
      {
        name: "feeConfig",
        internalType: "struct FeeConfiguration.FeeConfig",
        type: "tuple",
        components: [
          { name: "receiver", internalType: "address", type: "address" },
          { name: "token", internalType: "address", type: "address" },
          { name: "feePercentage", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
    name: "deployVault",
    outputs: [{ name: "vault", internalType: "address", type: "address" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [{ name: "role", internalType: "bytes32", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "vault", internalType: "address", type: "address" }],
    name: "isVaultAvailable",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "callerConfirmation", internalType: "address", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "string", type: "string" }],
    name: "vaultDeployed",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
] as const;

export const vaultFactoryAddress =
  "0x88f598B617BF4cB1430488EF43a6777cfb589904" as const;

export const vaultFactoryConfig = {
  address: vaultFactoryAddress,
  abi: vaultFactoryAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link claimTopicsRegistryAbi}__
 */
export const readClaimTopicsRegistry = /*#__PURE__*/ createReadContract({
  abi: claimTopicsRegistryAbi,
  address: claimTopicsRegistryAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link claimTopicsRegistryAbi}__ and `functionName` set to `"getClaimTopics"`
 */
export const readClaimTopicsRegistryGetClaimTopics =
  /*#__PURE__*/ createReadContract({
    abi: claimTopicsRegistryAbi,
    address: claimTopicsRegistryAddress,
    functionName: "getClaimTopics",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link claimTopicsRegistryAbi}__ and `functionName` set to `"owner"`
 */
export const readClaimTopicsRegistryOwner = /*#__PURE__*/ createReadContract({
  abi: claimTopicsRegistryAbi,
  address: claimTopicsRegistryAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link claimTopicsRegistryAbi}__
 */
export const writeClaimTopicsRegistry = /*#__PURE__*/ createWriteContract({
  abi: claimTopicsRegistryAbi,
  address: claimTopicsRegistryAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link claimTopicsRegistryAbi}__ and `functionName` set to `"addClaimTopic"`
 */
export const writeClaimTopicsRegistryAddClaimTopic =
  /*#__PURE__*/ createWriteContract({
    abi: claimTopicsRegistryAbi,
    address: claimTopicsRegistryAddress,
    functionName: "addClaimTopic",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link claimTopicsRegistryAbi}__ and `functionName` set to `"init"`
 */
export const writeClaimTopicsRegistryInit = /*#__PURE__*/ createWriteContract({
  abi: claimTopicsRegistryAbi,
  address: claimTopicsRegistryAddress,
  functionName: "init",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link claimTopicsRegistryAbi}__ and `functionName` set to `"removeClaimTopic"`
 */
export const writeClaimTopicsRegistryRemoveClaimTopic =
  /*#__PURE__*/ createWriteContract({
    abi: claimTopicsRegistryAbi,
    address: claimTopicsRegistryAddress,
    functionName: "removeClaimTopic",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link claimTopicsRegistryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeClaimTopicsRegistryRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: claimTopicsRegistryAbi,
    address: claimTopicsRegistryAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link claimTopicsRegistryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeClaimTopicsRegistryTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: claimTopicsRegistryAbi,
    address: claimTopicsRegistryAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link claimTopicsRegistryAbi}__
 */
export const simulateClaimTopicsRegistry = /*#__PURE__*/ createSimulateContract(
  { abi: claimTopicsRegistryAbi, address: claimTopicsRegistryAddress },
);

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link claimTopicsRegistryAbi}__ and `functionName` set to `"addClaimTopic"`
 */
export const simulateClaimTopicsRegistryAddClaimTopic =
  /*#__PURE__*/ createSimulateContract({
    abi: claimTopicsRegistryAbi,
    address: claimTopicsRegistryAddress,
    functionName: "addClaimTopic",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link claimTopicsRegistryAbi}__ and `functionName` set to `"init"`
 */
export const simulateClaimTopicsRegistryInit =
  /*#__PURE__*/ createSimulateContract({
    abi: claimTopicsRegistryAbi,
    address: claimTopicsRegistryAddress,
    functionName: "init",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link claimTopicsRegistryAbi}__ and `functionName` set to `"removeClaimTopic"`
 */
export const simulateClaimTopicsRegistryRemoveClaimTopic =
  /*#__PURE__*/ createSimulateContract({
    abi: claimTopicsRegistryAbi,
    address: claimTopicsRegistryAddress,
    functionName: "removeClaimTopic",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link claimTopicsRegistryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateClaimTopicsRegistryRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: claimTopicsRegistryAbi,
    address: claimTopicsRegistryAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link claimTopicsRegistryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateClaimTopicsRegistryTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: claimTopicsRegistryAbi,
    address: claimTopicsRegistryAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link claimTopicsRegistryAbi}__
 */
export const watchClaimTopicsRegistryEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: claimTopicsRegistryAbi,
    address: claimTopicsRegistryAddress,
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link claimTopicsRegistryAbi}__ and `eventName` set to `"ClaimTopicAdded"`
 */
export const watchClaimTopicsRegistryClaimTopicAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: claimTopicsRegistryAbi,
    address: claimTopicsRegistryAddress,
    eventName: "ClaimTopicAdded",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link claimTopicsRegistryAbi}__ and `eventName` set to `"ClaimTopicRemoved"`
 */
export const watchClaimTopicsRegistryClaimTopicRemovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: claimTopicsRegistryAbi,
    address: claimTopicsRegistryAddress,
    eventName: "ClaimTopicRemoved",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link claimTopicsRegistryAbi}__ and `eventName` set to `"Initialized"`
 */
export const watchClaimTopicsRegistryInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: claimTopicsRegistryAbi,
    address: claimTopicsRegistryAddress,
    eventName: "Initialized",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link claimTopicsRegistryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchClaimTopicsRegistryOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: claimTopicsRegistryAbi,
    address: claimTopicsRegistryAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link countryAllowModuleAbi}__
 */
export const readCountryAllowModule = /*#__PURE__*/ createReadContract({
  abi: countryAllowModuleAbi,
  address: countryAllowModuleAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"canComplianceBind"`
 */
export const readCountryAllowModuleCanComplianceBind =
  /*#__PURE__*/ createReadContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "canComplianceBind",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"isComplianceBound"`
 */
export const readCountryAllowModuleIsComplianceBound =
  /*#__PURE__*/ createReadContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "isComplianceBound",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"isCountryAllowed"`
 */
export const readCountryAllowModuleIsCountryAllowed =
  /*#__PURE__*/ createReadContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "isCountryAllowed",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"isPlugAndPlay"`
 */
export const readCountryAllowModuleIsPlugAndPlay =
  /*#__PURE__*/ createReadContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "isPlugAndPlay",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"moduleCheck"`
 */
export const readCountryAllowModuleModuleCheck =
  /*#__PURE__*/ createReadContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "moduleCheck",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"name"`
 */
export const readCountryAllowModuleName = /*#__PURE__*/ createReadContract({
  abi: countryAllowModuleAbi,
  address: countryAllowModuleAddress,
  functionName: "name",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link countryAllowModuleAbi}__
 */
export const writeCountryAllowModule = /*#__PURE__*/ createWriteContract({
  abi: countryAllowModuleAbi,
  address: countryAllowModuleAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"addAllowedCountry"`
 */
export const writeCountryAllowModuleAddAllowedCountry =
  /*#__PURE__*/ createWriteContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "addAllowedCountry",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"batchAllowCountries"`
 */
export const writeCountryAllowModuleBatchAllowCountries =
  /*#__PURE__*/ createWriteContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "batchAllowCountries",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"batchDisallowCountries"`
 */
export const writeCountryAllowModuleBatchDisallowCountries =
  /*#__PURE__*/ createWriteContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "batchDisallowCountries",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"bindCompliance"`
 */
export const writeCountryAllowModuleBindCompliance =
  /*#__PURE__*/ createWriteContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "bindCompliance",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"moduleBurnAction"`
 */
export const writeCountryAllowModuleModuleBurnAction =
  /*#__PURE__*/ createWriteContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "moduleBurnAction",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"moduleMintAction"`
 */
export const writeCountryAllowModuleModuleMintAction =
  /*#__PURE__*/ createWriteContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "moduleMintAction",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"moduleTransferAction"`
 */
export const writeCountryAllowModuleModuleTransferAction =
  /*#__PURE__*/ createWriteContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "moduleTransferAction",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"removeAllowedCountry"`
 */
export const writeCountryAllowModuleRemoveAllowedCountry =
  /*#__PURE__*/ createWriteContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "removeAllowedCountry",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"unbindCompliance"`
 */
export const writeCountryAllowModuleUnbindCompliance =
  /*#__PURE__*/ createWriteContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "unbindCompliance",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link countryAllowModuleAbi}__
 */
export const simulateCountryAllowModule = /*#__PURE__*/ createSimulateContract({
  abi: countryAllowModuleAbi,
  address: countryAllowModuleAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"addAllowedCountry"`
 */
export const simulateCountryAllowModuleAddAllowedCountry =
  /*#__PURE__*/ createSimulateContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "addAllowedCountry",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"batchAllowCountries"`
 */
export const simulateCountryAllowModuleBatchAllowCountries =
  /*#__PURE__*/ createSimulateContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "batchAllowCountries",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"batchDisallowCountries"`
 */
export const simulateCountryAllowModuleBatchDisallowCountries =
  /*#__PURE__*/ createSimulateContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "batchDisallowCountries",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"bindCompliance"`
 */
export const simulateCountryAllowModuleBindCompliance =
  /*#__PURE__*/ createSimulateContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "bindCompliance",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"moduleBurnAction"`
 */
export const simulateCountryAllowModuleModuleBurnAction =
  /*#__PURE__*/ createSimulateContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "moduleBurnAction",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"moduleMintAction"`
 */
export const simulateCountryAllowModuleModuleMintAction =
  /*#__PURE__*/ createSimulateContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "moduleMintAction",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"moduleTransferAction"`
 */
export const simulateCountryAllowModuleModuleTransferAction =
  /*#__PURE__*/ createSimulateContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "moduleTransferAction",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"removeAllowedCountry"`
 */
export const simulateCountryAllowModuleRemoveAllowedCountry =
  /*#__PURE__*/ createSimulateContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "removeAllowedCountry",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `functionName` set to `"unbindCompliance"`
 */
export const simulateCountryAllowModuleUnbindCompliance =
  /*#__PURE__*/ createSimulateContract({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    functionName: "unbindCompliance",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link countryAllowModuleAbi}__
 */
export const watchCountryAllowModuleEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `eventName` set to `"ComplianceBound"`
 */
export const watchCountryAllowModuleComplianceBoundEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    eventName: "ComplianceBound",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `eventName` set to `"ComplianceUnbound"`
 */
export const watchCountryAllowModuleComplianceUnboundEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    eventName: "ComplianceUnbound",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `eventName` set to `"CountryAllowed"`
 */
export const watchCountryAllowModuleCountryAllowedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    eventName: "CountryAllowed",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link countryAllowModuleAbi}__ and `eventName` set to `"CountryUnallowed"`
 */
export const watchCountryAllowModuleCountryUnallowedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: countryAllowModuleAbi,
    address: countryAllowModuleAddress,
    eventName: "CountryUnallowed",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const readErc20 = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  address: erc20Address,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const readErc20DomainSeparator = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: "DOMAIN_SEPARATOR",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const readErc20Allowance = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: "allowance",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readErc20BalanceOf = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const readErc20Decimals = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: "decimals",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const readErc20Name = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: "name",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"nonces"`
 */
export const readErc20Nonces = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: "nonces",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const readErc20Symbol = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: "symbol",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const readErc20TotalSupply = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const writeErc20 = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  address: erc20Address,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const writeErc20Approve = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: "approve",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"permit"`
 */
export const writeErc20Permit = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: "permit",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const writeErc20Transfer = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: "transfer",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const writeErc20TransferFrom = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: "transferFrom",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const simulateErc20 = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
  address: erc20Address,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const simulateErc20Approve = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: "approve",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"permit"`
 */
export const simulateErc20Permit = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: "permit",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const simulateErc20Transfer = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: "transfer",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateErc20TransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
  address: erc20Address,
  functionName: "transferFrom",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const watchErc20Event = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20Abi,
  address: erc20Address,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const watchErc20ApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20Abi,
  address: erc20Address,
  eventName: "Approval",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const watchErc20TransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20Abi,
  address: erc20Address,
  eventName: "Transfer",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__
 */
export const readHederaVault = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const readHederaVaultDefaultAdminRole = /*#__PURE__*/ createReadContract(
  {
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "DEFAULT_ADMIN_ROLE",
  },
);

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const readHederaVaultDomainSeparator = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "DOMAIN_SEPARATOR",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"FEE_CONFIG_CONTROLLER_ROLE"`
 */
export const readHederaVaultFeeConfigControllerRole =
  /*#__PURE__*/ createReadContract({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "FEE_CONFIG_CONTROLLER_ROLE",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"VAULT_REWARD_CONTROLLER_ROLE"`
 */
export const readHederaVaultVaultRewardControllerRole =
  /*#__PURE__*/ createReadContract({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "VAULT_REWARD_CONTROLLER_ROLE",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"allowance"`
 */
export const readHederaVaultAllowance = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "allowance",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"asset"`
 */
export const readHederaVaultAsset = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "asset",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"assetTotalSupply"`
 */
export const readHederaVaultAssetTotalSupply = /*#__PURE__*/ createReadContract(
  {
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "assetTotalSupply",
  },
);

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"assetsOf"`
 */
export const readHederaVaultAssetsOf = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "assetsOf",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"assetsPerShare"`
 */
export const readHederaVaultAssetsPerShare = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "assetsPerShare",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readHederaVaultBalanceOf = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"calculateReward"`
 */
export const readHederaVaultCalculateReward = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "calculateReward",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"decimals"`
 */
export const readHederaVaultDecimals = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "decimals",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"feeConfig"`
 */
export const readHederaVaultFeeConfig = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "feeConfig",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const readHederaVaultGetRoleAdmin = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "getRoleAdmin",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"hasRole"`
 */
export const readHederaVaultHasRole = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "hasRole",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"maxDeposit"`
 */
export const readHederaVaultMaxDeposit = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "maxDeposit",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"maxMint"`
 */
export const readHederaVaultMaxMint = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "maxMint",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"maxRedeem"`
 */
export const readHederaVaultMaxRedeem = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "maxRedeem",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"maxWithdraw"`
 */
export const readHederaVaultMaxWithdraw = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "maxWithdraw",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"name"`
 */
export const readHederaVaultName = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "name",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"nonces"`
 */
export const readHederaVaultNonces = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "nonces",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"owner"`
 */
export const readHederaVaultOwner = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"previewDeposit"`
 */
export const readHederaVaultPreviewDeposit = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "previewDeposit",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"previewMint"`
 */
export const readHederaVaultPreviewMint = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "previewMint",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"previewRedeem"`
 */
export const readHederaVaultPreviewRedeem = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "previewRedeem",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"previewWithdraw"`
 */
export const readHederaVaultPreviewWithdraw = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "previewWithdraw",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"rewardTokens"`
 */
export const readHederaVaultRewardTokens = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "rewardTokens",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"share"`
 */
export const readHederaVaultShare = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "share",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readHederaVaultSupportsInterface =
  /*#__PURE__*/ createReadContract({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "supportsInterface",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"symbol"`
 */
export const readHederaVaultSymbol = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "symbol",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"tokensRewardInfo"`
 */
export const readHederaVaultTokensRewardInfo = /*#__PURE__*/ createReadContract(
  {
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "tokensRewardInfo",
  },
);

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"totalAssets"`
 */
export const readHederaVaultTotalAssets = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "totalAssets",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"totalSupply"`
 */
export const readHederaVaultTotalSupply = /*#__PURE__*/ createReadContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"userContribution"`
 */
export const readHederaVaultUserContribution = /*#__PURE__*/ createReadContract(
  {
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "userContribution",
  },
);

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link hederaVaultAbi}__
 */
export const writeHederaVault = /*#__PURE__*/ createWriteContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"addReward"`
 */
export const writeHederaVaultAddReward = /*#__PURE__*/ createWriteContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "addReward",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"approve"`
 */
export const writeHederaVaultApprove = /*#__PURE__*/ createWriteContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "approve",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"claimAllReward"`
 */
export const writeHederaVaultClaimAllReward = /*#__PURE__*/ createWriteContract(
  {
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "claimAllReward",
  },
);

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"deposit"`
 */
export const writeHederaVaultDeposit = /*#__PURE__*/ createWriteContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "deposit",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"grantRole"`
 */
export const writeHederaVaultGrantRole = /*#__PURE__*/ createWriteContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "grantRole",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"mint"`
 */
export const writeHederaVaultMint = /*#__PURE__*/ createWriteContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "mint",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"permit"`
 */
export const writeHederaVaultPermit = /*#__PURE__*/ createWriteContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "permit",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"redeem"`
 */
export const writeHederaVaultRedeem = /*#__PURE__*/ createWriteContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "redeem",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeHederaVaultRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"renounceRole"`
 */
export const writeHederaVaultRenounceRole = /*#__PURE__*/ createWriteContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "renounceRole",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"revokeRole"`
 */
export const writeHederaVaultRevokeRole = /*#__PURE__*/ createWriteContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "revokeRole",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"transfer"`
 */
export const writeHederaVaultTransfer = /*#__PURE__*/ createWriteContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "transfer",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeHederaVaultTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "transferFrom",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeHederaVaultTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"updateFeeConfig"`
 */
export const writeHederaVaultUpdateFeeConfig =
  /*#__PURE__*/ createWriteContract({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "updateFeeConfig",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"withdraw"`
 */
export const writeHederaVaultWithdraw = /*#__PURE__*/ createWriteContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "withdraw",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link hederaVaultAbi}__
 */
export const simulateHederaVault = /*#__PURE__*/ createSimulateContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"addReward"`
 */
export const simulateHederaVaultAddReward =
  /*#__PURE__*/ createSimulateContract({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "addReward",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"approve"`
 */
export const simulateHederaVaultApprove = /*#__PURE__*/ createSimulateContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "approve",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"claimAllReward"`
 */
export const simulateHederaVaultClaimAllReward =
  /*#__PURE__*/ createSimulateContract({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "claimAllReward",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"deposit"`
 */
export const simulateHederaVaultDeposit = /*#__PURE__*/ createSimulateContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "deposit",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"grantRole"`
 */
export const simulateHederaVaultGrantRole =
  /*#__PURE__*/ createSimulateContract({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "grantRole",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"mint"`
 */
export const simulateHederaVaultMint = /*#__PURE__*/ createSimulateContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "mint",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"permit"`
 */
export const simulateHederaVaultPermit = /*#__PURE__*/ createSimulateContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "permit",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"redeem"`
 */
export const simulateHederaVaultRedeem = /*#__PURE__*/ createSimulateContract({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
  functionName: "redeem",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateHederaVaultRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"renounceRole"`
 */
export const simulateHederaVaultRenounceRole =
  /*#__PURE__*/ createSimulateContract({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "renounceRole",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"revokeRole"`
 */
export const simulateHederaVaultRevokeRole =
  /*#__PURE__*/ createSimulateContract({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "revokeRole",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"transfer"`
 */
export const simulateHederaVaultTransfer = /*#__PURE__*/ createSimulateContract(
  {
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "transfer",
  },
);

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateHederaVaultTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateHederaVaultTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"updateFeeConfig"`
 */
export const simulateHederaVaultUpdateFeeConfig =
  /*#__PURE__*/ createSimulateContract({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "updateFeeConfig",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link hederaVaultAbi}__ and `functionName` set to `"withdraw"`
 */
export const simulateHederaVaultWithdraw = /*#__PURE__*/ createSimulateContract(
  {
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    functionName: "withdraw",
  },
);

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link hederaVaultAbi}__
 */
export const watchHederaVaultEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: hederaVaultAbi,
  address: hederaVaultAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link hederaVaultAbi}__ and `eventName` set to `"Approval"`
 */
export const watchHederaVaultApprovalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    eventName: "Approval",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link hederaVaultAbi}__ and `eventName` set to `"CreatedToken"`
 */
export const watchHederaVaultCreatedTokenEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    eventName: "CreatedToken",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link hederaVaultAbi}__ and `eventName` set to `"Deposit"`
 */
export const watchHederaVaultDepositEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    eventName: "Deposit",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link hederaVaultAbi}__ and `eventName` set to `"FeeConfigUpdated"`
 */
export const watchHederaVaultFeeConfigUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    eventName: "FeeConfigUpdated",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link hederaVaultAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchHederaVaultOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link hederaVaultAbi}__ and `eventName` set to `"RewardAdded"`
 */
export const watchHederaVaultRewardAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    eventName: "RewardAdded",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link hederaVaultAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const watchHederaVaultRoleAdminChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    eventName: "RoleAdminChanged",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link hederaVaultAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const watchHederaVaultRoleGrantedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    eventName: "RoleGranted",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link hederaVaultAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const watchHederaVaultRoleRevokedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    eventName: "RoleRevoked",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link hederaVaultAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchHederaVaultTransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    eventName: "Transfer",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link hederaVaultAbi}__ and `eventName` set to `"Withdraw"`
 */
export const watchHederaVaultWithdrawEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: hederaVaultAbi,
    address: hederaVaultAddress,
    eventName: "Withdraw",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link idFactoryAbi}__
 */
export const readIdFactory = /*#__PURE__*/ createReadContract({
  abi: idFactoryAbi,
  address: idFactoryAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"getIdentity"`
 */
export const readIdFactoryGetIdentity = /*#__PURE__*/ createReadContract({
  abi: idFactoryAbi,
  address: idFactoryAddress,
  functionName: "getIdentity",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"getToken"`
 */
export const readIdFactoryGetToken = /*#__PURE__*/ createReadContract({
  abi: idFactoryAbi,
  address: idFactoryAddress,
  functionName: "getToken",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"getWallets"`
 */
export const readIdFactoryGetWallets = /*#__PURE__*/ createReadContract({
  abi: idFactoryAbi,
  address: idFactoryAddress,
  functionName: "getWallets",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"implementationAuthority"`
 */
export const readIdFactoryImplementationAuthority =
  /*#__PURE__*/ createReadContract({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    functionName: "implementationAuthority",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"isSaltTaken"`
 */
export const readIdFactoryIsSaltTaken = /*#__PURE__*/ createReadContract({
  abi: idFactoryAbi,
  address: idFactoryAddress,
  functionName: "isSaltTaken",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"isTokenFactory"`
 */
export const readIdFactoryIsTokenFactory = /*#__PURE__*/ createReadContract({
  abi: idFactoryAbi,
  address: idFactoryAddress,
  functionName: "isTokenFactory",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"owner"`
 */
export const readIdFactoryOwner = /*#__PURE__*/ createReadContract({
  abi: idFactoryAbi,
  address: idFactoryAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link idFactoryAbi}__
 */
export const writeIdFactory = /*#__PURE__*/ createWriteContract({
  abi: idFactoryAbi,
  address: idFactoryAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"addTokenFactory"`
 */
export const writeIdFactoryAddTokenFactory = /*#__PURE__*/ createWriteContract({
  abi: idFactoryAbi,
  address: idFactoryAddress,
  functionName: "addTokenFactory",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"createIdentity"`
 */
export const writeIdFactoryCreateIdentity = /*#__PURE__*/ createWriteContract({
  abi: idFactoryAbi,
  address: idFactoryAddress,
  functionName: "createIdentity",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"createIdentityWithManagementKeys"`
 */
export const writeIdFactoryCreateIdentityWithManagementKeys =
  /*#__PURE__*/ createWriteContract({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    functionName: "createIdentityWithManagementKeys",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"createTokenIdentity"`
 */
export const writeIdFactoryCreateTokenIdentity =
  /*#__PURE__*/ createWriteContract({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    functionName: "createTokenIdentity",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"linkWallet"`
 */
export const writeIdFactoryLinkWallet = /*#__PURE__*/ createWriteContract({
  abi: idFactoryAbi,
  address: idFactoryAddress,
  functionName: "linkWallet",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"removeTokenFactory"`
 */
export const writeIdFactoryRemoveTokenFactory =
  /*#__PURE__*/ createWriteContract({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    functionName: "removeTokenFactory",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeIdFactoryRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeIdFactoryTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"unlinkWallet"`
 */
export const writeIdFactoryUnlinkWallet = /*#__PURE__*/ createWriteContract({
  abi: idFactoryAbi,
  address: idFactoryAddress,
  functionName: "unlinkWallet",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link idFactoryAbi}__
 */
export const simulateIdFactory = /*#__PURE__*/ createSimulateContract({
  abi: idFactoryAbi,
  address: idFactoryAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"addTokenFactory"`
 */
export const simulateIdFactoryAddTokenFactory =
  /*#__PURE__*/ createSimulateContract({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    functionName: "addTokenFactory",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"createIdentity"`
 */
export const simulateIdFactoryCreateIdentity =
  /*#__PURE__*/ createSimulateContract({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    functionName: "createIdentity",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"createIdentityWithManagementKeys"`
 */
export const simulateIdFactoryCreateIdentityWithManagementKeys =
  /*#__PURE__*/ createSimulateContract({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    functionName: "createIdentityWithManagementKeys",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"createTokenIdentity"`
 */
export const simulateIdFactoryCreateTokenIdentity =
  /*#__PURE__*/ createSimulateContract({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    functionName: "createTokenIdentity",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"linkWallet"`
 */
export const simulateIdFactoryLinkWallet = /*#__PURE__*/ createSimulateContract(
  { abi: idFactoryAbi, address: idFactoryAddress, functionName: "linkWallet" },
);

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"removeTokenFactory"`
 */
export const simulateIdFactoryRemoveTokenFactory =
  /*#__PURE__*/ createSimulateContract({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    functionName: "removeTokenFactory",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateIdFactoryRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateIdFactoryTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link idFactoryAbi}__ and `functionName` set to `"unlinkWallet"`
 */
export const simulateIdFactoryUnlinkWallet =
  /*#__PURE__*/ createSimulateContract({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    functionName: "unlinkWallet",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link idFactoryAbi}__
 */
export const watchIdFactoryEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: idFactoryAbi,
  address: idFactoryAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link idFactoryAbi}__ and `eventName` set to `"Deployed"`
 */
export const watchIdFactoryDeployedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    eventName: "Deployed",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link idFactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchIdFactoryOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link idFactoryAbi}__ and `eventName` set to `"TokenFactoryAdded"`
 */
export const watchIdFactoryTokenFactoryAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    eventName: "TokenFactoryAdded",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link idFactoryAbi}__ and `eventName` set to `"TokenFactoryRemoved"`
 */
export const watchIdFactoryTokenFactoryRemovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    eventName: "TokenFactoryRemoved",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link idFactoryAbi}__ and `eventName` set to `"TokenLinked"`
 */
export const watchIdFactoryTokenLinkedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    eventName: "TokenLinked",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link idFactoryAbi}__ and `eventName` set to `"WalletLinked"`
 */
export const watchIdFactoryWalletLinkedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    eventName: "WalletLinked",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link idFactoryAbi}__ and `eventName` set to `"WalletUnlinked"`
 */
export const watchIdFactoryWalletUnlinkedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: idFactoryAbi,
    address: idFactoryAddress,
    eventName: "WalletUnlinked",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityAbi}__
 */
export const readIdentity = /*#__PURE__*/ createReadContract({
  abi: identityAbi,
  address: identityAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"getClaim"`
 */
export const readIdentityGetClaim = /*#__PURE__*/ createReadContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "getClaim",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"getClaimIdsByTopic"`
 */
export const readIdentityGetClaimIdsByTopic = /*#__PURE__*/ createReadContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "getClaimIdsByTopic",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"getKey"`
 */
export const readIdentityGetKey = /*#__PURE__*/ createReadContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "getKey",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"getKeyPurposes"`
 */
export const readIdentityGetKeyPurposes = /*#__PURE__*/ createReadContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "getKeyPurposes",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"getKeysByPurpose"`
 */
export const readIdentityGetKeysByPurpose = /*#__PURE__*/ createReadContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "getKeysByPurpose",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"getRecoveredAddress"`
 */
export const readIdentityGetRecoveredAddress = /*#__PURE__*/ createReadContract(
  {
    abi: identityAbi,
    address: identityAddress,
    functionName: "getRecoveredAddress",
  },
);

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"isClaimValid"`
 */
export const readIdentityIsClaimValid = /*#__PURE__*/ createReadContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "isClaimValid",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"keyHasPurpose"`
 */
export const readIdentityKeyHasPurpose = /*#__PURE__*/ createReadContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "keyHasPurpose",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"version"`
 */
export const readIdentityVersion = /*#__PURE__*/ createReadContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "version",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityAbi}__
 */
export const writeIdentity = /*#__PURE__*/ createWriteContract({
  abi: identityAbi,
  address: identityAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"addClaim"`
 */
export const writeIdentityAddClaim = /*#__PURE__*/ createWriteContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "addClaim",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"addKey"`
 */
export const writeIdentityAddKey = /*#__PURE__*/ createWriteContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "addKey",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"approve"`
 */
export const writeIdentityApprove = /*#__PURE__*/ createWriteContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "approve",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"execute"`
 */
export const writeIdentityExecute = /*#__PURE__*/ createWriteContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "execute",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"initialize"`
 */
export const writeIdentityInitialize = /*#__PURE__*/ createWriteContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "initialize",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"removeClaim"`
 */
export const writeIdentityRemoveClaim = /*#__PURE__*/ createWriteContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "removeClaim",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"removeKey"`
 */
export const writeIdentityRemoveKey = /*#__PURE__*/ createWriteContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "removeKey",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityAbi}__
 */
export const simulateIdentity = /*#__PURE__*/ createSimulateContract({
  abi: identityAbi,
  address: identityAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"addClaim"`
 */
export const simulateIdentityAddClaim = /*#__PURE__*/ createSimulateContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "addClaim",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"addKey"`
 */
export const simulateIdentityAddKey = /*#__PURE__*/ createSimulateContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "addKey",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"approve"`
 */
export const simulateIdentityApprove = /*#__PURE__*/ createSimulateContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "approve",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"execute"`
 */
export const simulateIdentityExecute = /*#__PURE__*/ createSimulateContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "execute",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"initialize"`
 */
export const simulateIdentityInitialize = /*#__PURE__*/ createSimulateContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "initialize",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"removeClaim"`
 */
export const simulateIdentityRemoveClaim = /*#__PURE__*/ createSimulateContract(
  { abi: identityAbi, address: identityAddress, functionName: "removeClaim" },
);

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityAbi}__ and `functionName` set to `"removeKey"`
 */
export const simulateIdentityRemoveKey = /*#__PURE__*/ createSimulateContract({
  abi: identityAbi,
  address: identityAddress,
  functionName: "removeKey",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityAbi}__
 */
export const watchIdentityEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: identityAbi,
  address: identityAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityAbi}__ and `eventName` set to `"Approved"`
 */
export const watchIdentityApprovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityAbi,
    address: identityAddress,
    eventName: "Approved",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityAbi}__ and `eventName` set to `"ClaimAdded"`
 */
export const watchIdentityClaimAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityAbi,
    address: identityAddress,
    eventName: "ClaimAdded",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityAbi}__ and `eventName` set to `"ClaimChanged"`
 */
export const watchIdentityClaimChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityAbi,
    address: identityAddress,
    eventName: "ClaimChanged",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityAbi}__ and `eventName` set to `"ClaimRemoved"`
 */
export const watchIdentityClaimRemovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityAbi,
    address: identityAddress,
    eventName: "ClaimRemoved",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityAbi}__ and `eventName` set to `"Executed"`
 */
export const watchIdentityExecutedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityAbi,
    address: identityAddress,
    eventName: "Executed",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityAbi}__ and `eventName` set to `"ExecutionFailed"`
 */
export const watchIdentityExecutionFailedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityAbi,
    address: identityAddress,
    eventName: "ExecutionFailed",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityAbi}__ and `eventName` set to `"ExecutionRequested"`
 */
export const watchIdentityExecutionRequestedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityAbi,
    address: identityAddress,
    eventName: "ExecutionRequested",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityAbi}__ and `eventName` set to `"KeyAdded"`
 */
export const watchIdentityKeyAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityAbi,
    address: identityAddress,
    eventName: "KeyAdded",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityAbi}__ and `eventName` set to `"KeyRemoved"`
 */
export const watchIdentityKeyRemovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityAbi,
    address: identityAddress,
    eventName: "KeyRemoved",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityGatewayAbi}__
 */
export const readIdentityGateway = /*#__PURE__*/ createReadContract({
  abi: identityGatewayAbi,
  address: identityGatewayAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"approvedSigners"`
 */
export const readIdentityGatewayApprovedSigners =
  /*#__PURE__*/ createReadContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "approvedSigners",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"idFactory"`
 */
export const readIdentityGatewayIdFactory = /*#__PURE__*/ createReadContract({
  abi: identityGatewayAbi,
  address: identityGatewayAddress,
  functionName: "idFactory",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"owner"`
 */
export const readIdentityGatewayOwner = /*#__PURE__*/ createReadContract({
  abi: identityGatewayAbi,
  address: identityGatewayAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"revokedSignatures"`
 */
export const readIdentityGatewayRevokedSignatures =
  /*#__PURE__*/ createReadContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "revokedSignatures",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityGatewayAbi}__
 */
export const writeIdentityGateway = /*#__PURE__*/ createWriteContract({
  abi: identityGatewayAbi,
  address: identityGatewayAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"approveSignature"`
 */
export const writeIdentityGatewayApproveSignature =
  /*#__PURE__*/ createWriteContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "approveSignature",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"approveSigner"`
 */
export const writeIdentityGatewayApproveSigner =
  /*#__PURE__*/ createWriteContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "approveSigner",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"callFactory"`
 */
export const writeIdentityGatewayCallFactory =
  /*#__PURE__*/ createWriteContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "callFactory",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"deployIdentityForWallet"`
 */
export const writeIdentityGatewayDeployIdentityForWallet =
  /*#__PURE__*/ createWriteContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "deployIdentityForWallet",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"deployIdentityWithSalt"`
 */
export const writeIdentityGatewayDeployIdentityWithSalt =
  /*#__PURE__*/ createWriteContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "deployIdentityWithSalt",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"deployIdentityWithSaltAndManagementKeys"`
 */
export const writeIdentityGatewayDeployIdentityWithSaltAndManagementKeys =
  /*#__PURE__*/ createWriteContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "deployIdentityWithSaltAndManagementKeys",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeIdentityGatewayRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"revokeSignature"`
 */
export const writeIdentityGatewayRevokeSignature =
  /*#__PURE__*/ createWriteContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "revokeSignature",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"revokeSigner"`
 */
export const writeIdentityGatewayRevokeSigner =
  /*#__PURE__*/ createWriteContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "revokeSigner",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"transferFactoryOwnership"`
 */
export const writeIdentityGatewayTransferFactoryOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "transferFactoryOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeIdentityGatewayTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityGatewayAbi}__
 */
export const simulateIdentityGateway = /*#__PURE__*/ createSimulateContract({
  abi: identityGatewayAbi,
  address: identityGatewayAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"approveSignature"`
 */
export const simulateIdentityGatewayApproveSignature =
  /*#__PURE__*/ createSimulateContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "approveSignature",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"approveSigner"`
 */
export const simulateIdentityGatewayApproveSigner =
  /*#__PURE__*/ createSimulateContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "approveSigner",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"callFactory"`
 */
export const simulateIdentityGatewayCallFactory =
  /*#__PURE__*/ createSimulateContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "callFactory",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"deployIdentityForWallet"`
 */
export const simulateIdentityGatewayDeployIdentityForWallet =
  /*#__PURE__*/ createSimulateContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "deployIdentityForWallet",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"deployIdentityWithSalt"`
 */
export const simulateIdentityGatewayDeployIdentityWithSalt =
  /*#__PURE__*/ createSimulateContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "deployIdentityWithSalt",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"deployIdentityWithSaltAndManagementKeys"`
 */
export const simulateIdentityGatewayDeployIdentityWithSaltAndManagementKeys =
  /*#__PURE__*/ createSimulateContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "deployIdentityWithSaltAndManagementKeys",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateIdentityGatewayRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"revokeSignature"`
 */
export const simulateIdentityGatewayRevokeSignature =
  /*#__PURE__*/ createSimulateContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "revokeSignature",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"revokeSigner"`
 */
export const simulateIdentityGatewayRevokeSigner =
  /*#__PURE__*/ createSimulateContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "revokeSigner",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"transferFactoryOwnership"`
 */
export const simulateIdentityGatewayTransferFactoryOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "transferFactoryOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityGatewayAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateIdentityGatewayTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityGatewayAbi}__
 */
export const watchIdentityGatewayEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: identityGatewayAbi, address: identityGatewayAddress },
);

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityGatewayAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchIdentityGatewayOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityGatewayAbi}__ and `eventName` set to `"SignatureApproved"`
 */
export const watchIdentityGatewaySignatureApprovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    eventName: "SignatureApproved",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityGatewayAbi}__ and `eventName` set to `"SignatureRevoked"`
 */
export const watchIdentityGatewaySignatureRevokedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    eventName: "SignatureRevoked",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityGatewayAbi}__ and `eventName` set to `"SignerApproved"`
 */
export const watchIdentityGatewaySignerApprovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    eventName: "SignerApproved",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityGatewayAbi}__ and `eventName` set to `"SignerRevoked"`
 */
export const watchIdentityGatewaySignerRevokedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityGatewayAbi,
    address: identityGatewayAddress,
    eventName: "SignerRevoked",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityRegistryAbi}__
 */
export const readIdentityRegistry = /*#__PURE__*/ createReadContract({
  abi: identityRegistryAbi,
  address: identityRegistryAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"contains"`
 */
export const readIdentityRegistryContains = /*#__PURE__*/ createReadContract({
  abi: identityRegistryAbi,
  address: identityRegistryAddress,
  functionName: "contains",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"identity"`
 */
export const readIdentityRegistryIdentity = /*#__PURE__*/ createReadContract({
  abi: identityRegistryAbi,
  address: identityRegistryAddress,
  functionName: "identity",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"identityStorage"`
 */
export const readIdentityRegistryIdentityStorage =
  /*#__PURE__*/ createReadContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "identityStorage",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"investorCountry"`
 */
export const readIdentityRegistryInvestorCountry =
  /*#__PURE__*/ createReadContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "investorCountry",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"isAgent"`
 */
export const readIdentityRegistryIsAgent = /*#__PURE__*/ createReadContract({
  abi: identityRegistryAbi,
  address: identityRegistryAddress,
  functionName: "isAgent",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"isVerified"`
 */
export const readIdentityRegistryIsVerified = /*#__PURE__*/ createReadContract({
  abi: identityRegistryAbi,
  address: identityRegistryAddress,
  functionName: "isVerified",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"issuersRegistry"`
 */
export const readIdentityRegistryIssuersRegistry =
  /*#__PURE__*/ createReadContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "issuersRegistry",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"owner"`
 */
export const readIdentityRegistryOwner = /*#__PURE__*/ createReadContract({
  abi: identityRegistryAbi,
  address: identityRegistryAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"topicsRegistry"`
 */
export const readIdentityRegistryTopicsRegistry =
  /*#__PURE__*/ createReadContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "topicsRegistry",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryAbi}__
 */
export const writeIdentityRegistry = /*#__PURE__*/ createWriteContract({
  abi: identityRegistryAbi,
  address: identityRegistryAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"addAgent"`
 */
export const writeIdentityRegistryAddAgent = /*#__PURE__*/ createWriteContract({
  abi: identityRegistryAbi,
  address: identityRegistryAddress,
  functionName: "addAgent",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"batchRegisterIdentity"`
 */
export const writeIdentityRegistryBatchRegisterIdentity =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "batchRegisterIdentity",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"deleteIdentity"`
 */
export const writeIdentityRegistryDeleteIdentity =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "deleteIdentity",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"init"`
 */
export const writeIdentityRegistryInit = /*#__PURE__*/ createWriteContract({
  abi: identityRegistryAbi,
  address: identityRegistryAddress,
  functionName: "init",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"registerIdentity"`
 */
export const writeIdentityRegistryRegisterIdentity =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "registerIdentity",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"removeAgent"`
 */
export const writeIdentityRegistryRemoveAgent =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "removeAgent",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeIdentityRegistryRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"setClaimTopicsRegistry"`
 */
export const writeIdentityRegistrySetClaimTopicsRegistry =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "setClaimTopicsRegistry",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"setIdentityRegistryStorage"`
 */
export const writeIdentityRegistrySetIdentityRegistryStorage =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "setIdentityRegistryStorage",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"setTrustedIssuersRegistry"`
 */
export const writeIdentityRegistrySetTrustedIssuersRegistry =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "setTrustedIssuersRegistry",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeIdentityRegistryTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"updateCountry"`
 */
export const writeIdentityRegistryUpdateCountry =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "updateCountry",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"updateIdentity"`
 */
export const writeIdentityRegistryUpdateIdentity =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "updateIdentity",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryAbi}__
 */
export const simulateIdentityRegistry = /*#__PURE__*/ createSimulateContract({
  abi: identityRegistryAbi,
  address: identityRegistryAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"addAgent"`
 */
export const simulateIdentityRegistryAddAgent =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "addAgent",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"batchRegisterIdentity"`
 */
export const simulateIdentityRegistryBatchRegisterIdentity =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "batchRegisterIdentity",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"deleteIdentity"`
 */
export const simulateIdentityRegistryDeleteIdentity =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "deleteIdentity",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"init"`
 */
export const simulateIdentityRegistryInit =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "init",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"registerIdentity"`
 */
export const simulateIdentityRegistryRegisterIdentity =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "registerIdentity",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"removeAgent"`
 */
export const simulateIdentityRegistryRemoveAgent =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "removeAgent",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateIdentityRegistryRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"setClaimTopicsRegistry"`
 */
export const simulateIdentityRegistrySetClaimTopicsRegistry =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "setClaimTopicsRegistry",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"setIdentityRegistryStorage"`
 */
export const simulateIdentityRegistrySetIdentityRegistryStorage =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "setIdentityRegistryStorage",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"setTrustedIssuersRegistry"`
 */
export const simulateIdentityRegistrySetTrustedIssuersRegistry =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "setTrustedIssuersRegistry",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateIdentityRegistryTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"updateCountry"`
 */
export const simulateIdentityRegistryUpdateCountry =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "updateCountry",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryAbi}__ and `functionName` set to `"updateIdentity"`
 */
export const simulateIdentityRegistryUpdateIdentity =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    functionName: "updateIdentity",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryAbi}__
 */
export const watchIdentityRegistryEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryAbi}__ and `eventName` set to `"AgentAdded"`
 */
export const watchIdentityRegistryAgentAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    eventName: "AgentAdded",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryAbi}__ and `eventName` set to `"AgentRemoved"`
 */
export const watchIdentityRegistryAgentRemovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    eventName: "AgentRemoved",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryAbi}__ and `eventName` set to `"ClaimTopicsRegistrySet"`
 */
export const watchIdentityRegistryClaimTopicsRegistrySetEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    eventName: "ClaimTopicsRegistrySet",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryAbi}__ and `eventName` set to `"CountryUpdated"`
 */
export const watchIdentityRegistryCountryUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    eventName: "CountryUpdated",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryAbi}__ and `eventName` set to `"IdentityRegistered"`
 */
export const watchIdentityRegistryIdentityRegisteredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    eventName: "IdentityRegistered",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryAbi}__ and `eventName` set to `"IdentityRemoved"`
 */
export const watchIdentityRegistryIdentityRemovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    eventName: "IdentityRemoved",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryAbi}__ and `eventName` set to `"IdentityStorageSet"`
 */
export const watchIdentityRegistryIdentityStorageSetEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    eventName: "IdentityStorageSet",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryAbi}__ and `eventName` set to `"IdentityUpdated"`
 */
export const watchIdentityRegistryIdentityUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    eventName: "IdentityUpdated",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryAbi}__ and `eventName` set to `"Initialized"`
 */
export const watchIdentityRegistryInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    eventName: "Initialized",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchIdentityRegistryOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryAbi}__ and `eventName` set to `"TrustedIssuersRegistrySet"`
 */
export const watchIdentityRegistryTrustedIssuersRegistrySetEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryAbi,
    address: identityRegistryAddress,
    eventName: "TrustedIssuersRegistrySet",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__
 */
export const readIdentityRegistryStorage = /*#__PURE__*/ createReadContract({
  abi: identityRegistryStorageAbi,
  address: identityRegistryStorageAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"isAgent"`
 */
export const readIdentityRegistryStorageIsAgent =
  /*#__PURE__*/ createReadContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "isAgent",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"linkedIdentityRegistries"`
 */
export const readIdentityRegistryStorageLinkedIdentityRegistries =
  /*#__PURE__*/ createReadContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "linkedIdentityRegistries",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"owner"`
 */
export const readIdentityRegistryStorageOwner =
  /*#__PURE__*/ createReadContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "owner",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"storedIdentity"`
 */
export const readIdentityRegistryStorageStoredIdentity =
  /*#__PURE__*/ createReadContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "storedIdentity",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"storedInvestorCountry"`
 */
export const readIdentityRegistryStorageStoredInvestorCountry =
  /*#__PURE__*/ createReadContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "storedInvestorCountry",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__
 */
export const writeIdentityRegistryStorage = /*#__PURE__*/ createWriteContract({
  abi: identityRegistryStorageAbi,
  address: identityRegistryStorageAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"addAgent"`
 */
export const writeIdentityRegistryStorageAddAgent =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "addAgent",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"addIdentityToStorage"`
 */
export const writeIdentityRegistryStorageAddIdentityToStorage =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "addIdentityToStorage",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"bindIdentityRegistry"`
 */
export const writeIdentityRegistryStorageBindIdentityRegistry =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "bindIdentityRegistry",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"init"`
 */
export const writeIdentityRegistryStorageInit =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "init",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"modifyStoredIdentity"`
 */
export const writeIdentityRegistryStorageModifyStoredIdentity =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "modifyStoredIdentity",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"modifyStoredInvestorCountry"`
 */
export const writeIdentityRegistryStorageModifyStoredInvestorCountry =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "modifyStoredInvestorCountry",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"removeAgent"`
 */
export const writeIdentityRegistryStorageRemoveAgent =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "removeAgent",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"removeIdentityFromStorage"`
 */
export const writeIdentityRegistryStorageRemoveIdentityFromStorage =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "removeIdentityFromStorage",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeIdentityRegistryStorageRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeIdentityRegistryStorageTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"unbindIdentityRegistry"`
 */
export const writeIdentityRegistryStorageUnbindIdentityRegistry =
  /*#__PURE__*/ createWriteContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "unbindIdentityRegistry",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__
 */
export const simulateIdentityRegistryStorage =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"addAgent"`
 */
export const simulateIdentityRegistryStorageAddAgent =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "addAgent",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"addIdentityToStorage"`
 */
export const simulateIdentityRegistryStorageAddIdentityToStorage =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "addIdentityToStorage",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"bindIdentityRegistry"`
 */
export const simulateIdentityRegistryStorageBindIdentityRegistry =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "bindIdentityRegistry",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"init"`
 */
export const simulateIdentityRegistryStorageInit =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "init",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"modifyStoredIdentity"`
 */
export const simulateIdentityRegistryStorageModifyStoredIdentity =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "modifyStoredIdentity",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"modifyStoredInvestorCountry"`
 */
export const simulateIdentityRegistryStorageModifyStoredInvestorCountry =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "modifyStoredInvestorCountry",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"removeAgent"`
 */
export const simulateIdentityRegistryStorageRemoveAgent =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "removeAgent",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"removeIdentityFromStorage"`
 */
export const simulateIdentityRegistryStorageRemoveIdentityFromStorage =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "removeIdentityFromStorage",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateIdentityRegistryStorageRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateIdentityRegistryStorageTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `functionName` set to `"unbindIdentityRegistry"`
 */
export const simulateIdentityRegistryStorageUnbindIdentityRegistry =
  /*#__PURE__*/ createSimulateContract({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    functionName: "unbindIdentityRegistry",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryStorageAbi}__
 */
export const watchIdentityRegistryStorageEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `eventName` set to `"AgentAdded"`
 */
export const watchIdentityRegistryStorageAgentAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    eventName: "AgentAdded",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `eventName` set to `"AgentRemoved"`
 */
export const watchIdentityRegistryStorageAgentRemovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    eventName: "AgentRemoved",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `eventName` set to `"CountryModified"`
 */
export const watchIdentityRegistryStorageCountryModifiedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    eventName: "CountryModified",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `eventName` set to `"IdentityModified"`
 */
export const watchIdentityRegistryStorageIdentityModifiedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    eventName: "IdentityModified",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `eventName` set to `"IdentityRegistryBound"`
 */
export const watchIdentityRegistryStorageIdentityRegistryBoundEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    eventName: "IdentityRegistryBound",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `eventName` set to `"IdentityRegistryUnbound"`
 */
export const watchIdentityRegistryStorageIdentityRegistryUnboundEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    eventName: "IdentityRegistryUnbound",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `eventName` set to `"IdentityStored"`
 */
export const watchIdentityRegistryStorageIdentityStoredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    eventName: "IdentityStored",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `eventName` set to `"IdentityUnstored"`
 */
export const watchIdentityRegistryStorageIdentityUnstoredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    eventName: "IdentityUnstored",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `eventName` set to `"Initialized"`
 */
export const watchIdentityRegistryStorageInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    eventName: "Initialized",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link identityRegistryStorageAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchIdentityRegistryStorageOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: identityRegistryStorageAbi,
    address: identityRegistryStorageAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link implementationAuthorityAbi}__
 */
export const readImplementationAuthority = /*#__PURE__*/ createReadContract({
  abi: implementationAuthorityAbi,
  address: implementationAuthorityAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link implementationAuthorityAbi}__ and `functionName` set to `"getImplementation"`
 */
export const readImplementationAuthorityGetImplementation =
  /*#__PURE__*/ createReadContract({
    abi: implementationAuthorityAbi,
    address: implementationAuthorityAddress,
    functionName: "getImplementation",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link implementationAuthorityAbi}__ and `functionName` set to `"owner"`
 */
export const readImplementationAuthorityOwner =
  /*#__PURE__*/ createReadContract({
    abi: implementationAuthorityAbi,
    address: implementationAuthorityAddress,
    functionName: "owner",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link implementationAuthorityAbi}__
 */
export const writeImplementationAuthority = /*#__PURE__*/ createWriteContract({
  abi: implementationAuthorityAbi,
  address: implementationAuthorityAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link implementationAuthorityAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeImplementationAuthorityRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: implementationAuthorityAbi,
    address: implementationAuthorityAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link implementationAuthorityAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeImplementationAuthorityTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: implementationAuthorityAbi,
    address: implementationAuthorityAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link implementationAuthorityAbi}__ and `functionName` set to `"updateImplementation"`
 */
export const writeImplementationAuthorityUpdateImplementation =
  /*#__PURE__*/ createWriteContract({
    abi: implementationAuthorityAbi,
    address: implementationAuthorityAddress,
    functionName: "updateImplementation",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link implementationAuthorityAbi}__
 */
export const simulateImplementationAuthority =
  /*#__PURE__*/ createSimulateContract({
    abi: implementationAuthorityAbi,
    address: implementationAuthorityAddress,
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link implementationAuthorityAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateImplementationAuthorityRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: implementationAuthorityAbi,
    address: implementationAuthorityAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link implementationAuthorityAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateImplementationAuthorityTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: implementationAuthorityAbi,
    address: implementationAuthorityAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link implementationAuthorityAbi}__ and `functionName` set to `"updateImplementation"`
 */
export const simulateImplementationAuthorityUpdateImplementation =
  /*#__PURE__*/ createSimulateContract({
    abi: implementationAuthorityAbi,
    address: implementationAuthorityAddress,
    functionName: "updateImplementation",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link implementationAuthorityAbi}__
 */
export const watchImplementationAuthorityEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: implementationAuthorityAbi,
    address: implementationAuthorityAddress,
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link implementationAuthorityAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchImplementationAuthorityOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: implementationAuthorityAbi,
    address: implementationAuthorityAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link implementationAuthorityAbi}__ and `eventName` set to `"UpdatedImplementation"`
 */
export const watchImplementationAuthorityUpdatedImplementationEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: implementationAuthorityAbi,
    address: implementationAuthorityAddress,
    eventName: "UpdatedImplementation",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__
 */
export const readMaxOwnershipByCountryModule = /*#__PURE__*/ createReadContract(
  {
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
  },
);

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"canComplianceBind"`
 */
export const readMaxOwnershipByCountryModuleCanComplianceBind =
  /*#__PURE__*/ createReadContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "canComplianceBind",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"getIDBalance"`
 */
export const readMaxOwnershipByCountryModuleGetIdBalance =
  /*#__PURE__*/ createReadContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "getIDBalance",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"isComplianceBound"`
 */
export const readMaxOwnershipByCountryModuleIsComplianceBound =
  /*#__PURE__*/ createReadContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "isComplianceBound",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"isPlugAndPlay"`
 */
export const readMaxOwnershipByCountryModuleIsPlugAndPlay =
  /*#__PURE__*/ createReadContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "isPlugAndPlay",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"moduleCheck"`
 */
export const readMaxOwnershipByCountryModuleModuleCheck =
  /*#__PURE__*/ createReadContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "moduleCheck",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"name"`
 */
export const readMaxOwnershipByCountryModuleName =
  /*#__PURE__*/ createReadContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "name",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__
 */
export const writeMaxOwnershipByCountryModule =
  /*#__PURE__*/ createWriteContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"batchPreSetModuleState"`
 */
export const writeMaxOwnershipByCountryModuleBatchPreSetModuleState =
  /*#__PURE__*/ createWriteContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "batchPreSetModuleState",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"bindCompliance"`
 */
export const writeMaxOwnershipByCountryModuleBindCompliance =
  /*#__PURE__*/ createWriteContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "bindCompliance",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"moduleBurnAction"`
 */
export const writeMaxOwnershipByCountryModuleModuleBurnAction =
  /*#__PURE__*/ createWriteContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "moduleBurnAction",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"moduleMintAction"`
 */
export const writeMaxOwnershipByCountryModuleModuleMintAction =
  /*#__PURE__*/ createWriteContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "moduleMintAction",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"moduleTransferAction"`
 */
export const writeMaxOwnershipByCountryModuleModuleTransferAction =
  /*#__PURE__*/ createWriteContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "moduleTransferAction",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"preSetModuleState"`
 */
export const writeMaxOwnershipByCountryModulePreSetModuleState =
  /*#__PURE__*/ createWriteContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "preSetModuleState",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"presetCompleted"`
 */
export const writeMaxOwnershipByCountryModulePresetCompleted =
  /*#__PURE__*/ createWriteContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "presetCompleted",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"setMaxPercentage"`
 */
export const writeMaxOwnershipByCountryModuleSetMaxPercentage =
  /*#__PURE__*/ createWriteContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "setMaxPercentage",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"unbindCompliance"`
 */
export const writeMaxOwnershipByCountryModuleUnbindCompliance =
  /*#__PURE__*/ createWriteContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "unbindCompliance",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__
 */
export const simulateMaxOwnershipByCountryModule =
  /*#__PURE__*/ createSimulateContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"batchPreSetModuleState"`
 */
export const simulateMaxOwnershipByCountryModuleBatchPreSetModuleState =
  /*#__PURE__*/ createSimulateContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "batchPreSetModuleState",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"bindCompliance"`
 */
export const simulateMaxOwnershipByCountryModuleBindCompliance =
  /*#__PURE__*/ createSimulateContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "bindCompliance",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"moduleBurnAction"`
 */
export const simulateMaxOwnershipByCountryModuleModuleBurnAction =
  /*#__PURE__*/ createSimulateContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "moduleBurnAction",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"moduleMintAction"`
 */
export const simulateMaxOwnershipByCountryModuleModuleMintAction =
  /*#__PURE__*/ createSimulateContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "moduleMintAction",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"moduleTransferAction"`
 */
export const simulateMaxOwnershipByCountryModuleModuleTransferAction =
  /*#__PURE__*/ createSimulateContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "moduleTransferAction",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"preSetModuleState"`
 */
export const simulateMaxOwnershipByCountryModulePreSetModuleState =
  /*#__PURE__*/ createSimulateContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "preSetModuleState",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"presetCompleted"`
 */
export const simulateMaxOwnershipByCountryModulePresetCompleted =
  /*#__PURE__*/ createSimulateContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "presetCompleted",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"setMaxPercentage"`
 */
export const simulateMaxOwnershipByCountryModuleSetMaxPercentage =
  /*#__PURE__*/ createSimulateContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "setMaxPercentage",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `functionName` set to `"unbindCompliance"`
 */
export const simulateMaxOwnershipByCountryModuleUnbindCompliance =
  /*#__PURE__*/ createSimulateContract({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    functionName: "unbindCompliance",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__
 */
export const watchMaxOwnershipByCountryModuleEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `eventName` set to `"ComplianceBound"`
 */
export const watchMaxOwnershipByCountryModuleComplianceBoundEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    eventName: "ComplianceBound",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `eventName` set to `"ComplianceUnbound"`
 */
export const watchMaxOwnershipByCountryModuleComplianceUnboundEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    eventName: "ComplianceUnbound",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `eventName` set to `"IDBalancePreSet"`
 */
export const watchMaxOwnershipByCountryModuleIdBalancePreSetEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    eventName: "IDBalancePreSet",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link maxOwnershipByCountryModuleAbi}__ and `eventName` set to `"MaxPercentageSet"`
 */
export const watchMaxOwnershipByCountryModuleMaxPercentageSetEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: maxOwnershipByCountryModuleAbi,
    address: maxOwnershipByCountryModuleAddress,
    eventName: "MaxPercentageSet",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link modularComplianceAbi}__
 */
export const readModularCompliance = /*#__PURE__*/ createReadContract({
  abi: modularComplianceAbi,
  address: modularComplianceAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"canTransfer"`
 */
export const readModularComplianceCanTransfer =
  /*#__PURE__*/ createReadContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "canTransfer",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"getModules"`
 */
export const readModularComplianceGetModules = /*#__PURE__*/ createReadContract(
  {
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "getModules",
  },
);

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"getTokenBound"`
 */
export const readModularComplianceGetTokenBound =
  /*#__PURE__*/ createReadContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "getTokenBound",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"isModuleBound"`
 */
export const readModularComplianceIsModuleBound =
  /*#__PURE__*/ createReadContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "isModuleBound",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"owner"`
 */
export const readModularComplianceOwner = /*#__PURE__*/ createReadContract({
  abi: modularComplianceAbi,
  address: modularComplianceAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link modularComplianceAbi}__
 */
export const writeModularCompliance = /*#__PURE__*/ createWriteContract({
  abi: modularComplianceAbi,
  address: modularComplianceAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"addModule"`
 */
export const writeModularComplianceAddModule =
  /*#__PURE__*/ createWriteContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "addModule",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"bindToken"`
 */
export const writeModularComplianceBindToken =
  /*#__PURE__*/ createWriteContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "bindToken",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"callModuleFunction"`
 */
export const writeModularComplianceCallModuleFunction =
  /*#__PURE__*/ createWriteContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "callModuleFunction",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"created"`
 */
export const writeModularComplianceCreated = /*#__PURE__*/ createWriteContract({
  abi: modularComplianceAbi,
  address: modularComplianceAddress,
  functionName: "created",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"destroyed"`
 */
export const writeModularComplianceDestroyed =
  /*#__PURE__*/ createWriteContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "destroyed",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"init"`
 */
export const writeModularComplianceInit = /*#__PURE__*/ createWriteContract({
  abi: modularComplianceAbi,
  address: modularComplianceAddress,
  functionName: "init",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"removeModule"`
 */
export const writeModularComplianceRemoveModule =
  /*#__PURE__*/ createWriteContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "removeModule",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeModularComplianceRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeModularComplianceTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"transferred"`
 */
export const writeModularComplianceTransferred =
  /*#__PURE__*/ createWriteContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "transferred",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"unbindToken"`
 */
export const writeModularComplianceUnbindToken =
  /*#__PURE__*/ createWriteContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "unbindToken",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link modularComplianceAbi}__
 */
export const simulateModularCompliance = /*#__PURE__*/ createSimulateContract({
  abi: modularComplianceAbi,
  address: modularComplianceAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"addModule"`
 */
export const simulateModularComplianceAddModule =
  /*#__PURE__*/ createSimulateContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "addModule",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"bindToken"`
 */
export const simulateModularComplianceBindToken =
  /*#__PURE__*/ createSimulateContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "bindToken",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"callModuleFunction"`
 */
export const simulateModularComplianceCallModuleFunction =
  /*#__PURE__*/ createSimulateContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "callModuleFunction",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"created"`
 */
export const simulateModularComplianceCreated =
  /*#__PURE__*/ createSimulateContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "created",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"destroyed"`
 */
export const simulateModularComplianceDestroyed =
  /*#__PURE__*/ createSimulateContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "destroyed",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"init"`
 */
export const simulateModularComplianceInit =
  /*#__PURE__*/ createSimulateContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "init",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"removeModule"`
 */
export const simulateModularComplianceRemoveModule =
  /*#__PURE__*/ createSimulateContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "removeModule",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateModularComplianceRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateModularComplianceTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"transferred"`
 */
export const simulateModularComplianceTransferred =
  /*#__PURE__*/ createSimulateContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "transferred",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link modularComplianceAbi}__ and `functionName` set to `"unbindToken"`
 */
export const simulateModularComplianceUnbindToken =
  /*#__PURE__*/ createSimulateContract({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    functionName: "unbindToken",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link modularComplianceAbi}__
 */
export const watchModularComplianceEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link modularComplianceAbi}__ and `eventName` set to `"Initialized"`
 */
export const watchModularComplianceInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    eventName: "Initialized",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link modularComplianceAbi}__ and `eventName` set to `"ModuleAdded"`
 */
export const watchModularComplianceModuleAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    eventName: "ModuleAdded",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link modularComplianceAbi}__ and `eventName` set to `"ModuleInteraction"`
 */
export const watchModularComplianceModuleInteractionEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    eventName: "ModuleInteraction",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link modularComplianceAbi}__ and `eventName` set to `"ModuleRemoved"`
 */
export const watchModularComplianceModuleRemovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    eventName: "ModuleRemoved",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link modularComplianceAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchModularComplianceOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link modularComplianceAbi}__ and `eventName` set to `"TokenBound"`
 */
export const watchModularComplianceTokenBoundEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    eventName: "TokenBound",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link modularComplianceAbi}__ and `eventName` set to `"TokenUnbound"`
 */
export const watchModularComplianceTokenUnboundEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: modularComplianceAbi,
    address: modularComplianceAddress,
    eventName: "TokenUnbound",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link requiresNftModuleAbi}__
 */
export const readRequiresNftModule = /*#__PURE__*/ createReadContract({
  abi: requiresNftModuleAbi,
  address: requiresNftModuleAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `functionName` set to `"canComplianceBind"`
 */
export const readRequiresNftModuleCanComplianceBind =
  /*#__PURE__*/ createReadContract({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    functionName: "canComplianceBind",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `functionName` set to `"isComplianceBound"`
 */
export const readRequiresNftModuleIsComplianceBound =
  /*#__PURE__*/ createReadContract({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    functionName: "isComplianceBound",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `functionName` set to `"isPlugAndPlay"`
 */
export const readRequiresNftModuleIsPlugAndPlay =
  /*#__PURE__*/ createReadContract({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    functionName: "isPlugAndPlay",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `functionName` set to `"moduleCheck"`
 */
export const readRequiresNftModuleModuleCheck =
  /*#__PURE__*/ createReadContract({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    functionName: "moduleCheck",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `functionName` set to `"name"`
 */
export const readRequiresNftModuleName = /*#__PURE__*/ createReadContract({
  abi: requiresNftModuleAbi,
  address: requiresNftModuleAddress,
  functionName: "name",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link requiresNftModuleAbi}__
 */
export const writeRequiresNftModule = /*#__PURE__*/ createWriteContract({
  abi: requiresNftModuleAbi,
  address: requiresNftModuleAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `functionName` set to `"bindCompliance"`
 */
export const writeRequiresNftModuleBindCompliance =
  /*#__PURE__*/ createWriteContract({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    functionName: "bindCompliance",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `functionName` set to `"moduleBurnAction"`
 */
export const writeRequiresNftModuleModuleBurnAction =
  /*#__PURE__*/ createWriteContract({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    functionName: "moduleBurnAction",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `functionName` set to `"moduleMintAction"`
 */
export const writeRequiresNftModuleModuleMintAction =
  /*#__PURE__*/ createWriteContract({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    functionName: "moduleMintAction",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `functionName` set to `"moduleTransferAction"`
 */
export const writeRequiresNftModuleModuleTransferAction =
  /*#__PURE__*/ createWriteContract({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    functionName: "moduleTransferAction",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `functionName` set to `"requireNFT"`
 */
export const writeRequiresNftModuleRequireNft =
  /*#__PURE__*/ createWriteContract({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    functionName: "requireNFT",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `functionName` set to `"unbindCompliance"`
 */
export const writeRequiresNftModuleUnbindCompliance =
  /*#__PURE__*/ createWriteContract({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    functionName: "unbindCompliance",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `functionName` set to `"unrequireNFT"`
 */
export const writeRequiresNftModuleUnrequireNft =
  /*#__PURE__*/ createWriteContract({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    functionName: "unrequireNFT",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link requiresNftModuleAbi}__
 */
export const simulateRequiresNftModule = /*#__PURE__*/ createSimulateContract({
  abi: requiresNftModuleAbi,
  address: requiresNftModuleAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `functionName` set to `"bindCompliance"`
 */
export const simulateRequiresNftModuleBindCompliance =
  /*#__PURE__*/ createSimulateContract({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    functionName: "bindCompliance",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `functionName` set to `"moduleBurnAction"`
 */
export const simulateRequiresNftModuleModuleBurnAction =
  /*#__PURE__*/ createSimulateContract({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    functionName: "moduleBurnAction",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `functionName` set to `"moduleMintAction"`
 */
export const simulateRequiresNftModuleModuleMintAction =
  /*#__PURE__*/ createSimulateContract({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    functionName: "moduleMintAction",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `functionName` set to `"moduleTransferAction"`
 */
export const simulateRequiresNftModuleModuleTransferAction =
  /*#__PURE__*/ createSimulateContract({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    functionName: "moduleTransferAction",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `functionName` set to `"requireNFT"`
 */
export const simulateRequiresNftModuleRequireNft =
  /*#__PURE__*/ createSimulateContract({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    functionName: "requireNFT",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `functionName` set to `"unbindCompliance"`
 */
export const simulateRequiresNftModuleUnbindCompliance =
  /*#__PURE__*/ createSimulateContract({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    functionName: "unbindCompliance",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `functionName` set to `"unrequireNFT"`
 */
export const simulateRequiresNftModuleUnrequireNft =
  /*#__PURE__*/ createSimulateContract({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    functionName: "unrequireNFT",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link requiresNftModuleAbi}__
 */
export const watchRequiresNftModuleEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `eventName` set to `"ComplianceBound"`
 */
export const watchRequiresNftModuleComplianceBoundEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    eventName: "ComplianceBound",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `eventName` set to `"ComplianceUnbound"`
 */
export const watchRequiresNftModuleComplianceUnboundEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    eventName: "ComplianceUnbound",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `eventName` set to `"NFTRequired"`
 */
export const watchRequiresNftModuleNftRequiredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    eventName: "NFTRequired",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link requiresNftModuleAbi}__ and `eventName` set to `"NFTUnrequired"`
 */
export const watchRequiresNftModuleNftUnrequiredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: requiresNftModuleAbi,
    address: requiresNftModuleAddress,
    eventName: "NFTUnrequired",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexFactoryAbi}__
 */
export const readTrexFactory = /*#__PURE__*/ createReadContract({
  abi: trexFactoryAbi,
  address: trexFactoryAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexFactoryAbi}__ and `functionName` set to `"getIdFactory"`
 */
export const readTrexFactoryGetIdFactory = /*#__PURE__*/ createReadContract({
  abi: trexFactoryAbi,
  address: trexFactoryAddress,
  functionName: "getIdFactory",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexFactoryAbi}__ and `functionName` set to `"getImplementationAuthority"`
 */
export const readTrexFactoryGetImplementationAuthority =
  /*#__PURE__*/ createReadContract({
    abi: trexFactoryAbi,
    address: trexFactoryAddress,
    functionName: "getImplementationAuthority",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexFactoryAbi}__ and `functionName` set to `"getToken"`
 */
export const readTrexFactoryGetToken = /*#__PURE__*/ createReadContract({
  abi: trexFactoryAbi,
  address: trexFactoryAddress,
  functionName: "getToken",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexFactoryAbi}__ and `functionName` set to `"owner"`
 */
export const readTrexFactoryOwner = /*#__PURE__*/ createReadContract({
  abi: trexFactoryAbi,
  address: trexFactoryAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexFactoryAbi}__ and `functionName` set to `"tokenDeployed"`
 */
export const readTrexFactoryTokenDeployed = /*#__PURE__*/ createReadContract({
  abi: trexFactoryAbi,
  address: trexFactoryAddress,
  functionName: "tokenDeployed",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexFactoryAbi}__
 */
export const writeTrexFactory = /*#__PURE__*/ createWriteContract({
  abi: trexFactoryAbi,
  address: trexFactoryAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexFactoryAbi}__ and `functionName` set to `"deployTREXSuite"`
 */
export const writeTrexFactoryDeployTrexSuite =
  /*#__PURE__*/ createWriteContract({
    abi: trexFactoryAbi,
    address: trexFactoryAddress,
    functionName: "deployTREXSuite",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexFactoryAbi}__ and `functionName` set to `"recoverContractOwnership"`
 */
export const writeTrexFactoryRecoverContractOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: trexFactoryAbi,
    address: trexFactoryAddress,
    functionName: "recoverContractOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeTrexFactoryRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: trexFactoryAbi,
    address: trexFactoryAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexFactoryAbi}__ and `functionName` set to `"setIdFactory"`
 */
export const writeTrexFactorySetIdFactory = /*#__PURE__*/ createWriteContract({
  abi: trexFactoryAbi,
  address: trexFactoryAddress,
  functionName: "setIdFactory",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexFactoryAbi}__ and `functionName` set to `"setImplementationAuthority"`
 */
export const writeTrexFactorySetImplementationAuthority =
  /*#__PURE__*/ createWriteContract({
    abi: trexFactoryAbi,
    address: trexFactoryAddress,
    functionName: "setImplementationAuthority",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeTrexFactoryTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: trexFactoryAbi,
    address: trexFactoryAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexFactoryAbi}__
 */
export const simulateTrexFactory = /*#__PURE__*/ createSimulateContract({
  abi: trexFactoryAbi,
  address: trexFactoryAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexFactoryAbi}__ and `functionName` set to `"deployTREXSuite"`
 */
export const simulateTrexFactoryDeployTrexSuite =
  /*#__PURE__*/ createSimulateContract({
    abi: trexFactoryAbi,
    address: trexFactoryAddress,
    functionName: "deployTREXSuite",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexFactoryAbi}__ and `functionName` set to `"recoverContractOwnership"`
 */
export const simulateTrexFactoryRecoverContractOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: trexFactoryAbi,
    address: trexFactoryAddress,
    functionName: "recoverContractOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateTrexFactoryRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: trexFactoryAbi,
    address: trexFactoryAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexFactoryAbi}__ and `functionName` set to `"setIdFactory"`
 */
export const simulateTrexFactorySetIdFactory =
  /*#__PURE__*/ createSimulateContract({
    abi: trexFactoryAbi,
    address: trexFactoryAddress,
    functionName: "setIdFactory",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexFactoryAbi}__ and `functionName` set to `"setImplementationAuthority"`
 */
export const simulateTrexFactorySetImplementationAuthority =
  /*#__PURE__*/ createSimulateContract({
    abi: trexFactoryAbi,
    address: trexFactoryAddress,
    functionName: "setImplementationAuthority",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateTrexFactoryTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: trexFactoryAbi,
    address: trexFactoryAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexFactoryAbi}__
 */
export const watchTrexFactoryEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trexFactoryAbi,
  address: trexFactoryAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexFactoryAbi}__ and `eventName` set to `"Deployed"`
 */
export const watchTrexFactoryDeployedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexFactoryAbi,
    address: trexFactoryAddress,
    eventName: "Deployed",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexFactoryAbi}__ and `eventName` set to `"IdFactorySet"`
 */
export const watchTrexFactoryIdFactorySetEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexFactoryAbi,
    address: trexFactoryAddress,
    eventName: "IdFactorySet",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexFactoryAbi}__ and `eventName` set to `"ImplementationAuthoritySet"`
 */
export const watchTrexFactoryImplementationAuthoritySetEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexFactoryAbi,
    address: trexFactoryAddress,
    eventName: "ImplementationAuthoritySet",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexFactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchTrexFactoryOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexFactoryAbi,
    address: trexFactoryAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexFactoryAbi}__ and `eventName` set to `"TREXSuiteDeployed"`
 */
export const watchTrexFactoryTrexSuiteDeployedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexFactoryAbi,
    address: trexFactoryAddress,
    eventName: "TREXSuiteDeployed",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexGatewayAbi}__
 */
export const readTrexGateway = /*#__PURE__*/ createReadContract({
  abi: trexGatewayAbi,
  address: trexGatewayAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"calculateFee"`
 */
export const readTrexGatewayCalculateFee = /*#__PURE__*/ createReadContract({
  abi: trexGatewayAbi,
  address: trexGatewayAddress,
  functionName: "calculateFee",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"getDeploymentFee"`
 */
export const readTrexGatewayGetDeploymentFee = /*#__PURE__*/ createReadContract(
  {
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "getDeploymentFee",
  },
);

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"getFactory"`
 */
export const readTrexGatewayGetFactory = /*#__PURE__*/ createReadContract({
  abi: trexGatewayAbi,
  address: trexGatewayAddress,
  functionName: "getFactory",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"getPublicDeploymentStatus"`
 */
export const readTrexGatewayGetPublicDeploymentStatus =
  /*#__PURE__*/ createReadContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "getPublicDeploymentStatus",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"isAgent"`
 */
export const readTrexGatewayIsAgent = /*#__PURE__*/ createReadContract({
  abi: trexGatewayAbi,
  address: trexGatewayAddress,
  functionName: "isAgent",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"isDeployer"`
 */
export const readTrexGatewayIsDeployer = /*#__PURE__*/ createReadContract({
  abi: trexGatewayAbi,
  address: trexGatewayAddress,
  functionName: "isDeployer",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"isDeploymentFeeEnabled"`
 */
export const readTrexGatewayIsDeploymentFeeEnabled =
  /*#__PURE__*/ createReadContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "isDeploymentFeeEnabled",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"owner"`
 */
export const readTrexGatewayOwner = /*#__PURE__*/ createReadContract({
  abi: trexGatewayAbi,
  address: trexGatewayAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexGatewayAbi}__
 */
export const writeTrexGateway = /*#__PURE__*/ createWriteContract({
  abi: trexGatewayAbi,
  address: trexGatewayAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"addAgent"`
 */
export const writeTrexGatewayAddAgent = /*#__PURE__*/ createWriteContract({
  abi: trexGatewayAbi,
  address: trexGatewayAddress,
  functionName: "addAgent",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"addDeployer"`
 */
export const writeTrexGatewayAddDeployer = /*#__PURE__*/ createWriteContract({
  abi: trexGatewayAbi,
  address: trexGatewayAddress,
  functionName: "addDeployer",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"applyFeeDiscount"`
 */
export const writeTrexGatewayApplyFeeDiscount =
  /*#__PURE__*/ createWriteContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "applyFeeDiscount",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"batchAddDeployer"`
 */
export const writeTrexGatewayBatchAddDeployer =
  /*#__PURE__*/ createWriteContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "batchAddDeployer",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"batchApplyFeeDiscount"`
 */
export const writeTrexGatewayBatchApplyFeeDiscount =
  /*#__PURE__*/ createWriteContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "batchApplyFeeDiscount",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"batchDeployTREXSuite"`
 */
export const writeTrexGatewayBatchDeployTrexSuite =
  /*#__PURE__*/ createWriteContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "batchDeployTREXSuite",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"batchRemoveDeployer"`
 */
export const writeTrexGatewayBatchRemoveDeployer =
  /*#__PURE__*/ createWriteContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "batchRemoveDeployer",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"deployTREXSuite"`
 */
export const writeTrexGatewayDeployTrexSuite =
  /*#__PURE__*/ createWriteContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "deployTREXSuite",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"enableDeploymentFee"`
 */
export const writeTrexGatewayEnableDeploymentFee =
  /*#__PURE__*/ createWriteContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "enableDeploymentFee",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"removeAgent"`
 */
export const writeTrexGatewayRemoveAgent = /*#__PURE__*/ createWriteContract({
  abi: trexGatewayAbi,
  address: trexGatewayAddress,
  functionName: "removeAgent",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"removeDeployer"`
 */
export const writeTrexGatewayRemoveDeployer = /*#__PURE__*/ createWriteContract(
  {
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "removeDeployer",
  },
);

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeTrexGatewayRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"setDeploymentFee"`
 */
export const writeTrexGatewaySetDeploymentFee =
  /*#__PURE__*/ createWriteContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "setDeploymentFee",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"setFactory"`
 */
export const writeTrexGatewaySetFactory = /*#__PURE__*/ createWriteContract({
  abi: trexGatewayAbi,
  address: trexGatewayAddress,
  functionName: "setFactory",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"setPublicDeploymentStatus"`
 */
export const writeTrexGatewaySetPublicDeploymentStatus =
  /*#__PURE__*/ createWriteContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "setPublicDeploymentStatus",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"transferFactoryOwnership"`
 */
export const writeTrexGatewayTransferFactoryOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "transferFactoryOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeTrexGatewayTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexGatewayAbi}__
 */
export const simulateTrexGateway = /*#__PURE__*/ createSimulateContract({
  abi: trexGatewayAbi,
  address: trexGatewayAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"addAgent"`
 */
export const simulateTrexGatewayAddAgent = /*#__PURE__*/ createSimulateContract(
  {
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "addAgent",
  },
);

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"addDeployer"`
 */
export const simulateTrexGatewayAddDeployer =
  /*#__PURE__*/ createSimulateContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "addDeployer",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"applyFeeDiscount"`
 */
export const simulateTrexGatewayApplyFeeDiscount =
  /*#__PURE__*/ createSimulateContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "applyFeeDiscount",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"batchAddDeployer"`
 */
export const simulateTrexGatewayBatchAddDeployer =
  /*#__PURE__*/ createSimulateContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "batchAddDeployer",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"batchApplyFeeDiscount"`
 */
export const simulateTrexGatewayBatchApplyFeeDiscount =
  /*#__PURE__*/ createSimulateContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "batchApplyFeeDiscount",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"batchDeployTREXSuite"`
 */
export const simulateTrexGatewayBatchDeployTrexSuite =
  /*#__PURE__*/ createSimulateContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "batchDeployTREXSuite",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"batchRemoveDeployer"`
 */
export const simulateTrexGatewayBatchRemoveDeployer =
  /*#__PURE__*/ createSimulateContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "batchRemoveDeployer",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"deployTREXSuite"`
 */
export const simulateTrexGatewayDeployTrexSuite =
  /*#__PURE__*/ createSimulateContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "deployTREXSuite",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"enableDeploymentFee"`
 */
export const simulateTrexGatewayEnableDeploymentFee =
  /*#__PURE__*/ createSimulateContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "enableDeploymentFee",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"removeAgent"`
 */
export const simulateTrexGatewayRemoveAgent =
  /*#__PURE__*/ createSimulateContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "removeAgent",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"removeDeployer"`
 */
export const simulateTrexGatewayRemoveDeployer =
  /*#__PURE__*/ createSimulateContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "removeDeployer",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateTrexGatewayRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"setDeploymentFee"`
 */
export const simulateTrexGatewaySetDeploymentFee =
  /*#__PURE__*/ createSimulateContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "setDeploymentFee",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"setFactory"`
 */
export const simulateTrexGatewaySetFactory =
  /*#__PURE__*/ createSimulateContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "setFactory",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"setPublicDeploymentStatus"`
 */
export const simulateTrexGatewaySetPublicDeploymentStatus =
  /*#__PURE__*/ createSimulateContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "setPublicDeploymentStatus",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"transferFactoryOwnership"`
 */
export const simulateTrexGatewayTransferFactoryOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "transferFactoryOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexGatewayAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateTrexGatewayTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexGatewayAbi}__
 */
export const watchTrexGatewayEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: trexGatewayAbi,
  address: trexGatewayAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexGatewayAbi}__ and `eventName` set to `"AgentAdded"`
 */
export const watchTrexGatewayAgentAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    eventName: "AgentAdded",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexGatewayAbi}__ and `eventName` set to `"AgentRemoved"`
 */
export const watchTrexGatewayAgentRemovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    eventName: "AgentRemoved",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexGatewayAbi}__ and `eventName` set to `"DeployerAdded"`
 */
export const watchTrexGatewayDeployerAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    eventName: "DeployerAdded",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexGatewayAbi}__ and `eventName` set to `"DeployerRemoved"`
 */
export const watchTrexGatewayDeployerRemovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    eventName: "DeployerRemoved",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexGatewayAbi}__ and `eventName` set to `"DeploymentFeeEnabled"`
 */
export const watchTrexGatewayDeploymentFeeEnabledEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    eventName: "DeploymentFeeEnabled",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexGatewayAbi}__ and `eventName` set to `"DeploymentFeeSet"`
 */
export const watchTrexGatewayDeploymentFeeSetEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    eventName: "DeploymentFeeSet",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexGatewayAbi}__ and `eventName` set to `"FactorySet"`
 */
export const watchTrexGatewayFactorySetEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    eventName: "FactorySet",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexGatewayAbi}__ and `eventName` set to `"FeeDiscountApplied"`
 */
export const watchTrexGatewayFeeDiscountAppliedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    eventName: "FeeDiscountApplied",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexGatewayAbi}__ and `eventName` set to `"GatewaySuiteDeploymentProcessed"`
 */
export const watchTrexGatewayGatewaySuiteDeploymentProcessedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    eventName: "GatewaySuiteDeploymentProcessed",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexGatewayAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchTrexGatewayOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexGatewayAbi}__ and `eventName` set to `"PublicDeploymentStatusSet"`
 */
export const watchTrexGatewayPublicDeploymentStatusSetEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexGatewayAbi,
    address: trexGatewayAddress,
    eventName: "PublicDeploymentStatusSet",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__
 */
export const readTrexImplementationAuthority = /*#__PURE__*/ createReadContract(
  {
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
  },
);

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"getCTRImplementation"`
 */
export const readTrexImplementationAuthorityGetCtrImplementation =
  /*#__PURE__*/ createReadContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "getCTRImplementation",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"getContracts"`
 */
export const readTrexImplementationAuthorityGetContracts =
  /*#__PURE__*/ createReadContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "getContracts",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"getCurrentVersion"`
 */
export const readTrexImplementationAuthorityGetCurrentVersion =
  /*#__PURE__*/ createReadContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "getCurrentVersion",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"getIRImplementation"`
 */
export const readTrexImplementationAuthorityGetIrImplementation =
  /*#__PURE__*/ createReadContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "getIRImplementation",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"getIRSImplementation"`
 */
export const readTrexImplementationAuthorityGetIrsImplementation =
  /*#__PURE__*/ createReadContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "getIRSImplementation",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"getMCImplementation"`
 */
export const readTrexImplementationAuthorityGetMcImplementation =
  /*#__PURE__*/ createReadContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "getMCImplementation",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"getReferenceContract"`
 */
export const readTrexImplementationAuthorityGetReferenceContract =
  /*#__PURE__*/ createReadContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "getReferenceContract",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"getTIRImplementation"`
 */
export const readTrexImplementationAuthorityGetTirImplementation =
  /*#__PURE__*/ createReadContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "getTIRImplementation",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"getTREXFactory"`
 */
export const readTrexImplementationAuthorityGetTrexFactory =
  /*#__PURE__*/ createReadContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "getTREXFactory",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"getTokenImplementation"`
 */
export const readTrexImplementationAuthorityGetTokenImplementation =
  /*#__PURE__*/ createReadContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "getTokenImplementation",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"isReferenceContract"`
 */
export const readTrexImplementationAuthorityIsReferenceContract =
  /*#__PURE__*/ createReadContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "isReferenceContract",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"owner"`
 */
export const readTrexImplementationAuthorityOwner =
  /*#__PURE__*/ createReadContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "owner",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__
 */
export const writeTrexImplementationAuthority =
  /*#__PURE__*/ createWriteContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"addAndUseTREXVersion"`
 */
export const writeTrexImplementationAuthorityAddAndUseTrexVersion =
  /*#__PURE__*/ createWriteContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "addAndUseTREXVersion",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"addTREXVersion"`
 */
export const writeTrexImplementationAuthorityAddTrexVersion =
  /*#__PURE__*/ createWriteContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "addTREXVersion",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"changeImplementationAuthority"`
 */
export const writeTrexImplementationAuthorityChangeImplementationAuthority =
  /*#__PURE__*/ createWriteContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "changeImplementationAuthority",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"fetchVersion"`
 */
export const writeTrexImplementationAuthorityFetchVersion =
  /*#__PURE__*/ createWriteContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "fetchVersion",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeTrexImplementationAuthorityRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"setIAFactory"`
 */
export const writeTrexImplementationAuthoritySetIaFactory =
  /*#__PURE__*/ createWriteContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "setIAFactory",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"setTREXFactory"`
 */
export const writeTrexImplementationAuthoritySetTrexFactory =
  /*#__PURE__*/ createWriteContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "setTREXFactory",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeTrexImplementationAuthorityTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"useTREXVersion"`
 */
export const writeTrexImplementationAuthorityUseTrexVersion =
  /*#__PURE__*/ createWriteContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "useTREXVersion",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__
 */
export const simulateTrexImplementationAuthority =
  /*#__PURE__*/ createSimulateContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"addAndUseTREXVersion"`
 */
export const simulateTrexImplementationAuthorityAddAndUseTrexVersion =
  /*#__PURE__*/ createSimulateContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "addAndUseTREXVersion",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"addTREXVersion"`
 */
export const simulateTrexImplementationAuthorityAddTrexVersion =
  /*#__PURE__*/ createSimulateContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "addTREXVersion",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"changeImplementationAuthority"`
 */
export const simulateTrexImplementationAuthorityChangeImplementationAuthority =
  /*#__PURE__*/ createSimulateContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "changeImplementationAuthority",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"fetchVersion"`
 */
export const simulateTrexImplementationAuthorityFetchVersion =
  /*#__PURE__*/ createSimulateContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "fetchVersion",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateTrexImplementationAuthorityRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"setIAFactory"`
 */
export const simulateTrexImplementationAuthoritySetIaFactory =
  /*#__PURE__*/ createSimulateContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "setIAFactory",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"setTREXFactory"`
 */
export const simulateTrexImplementationAuthoritySetTrexFactory =
  /*#__PURE__*/ createSimulateContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "setTREXFactory",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateTrexImplementationAuthorityTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `functionName` set to `"useTREXVersion"`
 */
export const simulateTrexImplementationAuthorityUseTrexVersion =
  /*#__PURE__*/ createSimulateContract({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    functionName: "useTREXVersion",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__
 */
export const watchTrexImplementationAuthorityEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `eventName` set to `"IAFactorySet"`
 */
export const watchTrexImplementationAuthorityIaFactorySetEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    eventName: "IAFactorySet",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `eventName` set to `"ImplementationAuthorityChanged"`
 */
export const watchTrexImplementationAuthorityImplementationAuthorityChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    eventName: "ImplementationAuthorityChanged",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `eventName` set to `"ImplementationAuthoritySet"`
 */
export const watchTrexImplementationAuthorityImplementationAuthoritySetEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    eventName: "ImplementationAuthoritySet",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchTrexImplementationAuthorityOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `eventName` set to `"TREXFactorySet"`
 */
export const watchTrexImplementationAuthorityTrexFactorySetEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    eventName: "TREXFactorySet",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `eventName` set to `"TREXVersionAdded"`
 */
export const watchTrexImplementationAuthorityTrexVersionAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    eventName: "TREXVersionAdded",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `eventName` set to `"TREXVersionFetched"`
 */
export const watchTrexImplementationAuthorityTrexVersionFetchedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    eventName: "TREXVersionFetched",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trexImplementationAuthorityAbi}__ and `eventName` set to `"VersionUpdated"`
 */
export const watchTrexImplementationAuthorityVersionUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trexImplementationAuthorityAbi,
    address: trexImplementationAuthorityAddress,
    eventName: "VersionUpdated",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__
 */
export const readToken = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"allowance"`
 */
export const readTokenAllowance = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "allowance",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readTokenBalanceOf = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"compliance"`
 */
export const readTokenCompliance = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "compliance",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"decimals"`
 */
export const readTokenDecimals = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "decimals",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"getFrozenTokens"`
 */
export const readTokenGetFrozenTokens = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "getFrozenTokens",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"identityRegistry"`
 */
export const readTokenIdentityRegistry = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "identityRegistry",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"isAgent"`
 */
export const readTokenIsAgent = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "isAgent",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"isFrozen"`
 */
export const readTokenIsFrozen = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "isFrozen",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"name"`
 */
export const readTokenName = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "name",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"onchainID"`
 */
export const readTokenOnchainId = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "onchainID",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"owner"`
 */
export const readTokenOwner = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"paused"`
 */
export const readTokenPaused = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "paused",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"symbol"`
 */
export const readTokenSymbol = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "symbol",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const readTokenTotalSupply = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "totalSupply",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"version"`
 */
export const readTokenVersion = /*#__PURE__*/ createReadContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "version",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__
 */
export const writeToken = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"addAgent"`
 */
export const writeTokenAddAgent = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "addAgent",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"approve"`
 */
export const writeTokenApprove = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "approve",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"batchBurn"`
 */
export const writeTokenBatchBurn = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "batchBurn",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"batchForcedTransfer"`
 */
export const writeTokenBatchForcedTransfer = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "batchForcedTransfer",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"batchFreezePartialTokens"`
 */
export const writeTokenBatchFreezePartialTokens =
  /*#__PURE__*/ createWriteContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "batchFreezePartialTokens",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"batchMint"`
 */
export const writeTokenBatchMint = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "batchMint",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"batchSetAddressFrozen"`
 */
export const writeTokenBatchSetAddressFrozen =
  /*#__PURE__*/ createWriteContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "batchSetAddressFrozen",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"batchTransfer"`
 */
export const writeTokenBatchTransfer = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "batchTransfer",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"batchUnfreezePartialTokens"`
 */
export const writeTokenBatchUnfreezePartialTokens =
  /*#__PURE__*/ createWriteContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "batchUnfreezePartialTokens",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"burn"`
 */
export const writeTokenBurn = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "burn",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const writeTokenDecreaseAllowance = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "decreaseAllowance",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"forcedTransfer"`
 */
export const writeTokenForcedTransfer = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "forcedTransfer",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"freezePartialTokens"`
 */
export const writeTokenFreezePartialTokens = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "freezePartialTokens",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const writeTokenIncreaseAllowance = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "increaseAllowance",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"init"`
 */
export const writeTokenInit = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "init",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"mint"`
 */
export const writeTokenMint = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "mint",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"pause"`
 */
export const writeTokenPause = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "pause",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"recoveryAddress"`
 */
export const writeTokenRecoveryAddress = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "recoveryAddress",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"removeAgent"`
 */
export const writeTokenRemoveAgent = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "removeAgent",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeTokenRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "renounceOwnership",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"setAddressFrozen"`
 */
export const writeTokenSetAddressFrozen = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "setAddressFrozen",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"setCompliance"`
 */
export const writeTokenSetCompliance = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "setCompliance",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"setIdentityRegistry"`
 */
export const writeTokenSetIdentityRegistry = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "setIdentityRegistry",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"setName"`
 */
export const writeTokenSetName = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "setName",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"setOnchainID"`
 */
export const writeTokenSetOnchainId = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "setOnchainID",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"setSymbol"`
 */
export const writeTokenSetSymbol = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "setSymbol",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transfer"`
 */
export const writeTokenTransfer = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "transfer",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeTokenTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "transferFrom",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeTokenTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "transferOwnership",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"unfreezePartialTokens"`
 */
export const writeTokenUnfreezePartialTokens =
  /*#__PURE__*/ createWriteContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "unfreezePartialTokens",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"unpause"`
 */
export const writeTokenUnpause = /*#__PURE__*/ createWriteContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "unpause",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__
 */
export const simulateToken = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"addAgent"`
 */
export const simulateTokenAddAgent = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "addAgent",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"approve"`
 */
export const simulateTokenApprove = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "approve",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"batchBurn"`
 */
export const simulateTokenBatchBurn = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "batchBurn",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"batchForcedTransfer"`
 */
export const simulateTokenBatchForcedTransfer =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "batchForcedTransfer",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"batchFreezePartialTokens"`
 */
export const simulateTokenBatchFreezePartialTokens =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "batchFreezePartialTokens",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"batchMint"`
 */
export const simulateTokenBatchMint = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "batchMint",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"batchSetAddressFrozen"`
 */
export const simulateTokenBatchSetAddressFrozen =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "batchSetAddressFrozen",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"batchTransfer"`
 */
export const simulateTokenBatchTransfer = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "batchTransfer",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"batchUnfreezePartialTokens"`
 */
export const simulateTokenBatchUnfreezePartialTokens =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "batchUnfreezePartialTokens",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"burn"`
 */
export const simulateTokenBurn = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "burn",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const simulateTokenDecreaseAllowance =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "decreaseAllowance",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"forcedTransfer"`
 */
export const simulateTokenForcedTransfer = /*#__PURE__*/ createSimulateContract(
  { abi: tokenAbi, address: tokenAddress, functionName: "forcedTransfer" },
);

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"freezePartialTokens"`
 */
export const simulateTokenFreezePartialTokens =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "freezePartialTokens",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const simulateTokenIncreaseAllowance =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "increaseAllowance",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"init"`
 */
export const simulateTokenInit = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "init",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"mint"`
 */
export const simulateTokenMint = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "mint",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"pause"`
 */
export const simulateTokenPause = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "pause",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"recoveryAddress"`
 */
export const simulateTokenRecoveryAddress =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "recoveryAddress",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"removeAgent"`
 */
export const simulateTokenRemoveAgent = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "removeAgent",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateTokenRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"setAddressFrozen"`
 */
export const simulateTokenSetAddressFrozen =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "setAddressFrozen",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"setCompliance"`
 */
export const simulateTokenSetCompliance = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "setCompliance",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"setIdentityRegistry"`
 */
export const simulateTokenSetIdentityRegistry =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "setIdentityRegistry",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"setName"`
 */
export const simulateTokenSetName = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "setName",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"setOnchainID"`
 */
export const simulateTokenSetOnchainId = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "setOnchainID",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"setSymbol"`
 */
export const simulateTokenSetSymbol = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "setSymbol",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transfer"`
 */
export const simulateTokenTransfer = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "transfer",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateTokenTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "transferFrom",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateTokenTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"unfreezePartialTokens"`
 */
export const simulateTokenUnfreezePartialTokens =
  /*#__PURE__*/ createSimulateContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: "unfreezePartialTokens",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link tokenAbi}__ and `functionName` set to `"unpause"`
 */
export const simulateTokenUnpause = /*#__PURE__*/ createSimulateContract({
  abi: tokenAbi,
  address: tokenAddress,
  functionName: "unpause",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__
 */
export const watchTokenEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: tokenAbi,
  address: tokenAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"AddressFrozen"`
 */
export const watchTokenAddressFrozenEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenAbi,
    address: tokenAddress,
    eventName: "AddressFrozen",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"AgentAdded"`
 */
export const watchTokenAgentAddedEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: tokenAbi, address: tokenAddress, eventName: "AgentAdded" },
);

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"AgentRemoved"`
 */
export const watchTokenAgentRemovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenAbi,
    address: tokenAddress,
    eventName: "AgentRemoved",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"Approval"`
 */
export const watchTokenApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: tokenAbi,
  address: tokenAddress,
  eventName: "Approval",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"ComplianceAdded"`
 */
export const watchTokenComplianceAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenAbi,
    address: tokenAddress,
    eventName: "ComplianceAdded",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"IdentityRegistryAdded"`
 */
export const watchTokenIdentityRegistryAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenAbi,
    address: tokenAddress,
    eventName: "IdentityRegistryAdded",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"Initialized"`
 */
export const watchTokenInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenAbi,
    address: tokenAddress,
    eventName: "Initialized",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchTokenOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenAbi,
    address: tokenAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"Paused"`
 */
export const watchTokenPausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: tokenAbi,
  address: tokenAddress,
  eventName: "Paused",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"RecoverySuccess"`
 */
export const watchTokenRecoverySuccessEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenAbi,
    address: tokenAddress,
    eventName: "RecoverySuccess",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"TokensFrozen"`
 */
export const watchTokenTokensFrozenEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenAbi,
    address: tokenAddress,
    eventName: "TokensFrozen",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"TokensUnfrozen"`
 */
export const watchTokenTokensUnfrozenEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenAbi,
    address: tokenAddress,
    eventName: "TokensUnfrozen",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchTokenTransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: tokenAbi,
  address: tokenAddress,
  eventName: "Transfer",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"Unpaused"`
 */
export const watchTokenUnpausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: tokenAbi,
  address: tokenAddress,
  eventName: "Unpaused",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link tokenAbi}__ and `eventName` set to `"UpdatedTokenInformation"`
 */
export const watchTokenUpdatedTokenInformationEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: tokenAbi,
    address: tokenAddress,
    eventName: "UpdatedTokenInformation",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__
 */
export const readTrustedIssuersRegistry = /*#__PURE__*/ createReadContract({
  abi: trustedIssuersRegistryAbi,
  address: trustedIssuersRegistryAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `functionName` set to `"getTrustedIssuerClaimTopics"`
 */
export const readTrustedIssuersRegistryGetTrustedIssuerClaimTopics =
  /*#__PURE__*/ createReadContract({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    functionName: "getTrustedIssuerClaimTopics",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `functionName` set to `"getTrustedIssuers"`
 */
export const readTrustedIssuersRegistryGetTrustedIssuers =
  /*#__PURE__*/ createReadContract({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    functionName: "getTrustedIssuers",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `functionName` set to `"getTrustedIssuersForClaimTopic"`
 */
export const readTrustedIssuersRegistryGetTrustedIssuersForClaimTopic =
  /*#__PURE__*/ createReadContract({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    functionName: "getTrustedIssuersForClaimTopic",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `functionName` set to `"hasClaimTopic"`
 */
export const readTrustedIssuersRegistryHasClaimTopic =
  /*#__PURE__*/ createReadContract({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    functionName: "hasClaimTopic",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `functionName` set to `"isTrustedIssuer"`
 */
export const readTrustedIssuersRegistryIsTrustedIssuer =
  /*#__PURE__*/ createReadContract({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    functionName: "isTrustedIssuer",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `functionName` set to `"owner"`
 */
export const readTrustedIssuersRegistryOwner = /*#__PURE__*/ createReadContract(
  {
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    functionName: "owner",
  },
);

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__
 */
export const writeTrustedIssuersRegistry = /*#__PURE__*/ createWriteContract({
  abi: trustedIssuersRegistryAbi,
  address: trustedIssuersRegistryAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `functionName` set to `"addTrustedIssuer"`
 */
export const writeTrustedIssuersRegistryAddTrustedIssuer =
  /*#__PURE__*/ createWriteContract({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    functionName: "addTrustedIssuer",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `functionName` set to `"init"`
 */
export const writeTrustedIssuersRegistryInit =
  /*#__PURE__*/ createWriteContract({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    functionName: "init",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `functionName` set to `"removeTrustedIssuer"`
 */
export const writeTrustedIssuersRegistryRemoveTrustedIssuer =
  /*#__PURE__*/ createWriteContract({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    functionName: "removeTrustedIssuer",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeTrustedIssuersRegistryRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeTrustedIssuersRegistryTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `functionName` set to `"updateIssuerClaimTopics"`
 */
export const writeTrustedIssuersRegistryUpdateIssuerClaimTopics =
  /*#__PURE__*/ createWriteContract({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    functionName: "updateIssuerClaimTopics",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__
 */
export const simulateTrustedIssuersRegistry =
  /*#__PURE__*/ createSimulateContract({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `functionName` set to `"addTrustedIssuer"`
 */
export const simulateTrustedIssuersRegistryAddTrustedIssuer =
  /*#__PURE__*/ createSimulateContract({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    functionName: "addTrustedIssuer",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `functionName` set to `"init"`
 */
export const simulateTrustedIssuersRegistryInit =
  /*#__PURE__*/ createSimulateContract({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    functionName: "init",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `functionName` set to `"removeTrustedIssuer"`
 */
export const simulateTrustedIssuersRegistryRemoveTrustedIssuer =
  /*#__PURE__*/ createSimulateContract({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    functionName: "removeTrustedIssuer",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateTrustedIssuersRegistryRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateTrustedIssuersRegistryTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `functionName` set to `"updateIssuerClaimTopics"`
 */
export const simulateTrustedIssuersRegistryUpdateIssuerClaimTopics =
  /*#__PURE__*/ createSimulateContract({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    functionName: "updateIssuerClaimTopics",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__
 */
export const watchTrustedIssuersRegistryEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `eventName` set to `"ClaimTopicsUpdated"`
 */
export const watchTrustedIssuersRegistryClaimTopicsUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    eventName: "ClaimTopicsUpdated",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `eventName` set to `"Initialized"`
 */
export const watchTrustedIssuersRegistryInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    eventName: "Initialized",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchTrustedIssuersRegistryOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `eventName` set to `"TrustedIssuerAdded"`
 */
export const watchTrustedIssuersRegistryTrustedIssuerAddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    eventName: "TrustedIssuerAdded",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link trustedIssuersRegistryAbi}__ and `eventName` set to `"TrustedIssuerRemoved"`
 */
export const watchTrustedIssuersRegistryTrustedIssuerRemovedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: trustedIssuersRegistryAbi,
    address: trustedIssuersRegistryAddress,
    eventName: "TrustedIssuerRemoved",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link vaultFactoryAbi}__
 */
export const readVaultFactory = /*#__PURE__*/ createReadContract({
  abi: vaultFactoryAbi,
  address: vaultFactoryAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const readVaultFactoryDefaultAdminRole =
  /*#__PURE__*/ createReadContract({
    abi: vaultFactoryAbi,
    address: vaultFactoryAddress,
    functionName: "DEFAULT_ADMIN_ROLE",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"DEPLOYER_ROLE"`
 */
export const readVaultFactoryDeployerRole = /*#__PURE__*/ createReadContract({
  abi: vaultFactoryAbi,
  address: vaultFactoryAddress,
  functionName: "DEPLOYER_ROLE",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"availableVaults"`
 */
export const readVaultFactoryAvailableVaults = /*#__PURE__*/ createReadContract(
  {
    abi: vaultFactoryAbi,
    address: vaultFactoryAddress,
    functionName: "availableVaults",
  },
);

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const readVaultFactoryGetRoleAdmin = /*#__PURE__*/ createReadContract({
  abi: vaultFactoryAbi,
  address: vaultFactoryAddress,
  functionName: "getRoleAdmin",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"hasRole"`
 */
export const readVaultFactoryHasRole = /*#__PURE__*/ createReadContract({
  abi: vaultFactoryAbi,
  address: vaultFactoryAddress,
  functionName: "hasRole",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"isVaultAvailable"`
 */
export const readVaultFactoryIsVaultAvailable =
  /*#__PURE__*/ createReadContract({
    abi: vaultFactoryAbi,
    address: vaultFactoryAddress,
    functionName: "isVaultAvailable",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"owner"`
 */
export const readVaultFactoryOwner = /*#__PURE__*/ createReadContract({
  abi: vaultFactoryAbi,
  address: vaultFactoryAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readVaultFactorySupportsInterface =
  /*#__PURE__*/ createReadContract({
    abi: vaultFactoryAbi,
    address: vaultFactoryAddress,
    functionName: "supportsInterface",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"vaultDeployed"`
 */
export const readVaultFactoryVaultDeployed = /*#__PURE__*/ createReadContract({
  abi: vaultFactoryAbi,
  address: vaultFactoryAddress,
  functionName: "vaultDeployed",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link vaultFactoryAbi}__
 */
export const writeVaultFactory = /*#__PURE__*/ createWriteContract({
  abi: vaultFactoryAbi,
  address: vaultFactoryAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"deployVault"`
 */
export const writeVaultFactoryDeployVault = /*#__PURE__*/ createWriteContract({
  abi: vaultFactoryAbi,
  address: vaultFactoryAddress,
  functionName: "deployVault",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"grantRole"`
 */
export const writeVaultFactoryGrantRole = /*#__PURE__*/ createWriteContract({
  abi: vaultFactoryAbi,
  address: vaultFactoryAddress,
  functionName: "grantRole",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeVaultFactoryRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: vaultFactoryAbi,
    address: vaultFactoryAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"renounceRole"`
 */
export const writeVaultFactoryRenounceRole = /*#__PURE__*/ createWriteContract({
  abi: vaultFactoryAbi,
  address: vaultFactoryAddress,
  functionName: "renounceRole",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"revokeRole"`
 */
export const writeVaultFactoryRevokeRole = /*#__PURE__*/ createWriteContract({
  abi: vaultFactoryAbi,
  address: vaultFactoryAddress,
  functionName: "revokeRole",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeVaultFactoryTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: vaultFactoryAbi,
    address: vaultFactoryAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link vaultFactoryAbi}__
 */
export const simulateVaultFactory = /*#__PURE__*/ createSimulateContract({
  abi: vaultFactoryAbi,
  address: vaultFactoryAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"deployVault"`
 */
export const simulateVaultFactoryDeployVault =
  /*#__PURE__*/ createSimulateContract({
    abi: vaultFactoryAbi,
    address: vaultFactoryAddress,
    functionName: "deployVault",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"grantRole"`
 */
export const simulateVaultFactoryGrantRole =
  /*#__PURE__*/ createSimulateContract({
    abi: vaultFactoryAbi,
    address: vaultFactoryAddress,
    functionName: "grantRole",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateVaultFactoryRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: vaultFactoryAbi,
    address: vaultFactoryAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"renounceRole"`
 */
export const simulateVaultFactoryRenounceRole =
  /*#__PURE__*/ createSimulateContract({
    abi: vaultFactoryAbi,
    address: vaultFactoryAddress,
    functionName: "renounceRole",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"revokeRole"`
 */
export const simulateVaultFactoryRevokeRole =
  /*#__PURE__*/ createSimulateContract({
    abi: vaultFactoryAbi,
    address: vaultFactoryAddress,
    functionName: "revokeRole",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link vaultFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateVaultFactoryTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: vaultFactoryAbi,
    address: vaultFactoryAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link vaultFactoryAbi}__
 */
export const watchVaultFactoryEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: vaultFactoryAbi,
  address: vaultFactoryAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link vaultFactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchVaultFactoryOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: vaultFactoryAbi,
    address: vaultFactoryAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link vaultFactoryAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const watchVaultFactoryRoleAdminChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: vaultFactoryAbi,
    address: vaultFactoryAddress,
    eventName: "RoleAdminChanged",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link vaultFactoryAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const watchVaultFactoryRoleGrantedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: vaultFactoryAbi,
    address: vaultFactoryAddress,
    eventName: "RoleGranted",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link vaultFactoryAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const watchVaultFactoryRoleRevokedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: vaultFactoryAbi,
    address: vaultFactoryAddress,
    eventName: "RoleRevoked",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link vaultFactoryAbi}__ and `eventName` set to `"VaultDeployed"`
 */
export const watchVaultFactoryVaultDeployedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: vaultFactoryAbi,
    address: vaultFactoryAddress,
    eventName: "VaultDeployed",
  });
