import React from "react"
import { Currency } from "@pancakeswap/sdk"
import { useChainId } from "wagmi"
import { Balance } from "../../state/balances/useBalances"
import removeTrailingZeros from "../../utils/removeTrailingZeros"
import { getTokenLogoURL } from "../../utils"
import CurrencyLogo from "./CurrencyLogo"
import { wrappedCurrency } from "../../utils/wrappedCurrency"
import FiatAmount from "../../utils/FiatAmount"
import BalanceSkeleton from "../skeletons/BalanceSkeleton"

interface ImportedTokenProps {
  token: Currency
  logo: string
  handleClick: (token: Currency, logo: string) => void
  tokenBalance?: Balance
  fiatBalance?: FiatAmount
  connected: boolean
}

export default function ImportedToken({
  token,
  logo,
  handleClick,
  tokenBalance = { amount: undefined, loading: true },
  fiatBalance,
  connected,
}: ImportedTokenProps) {
  const { name, symbol } = token
  const chainId = useChainId()

  return (
    <li className="w-full">
      <button
        onClick={() => handleClick(token, logo)}
        type="button"
        className="w-full text-left flex justify-between mb-8"
      >
        <div className="flex flex-nowrap grow">
          <CurrencyLogo
            currency={token}
            srcs={[
              logo,
              getTokenLogoURL(wrappedCurrency(token, chainId)) ?? "",
            ]}
          />
          <div className="flex flex-col ml-4 space-y-[3.5px]">
            <h4 className="font-medium text-base text-black">{name}</h4>
            <div className="text-[13px] text-lightBlue inline-flex">
              {tokenBalance.amount && connected && (
                <>
                  <span className="max-w-[60px] inline-block text-ellipsis overflow-hidden">
                    {removeTrailingZeros(
                      tokenBalance.amount.toSignificant(
                        token.decimals <= 4 ? token.decimals : 4
                      )
                    )}
                  </span>
                  &nbsp;
                </>
              )}
              {symbol}
            </div>
          </div>
        </div>
        {connected && (
          <div className="grow-0 text-right font-normal text text-13">
            {tokenBalance.loading ? (
              <BalanceSkeleton className="h-4 w-8 " />
            ) : (
              `${removeTrailingZeros(fiatBalance?.toExact() ?? "")} ${
                fiatBalance?.fiat.symbol
              }`
            )}
          </div>
        )}
      </button>
    </li>
  )
}

ImportedToken.defaultProps = {
  tokenBalance: { amount: undefined, loading: true },
  fiatBalance: undefined,
}
