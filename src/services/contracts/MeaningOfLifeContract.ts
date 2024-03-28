import { readMeaningOfLifeTheMeaningOfLifeIs } from "@/services/contracts/wagmi-gen-actions";

export async function getMeaningOfLife(): Promise<bigint> {
  const result = await readMeaningOfLifeTheMeaningOfLifeIs({});
  return BigInt(result);
}
