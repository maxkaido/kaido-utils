import { ethers } from "ethers";
import { expect, test } from "@jest/globals";
import isContractCreationTx from "./isContractCreationTx";

test("know when tx is contract creation (except inner tx)", async function () {
  const wsProviderUrl = "https://geth1.kaido.team";
  const wsProvider: any = ethers.getDefaultProvider(wsProviderUrl);
  const contractCreationTxHash =
    "0xfd5f0c65fdea26d0b94362532554d4c6cb4935b198d75e1cc07c7df4bfd8d1ad";
  const minedTxHash =
    "0x28b48819f83b95eb657d072b84f810faaf0411b207d66b53c4d2f7e8fddc4ba2";
  const { to, contractAddress } = await wsProvider.getTransactionReceipt(
    contractCreationTxHash
  );
  expect(to).toBeNull();
  expect(contractAddress).not.toBeNull();
  const minedTx = await wsProvider.getTransactionReceipt(minedTxHash);
  expect(minedTx.to).not.toBeNull();
  expect(minedTx.contractAddress).not.toBeNull();

  expect(
    (await isContractCreationTx(wsProvider, contractCreationTxHash)) as any
  ).toBeTruthy();
  expect(
    (await isContractCreationTx(wsProvider, minedTxHash)) as any
  ).toBeFalsy();
});
