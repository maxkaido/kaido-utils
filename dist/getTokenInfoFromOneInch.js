"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const getTokenInfoFromOneInch = async (address) => {
    try {
        address = address.toLowerCase();
        const url = "https://api.1inch.exchange/v2.0/tokens";
        const { data: { tokens }, } = await axios_1.default.get(url);
        // consola.info({ tokens });
        const tokenInfo = tokens[address];
        delete tokenInfo.logoURI;
        return tokenInfo;
    }
    catch (e) {
        console.info("failed to get token info", address, "from 1inch", e.message);
        return undefined;
    }
};
exports.default = getTokenInfoFromOneInch;
