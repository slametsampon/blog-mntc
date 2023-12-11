import { Dialog } from '@headlessui/react'

export const ModalConfirm = ({
  isModalConfirmOpen,
  onCancel,
  onConfirm,
  title,
  description,
  content,
}) => {
  //setIsOpen(isModalConfirmOpen)
  const handleButtonCancel = (target) => {
    onCancel()
  }

  const handleButtonConfirm = (target) => {
    onConfirm()
  }

  return (
    <Dialog open={isModalConfirmOpen} onClose={handleButtonCancel}>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel>
          <div className="flex flex-col rounded-md bg-slate-50 px-6 shadow-xl">
            <Dialog.Title className="mb-4 mt-3 text-lg font-semibold">{title}</Dialog.Title>
            <Dialog.Description className="mb-4 mt-3 text-lg font-semibold text-red-500">
              {description}
            </Dialog.Description>

            <p>
              {content}{' '}
              <span className="font-semibold">
                All of this data will be permanently removed. This action cannot be undone.
              </span>
            </p>

            <div className="mb-6 mt-3 flex w-full flex-row justify-between rounded-2xl bg-blue-50 p-3 px-20 text-lg font-bold shadow-xl dark:bg-gray-900">
              <button
                id="buttonConfirm"
                onClick={handleButtonConfirm}
                className="rounded-full bg-green-700 p-2 px-3 text-white"
              >
                Confirm
              </button>
              <button
                id="buttonCancel"
                onClick={handleButtonCancel}
                className="rounded-full bg-red-700 p-2 px-3 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
