import { Modal } from './Modal'

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
}

export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmText = '确定' }: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-5">{message}</p>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300">
          取消
        </button>
        <button onClick={() => { onConfirm(); onClose() }} className="flex-1 py-2.5 rounded-xl bg-klee-red text-white text-sm font-medium">
          {confirmText}
        </button>
      </div>
    </Modal>
  )
}
