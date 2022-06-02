import { providers } from "ethers";
declare const getTokenInfoFromProvider: (address: string, provider: providers.BaseProvider) => Promise<{
    address: string;
    symbol: any;
    decimals: any;
    name: any;
} | undefined>;
export default getTokenInfoFromProvider;
