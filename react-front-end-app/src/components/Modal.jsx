import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

export default function Modal({
  isModalOpen,
  handleCloseModal,
  children,
  className = "",
}) {
  return (
    <div>
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        transition
        className="fixed inset-0 flex items-center justify-center bg-black/30 p-4 transition duration-300 ease-in-out data-closed:opacity-0"
      >
        <DialogBackdrop className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        {/* takes custom className if additional styles need to be applied */}
        <DialogPanel
          className={`relative z-50 border max-w-xl w-full max-h-[90vh] space-y-4 rounded-2xl bg-(--bg-surface)/95 p-6 mx-4 ${className}`}
        >
          {children}
        </DialogPanel>
      </Dialog>
    </div>
  );
}
