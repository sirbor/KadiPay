import { Address, TransactionReceipt, Hash, decodeEventLog, getAddress } from "viem";

import receivers from "../../data/receivers.json";
import routers from "../../data/routers.json";
import routerAbi from "../../data/abis/router";
import { ChainIds, SupportedClient, getClient } from "./config.blockchain";

const SellEventSignature = "0xa90e25af8f532db6a04ac99d7101fca78edb7b6c9507535d6e86146407204dcc";

// checks the validity of the swap blockchain tx and returns the amount of stable coin sold
async function verifySwapTx(txHash: Hash, senderAddress: Address, network: SupportedClient): Promise<{busdAmount: bigint, swapTime: number}>{
  senderAddress = getAddress(senderAddress);
  const blockchainClient = getClient(network);
  const txReceipt: TransactionReceipt = await blockchainClient.getTransactionReceipt({ hash: txHash });
  const {logs: _logs, from, to, blockNumber } = txReceipt;
  const swapTime = Number((await blockchainClient.getBlock({blockNumber: blockNumber})).timestamp);
  const logs  = _logs as unknown as (typeof _logs[0] & {topics: [] | [signtaure: `0x${string}`, ...args: `0x${string}`[]]}) [];

  if(senderAddress !== getAddress(from)){
    console.log(`checkBlockchainTx_Failure: ${txHash} sender is different. Original sender: ${from}. Wrong sender: ${senderAddress}`)
    throw Error("Failed to verify Swap Tx ");
  }
  if(getAddress(to) !== getAddress(routers[ChainIds[network]])){
    console.log(`checkBlockchainTx_Failure: ${txHash} sent to a wrong router: ${to}`)
    throw Error("Failed to verify Swap Tx ");
  }
  if(Number(blockNumber) + 50 < await blockchainClient.getBlockNumber()){
    console.log(`checkBlockchainTx_Failure: ${txHash} too old.`);
    throw Error("Failed to verify Swap Tx ");
  }
  
  let sellEvent: {seller: Address, amountStableCoin: bigint, receiver: Address};

  for(const log of logs ){
    if(log.address !== routers[ChainIds[network]] && (log.topics?.[0] !== SellEventSignature)) continue;
    const sellEventLog = decodeEventLog({
      data: log.data,
      abi: routerAbi,
      topics: log.topics,
      eventName: "Sell"
    }).args;

    sellEvent = {seller: getAddress(sellEventLog.seller), amountStableCoin: sellEventLog.amountStableCoin, receiver: getAddress(sellEventLog.receiver)}
    break;
  }

  if(!sellEvent){
    console.log(`checkBlockchainTx_Failure: Sell event missing in ${txHash} `)
    throw Error("Failed to verify Swap Tx ");
  }

  if(sellEvent.seller !== senderAddress){
    console.log(`checkBlockchainTx_Failure: Different Sell Log seller. SellEventSeller:${sellEvent.seller}. Sender:${senderAddress}`)
    throw Error("Failed to verify Swap Tx ");
  }
  if(sellEvent.receiver !== getAddress(receivers[ChainIds[network]])){
    console.log(`checkBlockchainTx_Failure: Different Sell Log receiver. SellEventReceiver: ${sellEvent.receiver}. Receiver: ${receivers[ChainIds[network]]}`);
    throw Error("Failed to verify Swap Tx ");
  }
  
  return { busdAmount: sellEvent.amountStableCoin, swapTime };
}

export default verifySwapTx;