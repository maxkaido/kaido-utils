"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const globals_1 = require("@jest/globals");
const isContractCreationTx_1 = __importDefault(require("./isContractCreationTx"));
(0, globals_1.test)("know when tx is contract creation (except inner tx)", async function () {
    const wsProviderUrl = "https://geth1.kaido.team";
    const wsProvider = ethers_1.ethers.getDefaultProvider(wsProviderUrl);
    const contractCreationTxHash = "0xfd5f0c65fdea26d0b94362532554d4c6cb4935b198d75e1cc07c7df4bfd8d1ad";
    const minedTxHash = "0x28b48819f83b95eb657d072b84f810faaf0411b207d66b53c4d2f7e8fddc4ba2";
    const { to, contractAddress } = await wsProvider.getTransactionReceipt(contractCreationTxHash);
    (0, globals_1.expect)(to).toBeNull();
    (0, globals_1.expect)(contractAddress).not.toBeNull();
    const minedTx = await wsProvider.getTransactionReceipt(minedTxHash);
    (0, globals_1.expect)(minedTx.to).not.toBeNull();
    (0, globals_1.expect)(minedTx.contractAddress).not.toBeNull();
    (0, globals_1.expect)((await (0, isContractCreationTx_1.default)(wsProvider, contractCreationTxHash))).toBeTruthy();
    (0, globals_1.expect)((await (0, isContractCreationTx_1.default)(wsProvider, minedTxHash))).toBeFalsy();
});
