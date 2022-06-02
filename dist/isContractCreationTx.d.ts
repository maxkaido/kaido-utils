import { providers } from "ethers";
declare const isContractCreationTx: (provider: providers.JsonRpcProvider, txHash: string) => Promise<string | false | undefined>;
export default isContractCreationTx;
