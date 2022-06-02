import axios from "axios";
// following endpoint requires PRO API key
const getTokenInfoFromEtherscan = async (tokenAddress: string) => {
  const url = `https://api.etherscan.io/api?module=token&action=tokeninfo&contractaddress=${tokenAddress}&apikey=${process.env.ETHERSCAN_API_KEY}`;
  // consola.info({ url });
  const { data } = await axios.get(url);
  // consola.info({ data });
  return data;
};

export default getTokenInfoFromEtherscan;
