export default function Modal({
  message,
  title = "Notice",
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel", 
  showConfirm = true        
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-gray-800 text-white rounded-xl p-6 shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-red-500">{title}</h2>
        <p className="mb-6 text-gray-300">{message}</p>
        
        <div className="flex justify-end gap-2">
          {showConfirm && (
            <button
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg font-bold text-white cursor-pointer"
            >
              {confirmText}
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-400 px-4 py-2 rounded-lg font-bold text-white cursor-pointer"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
