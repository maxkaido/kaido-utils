import { providers } from "ethers";

const isContractCreationTx = async (
  provider: providers.JsonRpcProvider,
  txHash: string
) => {
  try {
    const tx = await provider.getTransactionReceipt(txHash);
    if (!tx) return false; // i.e. reverted
    const { to, contractAddress } = tx;
    if (to === null && contractAddress !== null) return contractAddress;
    else return false;
  } catch (e: any) {
    console.log(e.message);
    return undefined;
  }
};

export default isContractCreationTx;
