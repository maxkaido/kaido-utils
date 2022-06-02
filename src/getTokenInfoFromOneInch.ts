import axios from "axios";

const getTokenInfoFromOneInch = async (address: string) => {
  try {
    address = address.toLowerCase();
    const url = "https://api.1inch.exchange/v2.0/tokens";
    const {
      data: { tokens },
    } = await axios.get(url);
    // consola.info({ tokens });
    const tokenInfo = tokens[address];
    delete tokenInfo.logoURI;
    return tokenInfo;
  } catch (e: any) {
    console.info("failed to get token info", address, "from 1inch", e.message);
    return undefined;
  }
};

export default getTokenInfoFromOneInch;
