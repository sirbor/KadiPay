import { Token } from "@pancakeswap/sdk"
import { ChainId } from "../config"

export enum PageRoutes {
  HOME = "/",
  SIGN_IN_WITH_EMAIL = "/sign-in/email",
  SIGN_UP_WITH_EMAIL = "/sign-up/email",
  SIGN_UP_WITH_WALLET = "/sign-up/wallet",
  EMAIL_VERIFICATION = "/verify-email",
  PROFILE_SETTINGS = "/settings/profile",
  MANAGE_WALLETS = "/settings/wallet",
  DEFAULT_CURRENCY = "/settings/default-currency",
  BANK_ACCOUNTS = "/settings/bank-accounts",
  SECURITY_SETTINGS = "/settings/security",
  CHANGE_PASSWORD = "/settings/security/change-password",
  SET_PASSWORD = "/settings/security/set-password",
  MANAGE_TOKEN_APPROVALS = "/settings/security/manage-token-approvals",
  TRANSACTIONS = "/transactions",
  TRANSACTION_DETAIL = "/transactions/:transactionId",
  FORGOT_PASSWORD = "/forgot-password",
  RESET_PASSWORD = "/reset-password",
  SELECT_BANK_ACCOUNT = "/select-bank-account",
  PROCESS_TRANSACTION = "/process-transaction",
  ERROR = "/error",
}

export enum Modals {
  CONNECT_WALLET = "connect_wallet",
  TOKEN_MODAL = "token_modal",
  BANK_ACCOUNT = "bank_account",
  REMOVE_TOKEN_APPROVAL = "remove_token_approval",
  UNLINK_WALLET = "unlink_wallet",
  SUCCESSFUL_SIGN_UP = "successful_sign_up",
  RESET_PASSWORD_MODAL = "reset_password_modal",
  RESET_PASSWORD_SUCCESSFUL_MODAL = "reset_password_successful_modal",
  APPROVE_TRANSACTION = "approve_transaction",
  CONFIRM_EXCHANGE = "confirm_exchange",
  CASH_SENT = "cash_sent",
  TRANSACTION_DETAILS = "transaction_details",
  TRANSACTION_CANCELLED = "transaction_cancelled",
  CREATE_ACCOUNT = "create_account",
}

export enum LocalStorage {
  TOKEN_INFO = "token_Info",
}

export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000"

export type ChainMap<T> = {
  readonly [id in ChainId]: T
}
export type ChainTokenList = ChainMap<Token[]>

export const TABLE_ROW_SIZE = 6

export const ONE_DAY_IN_MILLISECONDS = 86400000
