import { SupportedClient } from "../blockchain/config.blockchain";
import { getExchangeApi } from "./setup.bank";

type ExchangeBalance = {
  totalRecieved: number,
  totalSent: number,
  txnCount: number,
  currency: "NGN",
  amount: number,
  formattedAmount: number
}

async function getBalance(network: SupportedClient) {
  const exchangeApi = getExchangeApi(network);
  try{
    const balance: ExchangeBalance = (await exchangeApi.get("balance", {
      params: {
        currency: "NGN",
      }
    })).data.data.balance;
    
    return balance;
  }catch(err){
    console.log("getBalance_FAILED:", err.response.data);
    throw Error(`Could not get account balance`);
  }
}

export default getBalance;