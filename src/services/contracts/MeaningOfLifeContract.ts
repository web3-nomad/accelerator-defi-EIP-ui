import { callContract } from "@/services/api/requests";

import MeaningOfLifeJSON from "@/assets/abi/MeaningOfLife.json";
import { ethers } from "ethers";

//@TODO need to pass both my addr and target CA addr
export async function getMeaningOfLife(
  targetAddress: string,
): Promise<string[]> {
  const contractInterface = new ethers.Interface(MeaningOfLifeJSON.abi);

  const response = await callContract({
    data: contractInterface.encodeFunctionData("theMeaningOfLifeIs"),
    from: targetAddress,
    to: targetAddress,
  });

  console.log("L22 response ===", response);

  const decodedResponse = contractInterface.decodeFunctionResult(
    "theMeaningOfLifeIs",
    ethers.getBytes(response.data.result),
  );

  console.log("L27 decodedResponse ===", decodedResponse);

  return decodedResponse;
}
