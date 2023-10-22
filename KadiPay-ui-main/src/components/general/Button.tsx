import React from "react"
import clsx from "classnames"
import { ButtonLoader } from "./Loader"
import { doNothing } from "../../utils/functions"

interface ButtonProps {
  text: string
  background?: "primary" | "transparent"
  textColor?: "white" | "dark"
  bordered?: boolean
  onClick?: (_?: any) => void | null
  fullWidth?: boolean
  className?: string
  loading?: boolean
  type?: "button" | "submit"
  disabled?: boolean
  showLoadingText?: boolean
  loadingText?: string
  icon?: React.ReactNode
}

export default function Button({
  background,
  type,
  textColor,
  text,
  bordered,
  onClick,
  fullWidth,
  className,
  loading,
  disabled,
  loadingText,
  showLoadingText,
  icon,
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      type={type === "submit" ? "submit" : "button"}
      onClick={onClick}
      className={clsx(
        "text-white disabled:cursor-not-allowed relative bg-primary py-[14px] px-4 rounded-xl",
        { "bg-transparent": background === "transparent" },
        { "!text-black": textColor === "dark" },
        { "border border-primary": bordered },
        { "w-full": fullWidth },
        className
      )}
    >
      {loading && (
        <div className="relative top-0 left-0 w-full h-full flex items-center space-x-[5px] justify-center">
          <ButtonLoader className="h-4 w-4" />
          {showLoadingText && (
            <span className="text-black/[.4]">
              {loadingText ?? "Loading.."}.
            </span>
          )}
        </div>
      )}
      <div
        className={clsx("flex items-center justify-center space-x-[10px]", {
          "opacity-0": loading,
        })}
      >
        <span>{text}</span>
        {icon && icon}
      </div>
    </button>
  )
}

Button.defaultProps = {
  background: "primary",
  textColor: "white",
  bordered: false,
  fullWidth: false,
  className: "",
  loading: false,
  onClick: doNothing,
  type: "button",
  disabled: false,
  showLoadingText: true,
  loadingText: "",
  icon: null,
}
