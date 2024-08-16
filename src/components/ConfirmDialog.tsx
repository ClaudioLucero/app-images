import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 z-40" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg z-50">
        <Dialog.Title className="text-lg font-semibold">
          Eliminar favorito
        </Dialog.Title>
        <Dialog.Description className="mt-2 text-gray-700">
          ¿Estás seguro de que deseas eliminar este favorito?
        </Dialog.Description>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Detener la propagación del evento
              onCancel();
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            No
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Detener la propagación del evento
              onConfirm();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Sí
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ConfirmationDialog;
