import createSimulateContract from "@/services/contracts/codegen/createSimulateContract";
import createReadContract from "@/services/contracts/codegen/createReadContract";
import createWatchContractEvent from "@/services/contracts/codegen/createWatchContractEvent";
import createWriteContract from "@/services/contracts/codegen/createWriteContract";

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
  "0x0000000000000000000000000000000000000002" as const;

export const erc20Config = { address: erc20Address, abi: erc20Abi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MeaningOfLife
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const meaningOfLifeAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  { type: "error", inputs: [], name: "InvalidInitialization" },
  { type: "error", inputs: [], name: "NotInitializing" },
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
    type: "function",
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "theMeaningOfLifeIs",
    outputs: [{ name: "meaning", internalType: "uint32", type: "uint32" }],
    stateMutability: "pure",
  },
] as const;

export const meaningOfLifeAddress =
  "0x0000000000000000000000000000000000000001" as const;

export const meaningOfLifeConfig = {
  address: meaningOfLifeAddress,
  abi: meaningOfLifeAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

/**s
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
 * Wraps __{@link readContract}__ with `abi` set to __{@link meaningOfLifeAbi}__
 */
export const readMeaningOfLife = /*#__PURE__*/ createReadContract({
  abi: meaningOfLifeAbi,
  address: meaningOfLifeAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link meaningOfLifeAbi}__ and `functionName` set to `"theMeaningOfLifeIs"`
 */
export const readMeaningOfLifeTheMeaningOfLifeIs =
  /*#__PURE__*/ createReadContract({
    abi: meaningOfLifeAbi,
    address: meaningOfLifeAddress,
    functionName: "theMeaningOfLifeIs",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link meaningOfLifeAbi}__
 */
export const writeMeaningOfLife = /*#__PURE__*/ createWriteContract({
  abi: meaningOfLifeAbi,
  address: meaningOfLifeAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link meaningOfLifeAbi}__ and `functionName` set to `"initialize"`
 */
export const writeMeaningOfLifeInitialize = /*#__PURE__*/ createWriteContract({
  abi: meaningOfLifeAbi,
  address: meaningOfLifeAddress,
  functionName: "initialize",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link meaningOfLifeAbi}__
 */
export const simulateMeaningOfLife = /*#__PURE__*/ createSimulateContract({
  abi: meaningOfLifeAbi,
  address: meaningOfLifeAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link meaningOfLifeAbi}__ and `functionName` set to `"initialize"`
 */
export const simulateMeaningOfLifeInitialize =
  /*#__PURE__*/ createSimulateContract({
    abi: meaningOfLifeAbi,
    address: meaningOfLifeAddress,
    functionName: "initialize",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link meaningOfLifeAbi}__
 */
export const watchMeaningOfLifeEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: meaningOfLifeAbi,
  address: meaningOfLifeAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link meaningOfLifeAbi}__ and `eventName` set to `"Initialized"`
 */
export const watchMeaningOfLifeInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: meaningOfLifeAbi,
    address: meaningOfLifeAddress,
    eventName: "Initialized",
  });
