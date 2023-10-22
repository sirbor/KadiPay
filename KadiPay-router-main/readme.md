# KadiPay
KadiPay is your gateway to effortless cryptocurrency-to-fiat conversions, with a primary focus on USD and Kes.
KadiPay: Welcome to KadiPay, the innovative web-based decentralized application that empowers you to easily convert a wide range ofcryptocurrencies into fiat currencies, with a primary focus on USD and Kes. Seamlessly deposit your converted funds directly into your bank account, all powered by the BNB Smart Chain. Dive into KadiPay's full ecosystem, rich with features and functionalities, by exploring our extensive documentation. Don't forget to check out our frontend, backend, and smart contract repositories for a comprehensive look at how we're simplifying and democratizing cryptocurrency-to-fiat conversions, specifically catering to USD and Kes. Join us on this exciting journey to make crypto-to-fiat transactions more accessible than ever.

# Kadi Finance Smart Contracts

## Welcome
Hi thanks for taking a look at the Kadi Finance Smart Contracts. Kadi Finance is a web-baseed decentralized application that let's you convert almost any cryptocurrency to fiat in your bank account. It's currently built to support only cryptocurrency to the USD and KES conversions.

This is the Smart Contract Repo. You can also have a look at the [frontend](https://github.com/sirbor/KadiPay/tree/main/KadiPay-ui-main) and [backend](https://github.com/sirbor/KadiPay/tree/main/KadiPay-backend-main) repos.

### [Frontend](https://github.com/nonseodion/vert-ui)
### [Backend](https://github.com/sirbor/KadiPay/tree/main/KadiPay-backend-main)

## Architecture

![Frame 5](https://github.com/sirbor/KadiPay/blob/main/kadipay.png)

The architecture above shows how the Vert Router contract sells a users token for stablecoin. Vert Router takes any token from the user and swaps it a stablecoin which it sends to a receiver specified by the user. The Router swaps it to a stablecoin to ensure the amount receive maintains its value. This ensures Vert Finance does not lose money to cryptocurrency price flunctuations. Any address can be a receiver but the frontend passes a fixed receiver. The stablecoin must be sent to this receiver before the fiat equivalent can be sent to a users bank account.

## Contracts
There's only one contract.

### Vert Router
The Vert Router contract is a modification of Pancakeswap's Router contract. Its main function is to swap users tokens to a stablecoin and send to a receiver. 

#### Functions
| Function                                                                                                                       | Description                                                                                                                                 |
|--------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| sellETH( uint amountOutMin, address[] calldata path, uint deadline, address receiver )                                         | Exchanges ETH or the equivalent native currency of the chain it is deployed on to a stablecoin.                                             |
| sellToken(uint amountIn, uint amountOutMin, address[] calldata path, uint deadline, address receiver )                         | Exchanges any token to a stablecoin.                                                                                                        |
| sellTokenSupportingFeeOnTransfer( uint amountIn, uint amountOutMin, address[] calldata path, uint deadline, address receiver ) | Exchanges tokens with on transfer fees to a stablecoin.                                                                                     |
| getAmountIn( uint amountOut, uint reserveIn, uint reserveOut)                                                                  | Returns the token amount to swap to get `amountOut` from a pool.                                                                            |
| getAmountOut( uint amountIn, uint reserveIn, uint reserveOut)                                                                  | Returns the token amount gotten if `amountIn` is swapped on a pool.                                                                         |
| getAmountsOut( uint amountIn, address[] memory path )                                                                          | Returns an array of intermediate token amounts when `amountIn` is swapped along `path`. The last element is the token amount gotten.        |
| getAmountsIn( uint amountOut, address[] memory path )                                                                          | Returns an array of intermediate token amounts needed to get `amountOut` after a swap. The first element is the inital token amount needed. |            |

## Addresses

| Chain          | Addresses                                  |
|----------------|--------------------------------------------|
| BNB SmartChain | [0x0a055140c146bf8aaca189c65d8572ee18dd7e0](https://bscscan.com/address/0x0a055140c146bf8aaca189c65d8572ee18dd7e01) |
| BNB Testnet    | [0x74ad3f1C96E23456B8e6c9D7d7F67d1169949b5B](https://bscscan.com/address/0x74ad3f1C96E23456B8e6c9D7d7F67d1169949b5B) |