import React, { useState } from "react"
import { useNetwork } from "wagmi"
import { ERC20Token } from "@pancakeswap/sdk"
import { ReactComponent as LinkIcon } from "../../assets/icons/link.svg"
import { ReactComponent as CheckBox } from "../../assets/icons/checkbox.svg"
import { Button, Copy } from "../general"
import { shortenAddress } from "../../utils"

export default function TokenImport({
  token,
  logo,
}: {
  token: ERC20Token
  logo: string
}) {
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)
  const { symbol, address, name } = token
  const { chain } = useNetwork()
  const blockExplorer = chain?.blockExplorers?.default

  return (
    <div className="px-6">
      <div className="p-[17px] flex space-x-3 items-center border border-primary rounded-2xl">
        {logo !== "" ? (
          <img src={logo} alt={name} className="h-10 w-10 rounded-[20px]" />
        ) : (
          <div className="h-[40px] w-[40px] flex-shrink-0 rounded-full bg-[#CADAF4] flex items-center justify-center">
            <span className="text-lightBlue text-base">
              {symbol.slice(0, 4)}
            </span>
          </div>
        )}

        <div className="flex flex-col space-y-1 w-full">
          <div className="flex items-center">
            <h3 className="text-black font-medium text-base">
              {name}
              <span className="text-[13px] bg-lightGrey rounded-[4px] p-1 ml-[6.75px] text-dark">
                {symbol}
              </span>
            </h3>
          </div>
          <div className="justify-between items-center flex">
            <div className="flex space-x-[8.68px]">
              <span className="text-13">
                {shortenAddress(address as `0x${string}`)}
              </span>
              <Copy text="0x534...c3d" />
            </div>
            <a
              href={`${blockExplorer?.url}/token/${address}`}
              target="blank"
              className="border-none outline-none flex items-center space-x-[5.45px]"
            >
              <span className="text-13 text-purple">{blockExplorer?.name}</span>
              <LinkIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-[16.44px] bg-primary/[.15] rounded-xl py-[13px] px-4 mb-[149px]">
        <h3 className="text-xl leading-[30px] text-danger font-medium mb-[14px]">
          Make sure you trust a token before you import it!
        </h3>
        <p className="text-dark leading-[26px] mb-[44.5px]">
          Anyone can create a token, including forgeries of existing tokens
          claiming to represent projects.
        </p>
        <button
          type="button"
          className="flex space-x-[10.75px] items-center"
          onClick={() => setConfirmed((conf) => !conf)}
        >
          {confirmed ? (
            <CheckBox />
          ) : (
            <div className="transition-all duration-150 border border-lightBlue h-[18px] w-[18px] rounded-[2px]" />
          )}
          <span className="text-base text-dark">I understand</span>
        </button>
      </div>
      <Button
        text="Import"
        className="mb-6 disabled:text-lightBlue disabled:bg-disabled h-[52px]"
        disabled={!confirmed}
        fullWidth
        onClick={() => setLoading(true)}
        loading={loading}
        showLoadingText={false}
      />
    </div>
  )
}
