import { readMeaningOfLifeTheMeaningOfLifeIs } from "@/services/contracts/wagmiGenActions";

export async function getMeaningOfLife(): Promise<bigint> {
  const result = await readMeaningOfLifeTheMeaningOfLifeIs({});
  return BigInt(result);
}
