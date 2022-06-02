"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isContractCreationTx = async (provider, txHash) => {
    try {
        const tx = await provider.getTransactionReceipt(txHash);
        if (!tx)
            return false; // i.e. reverted
        const { to, contractAddress } = tx;
        if (to === null && contractAddress !== null)
            return contractAddress;
        else
            return false;
    }
    catch (e) {
        console.log(e.message);
        return undefined;
    }
};
exports.default = isContractCreationTx;
