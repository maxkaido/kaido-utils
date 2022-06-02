require("dotenv").config({ path: ".env.test" });

import { describe, expect, test } from "@jest/globals";

const consola = require("consola");
consola.wrapAll();

import { ethers } from "ethers";
import getTokenInfoFromEtherscan from "./getTokenInfoFromEtherscan";
import getTokenInfoFromProvider from "./getTokenInfoFromProvider";
import getTokenInfoFromOneInch from "./getTokenInfoFromOneInch";

describe("utils", () => {
  // following endpoint requires PRO API key
  const uniAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  const makerAddress = "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2";
  test.skip("getTokenInfoFromEtherscan", async () => {
    const tokenInfo = await getTokenInfoFromEtherscan(
      "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2"
    );
    expect(tokenInfo.message).toBe("NOTOK");
    expect(tokenInfo.status).toBe("0");

    // consola.info(tokenInfo);
  });

  test("getTokenInfoFromOneInch", async () => {
    let tokenInfo = await getTokenInfoFromOneInch(uniAddress);
    expect(tokenInfo).toEqual({
      symbol: "UNI",
      name: "Uniswap",
      eip2612: true,
      address: uniAddress.toLowerCase(),
      decimals: 18,
    });
    tokenInfo = await getTokenInfoFromOneInch(makerAddress);
    expect(tokenInfo).toEqual({
      symbol: "MKR",
      name: "Maker",
      address: makerAddress.toLowerCase(),
      decimals: 18,
    });
    const tokenAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
    tokenInfo = await getTokenInfoFromOneInch(tokenAddress);
    expect(tokenInfo).toEqual({
      symbol: "ETH",
      name: "Ethereum",
      address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      decimals: 18,
    });
    const missingTokenAddress = "0x6c1dfee2b2ede28970b666fc8f2ed47a8f9399ea";

    tokenInfo = await getTokenInfoFromOneInch(missingTokenAddress);
    expect(tokenInfo).toBeUndefined();
  });

  test("getTokenInfoFromProvider", async () => {
    const tokenInfo = await getTokenInfoFromProvider(
      uniAddress,
      ethers.getDefaultProvider("https://geth1.kaido.team")
    );
    // consola.info(tokenInfo);
    expect(tokenInfo).toEqual({
      symbol: "UNI",
      name: "Uniswap",
      address: uniAddress.toLowerCase(),
      decimals: 18,
    });
    //
  });

  test("getContractFromEtherscan", async () => {
    //
  });

  // make request to local api
  test.todo("getTokenInfo(cache=false)");

  test.todo("getTokenInfo(cache=true)");
});
