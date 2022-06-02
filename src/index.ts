import "./global";

import isEmail from "./isEmail";
import isContractCreationTx from "./isContractCreationTx";
import getTokenInfoFromProvider from "./getTokenInfoFromProvider";
import getTokenInfoFromOneInch from "./getTokenInfoFromOneInch";

type TokenInfo = {
  symbol: string;
  decimals: number;
  name: string;
  address: string;
  eip2612?: boolean;
};

export {
  isEmail,
  getTokenInfoFromProvider,
  isContractCreationTx,
  getTokenInfoFromOneInch,
  TokenInfo,
};
