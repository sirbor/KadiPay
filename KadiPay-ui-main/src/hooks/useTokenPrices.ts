import { useChainId } from "wagmi"
import { WNATIVE, Currency, CurrencyAmount, Price } from "@pancakeswap/sdk"
import { useCallback, useMemo } from "react"
import { usePairs } from "./usePairs"
import getBUSDPrice from "../utils/getBUSDPrice"
import { defaultChainId } from "../utils/config"
import { stableCoins } from "../utils/constants/exchange"

export default function useTokenPrices(
  amounts?: (CurrencyAmount<Currency> | undefined)[]
): (Price<Currency, Currency> | undefined)[] {
  const currencies = useMemo(
    () => amounts?.map((amount) => amount?.currency) || [],
    [amounts]
  )
  const chainId = useChainId()

  const getTokenPairs = useCallback(() => {
    const pairs: [Currency | undefined, Currency | undefined][] = []
    currencies.forEach((currency) => {
      const wrapped = currency?.wrapped
      const wnative = WNATIVE[chainId || defaultChainId]
      const stable = stableCoins[chainId]

      const tokenPairs: [Currency | undefined, Currency | undefined][] = [
        [
          chainId && wrapped && wnative?.equals(wrapped) ? undefined : currency,
          chainId ? wnative : undefined,
        ],
        [stable && wrapped?.equals(stable) ? undefined : wrapped, stable],
        [chainId ? wnative : undefined, stable],
      ]

      pairs.push(...tokenPairs)
    })

    return pairs
  }, [chainId, currencies])

  const tokenPairs = getTokenPairs()
  const pairs = usePairs(tokenPairs, { blocksPerFetch: 100 })
  const prices: (Price<Currency, Currency> | undefined)[] = useMemo(() => {
    const pricesHolder: (Price<Currency, Currency> | undefined)[] = []
    for (let i = 0; i < currencies.length; i += 1) {
      const j = i * 3
      pricesHolder.push(
        getBUSDPrice(
          [pairs[j], pairs[j + 1], pairs[j + 2]],
          chainId,
          currencies[i]
        )
      )
    }

    return pricesHolder
  }, [chainId, currencies, pairs])

  return prices
}
