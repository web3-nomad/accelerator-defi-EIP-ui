import { readMeaningOfLifeTheMeaningOfLifeIs } from "@/services/contracts/wagmi-gen-actions";

//@TODO make it query?
export async function getMeaningOfLife(): Promise<bigint> {
  const result = await readMeaningOfLifeTheMeaningOfLifeIs({});
  return BigInt(result);
}
