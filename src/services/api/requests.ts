import axios from "axios";

export const Gas = 9000000;
export const GasPrice = 100000000;

const TESTNET_URL = `https://testnet.mirrornode.hedera.com`;
/* TODO: Enable for Mainnet usage.
  const MAINNET_URL = `https://mainnet-public.mirrornode.hedera.com`;
  */
const testnetMirrorNodeAPI = axios.create({
  baseURL: TESTNET_URL,
});

interface CallContractParams {
  block?: string;
  data: string;
  estimate?: boolean;
  from: string;
  gas?: number;
  gasPrice?: number;
  to: string;
  value?: number;
}
/**
 * Returns the results from a cost-free contract execution such as read-only smart contract queries,
 * gas estimation, and transient simulation of read-write operations.
 * @param payload -
 * @returns Results from a cost-free EVM call to the contract.
 */

export const callContract = async (
  payload: CallContractParams,
): Promise<any> => {
  const {
    block = "latest",
    data,
    estimate = false,
    from,
    gas = Gas,
    gasPrice = GasPrice,
    to,
    value = 0,
  } = payload;
  return await testnetMirrorNodeAPI.post(`/api/v1/contracts/call`, {
    block,
    data,
    estimate,
    from,
    gas,
    gasPrice,
    to,
    value,
  });
};
