"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// following endpoint requires PRO API key
const getTokenInfoFromEtherscan = async (tokenAddress) => {
    const url = `https://api.etherscan.io/api?module=token&action=tokeninfo&contractaddress=${tokenAddress}&apikey=${process.env.ETHERSCAN_API_KEY}`;
    // consola.info({ url });
    const { data } = await axios_1.default.get(url);
    // consola.info({ data });
    return data;
};
exports.default = getTokenInfoFromEtherscan;
