import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { usePreferences } from '../app/Preferences';
import './Modal.css';

// El diálogo nativo gestiona foco, Escape y aislamiento del contenido de fondo.
export function Modal({
  open,
  onClose,
  title,
  children,
  className = '',
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const { t } = usePreferences();
  useEffect(() => {
    const dialog = ref.current;
    if (open) {
      dialog?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previous;
        dialog?.close();
      };
    }
    dialog?.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-label={title}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const box = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < box.left ||
            event.clientX > box.right ||
            event.clientY < box.top ||
            event.clientY > box.bottom
          )
            onClose();
        }
      }}
    >
      <div className="modal-heading">
        <h2>{title}</h2>
        <button className="icon-button" onClick={onClose} aria-label={t('Cerrar', 'Close')}>
          <X size={22} />
        </button>
      </div>
      {children}
    </dialog>
  );
}
