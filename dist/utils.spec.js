"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: ".env.test" });
const globals_1 = require("@jest/globals");
const consola_1 = __importDefault(require("consola"));
consola_1.default.wrapAll();
const ethers_1 = require("ethers");
const getTokenInfoFromEtherscan_1 = __importDefault(require("./getTokenInfoFromEtherscan"));
const getTokenInfoFromProvider_1 = __importDefault(require("./getTokenInfoFromProvider"));
const getTokenInfoFromOneInch_1 = __importDefault(require("./getTokenInfoFromOneInch"));
(0, globals_1.describe)("utils", () => {
    // following endpoint requires PRO API key
    const uniAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
    const makerAddress = "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2";
    globals_1.test.skip("getTokenInfoFromEtherscan", async () => {
        const tokenInfo = await (0, getTokenInfoFromEtherscan_1.default)("0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2");
        (0, globals_1.expect)(tokenInfo.message).toBe("NOTOK");
        (0, globals_1.expect)(tokenInfo.status).toBe("0");
        // consola.info(tokenInfo);
    });
    (0, globals_1.test)("getTokenInfoFromOneInch", async () => {
        let tokenInfo = await (0, getTokenInfoFromOneInch_1.default)(uniAddress);
        (0, globals_1.expect)(tokenInfo).toEqual({
            symbol: "UNI",
            name: "Uniswap",
            eip2612: true,
            address: uniAddress.toLowerCase(),
            decimals: 18,
        });
        tokenInfo = await (0, getTokenInfoFromOneInch_1.default)(makerAddress);
        (0, globals_1.expect)(tokenInfo).toEqual({
            symbol: "MKR",
            name: "Maker",
            address: makerAddress.toLowerCase(),
            decimals: 18,
        });
        const tokenAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
        tokenInfo = await (0, getTokenInfoFromOneInch_1.default)(tokenAddress);
        (0, globals_1.expect)(tokenInfo).toEqual({
            symbol: "ETH",
            name: "Ethereum",
            address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            decimals: 18,
        });
        const missingTokenAddress = "0x6c1dfee2b2ede28970b666fc8f2ed47a8f9399ea";
        tokenInfo = await (0, getTokenInfoFromOneInch_1.default)(missingTokenAddress);
        (0, globals_1.expect)(tokenInfo).toBeUndefined();
    });
    (0, globals_1.test)("getTokenInfoFromProvider", async () => {
        const tokenInfo = await (0, getTokenInfoFromProvider_1.default)(uniAddress, ethers_1.ethers.getDefaultProvider("https://geth1.kaido.team"));
        // consola.info(tokenInfo);
        (0, globals_1.expect)(tokenInfo).toEqual({
            symbol: "UNI",
            name: "Uniswap",
            address: uniAddress.toLowerCase(),
            decimals: 18,
        });
        //
    });
    (0, globals_1.test)("getContractFromEtherscan", async () => {
        //
    });
    // make request to local api
    globals_1.test.todo("getTokenInfo(cache=false)");
    globals_1.test.todo("getTokenInfo(cache=true)");
});
