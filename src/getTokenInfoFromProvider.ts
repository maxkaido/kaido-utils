import { ethers, providers } from "ethers";
const getTokenInfoFromProvider = async (
  address: string,
  provider: providers.BaseProvider
) => {
  address = address.toLowerCase();
  if (address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
    const etherToken = {
      address,
      symbol: "ETH",
      name: "Ethereum",
      decimals: 18,
    };
    return etherToken;
  }
  const abi = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    "function name() view returns (string)",

    // Authenticated Functions
    "function transfer(address to, uint amount) returns (boolean)",

    // Events
    "event Transfer(address indexed from, address indexed to, uint amount)",
  ];
  const erc20 = new ethers.Contract(address, abi, provider);

  try {
    const symbol = await erc20.symbol();
    const name = await erc20.name();
    const decimals = await erc20.decimals();
    return { address, symbol, decimals, name };
  } catch (e: any) {
    consola.info("failed to get token info for ", address, e.message);
    return undefined;
  }
};

export default getTokenInfoFromProvider;
