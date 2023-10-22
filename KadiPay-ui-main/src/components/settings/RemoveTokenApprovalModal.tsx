import React from "react"
import { useModal } from "../../hooks"
import { Modals } from "../../utils/constants"
import { WalletConfirmation } from "../general"
import Modal from "../general/Modal"

export default function RemoveTokenApprovalModal() {
  const { hideModal } = useModal(Modals.REMOVE_TOKEN_APPROVAL)
  return (
    <Modal
      name={Modals.REMOVE_TOKEN_APPROVAL}
      bodyClassNames="!mt-[19vh] !lg:max-w-[392px] border border-primary/[.25] rounded-2xl !py-[23px] !px-5"
    >
      <WalletConfirmation
        header="Revoking"
        buttonText="Close"
        onClose={hideModal}
      />
    </Modal>
  )
}
