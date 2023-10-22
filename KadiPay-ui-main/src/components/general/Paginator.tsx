import React, { useMemo } from "react"
import clsx from "classnames"

interface PaginatorProps {
  rowsPerPage: number
  currentPage: number
  dataLength: number
  onChangePage: (page: number) => void
}

export default function Paginator({
  rowsPerPage,
  currentPage,
  dataLength,
  onChangePage,
}: PaginatorProps) {
  const rowCountItems = useMemo(
    () => Array.from(Array(Math.ceil(dataLength / rowsPerPage)).keys()),
    [rowsPerPage, dataLength]
  )

  return (
    <div className="mt-[30px] flex items-center justify-center space-x-2">
      {rowCountItems.map((page) => (
        <button
          onClick={() => onChangePage(page + 1)}
          key={page + 1}
          type="button"
          className={clsx("h-[18px] w-[18px] text-12 text-white/[.4]", {
            "!text-black bg-[#E4FFDF] rounded-[2px]": page + 1 === currentPage,
          })}
        >
          {page + 1}
        </button>
      ))}
    </div>
  )
}
