import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { Check } from 'lucide-react';
import './Toast.css';

interface ToastItem {
  id: number;
  message: string;
}
interface ToastApi {
  show: (message: string) => void;
}

const Context = createContext<ToastApi | null>(null);
let seq = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const show = useCallback((message: string) => {
    const id = ++seq;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);
  return (
    <Context.Provider value={{ show }}>
      {children}
      <div className="toast-stack" aria-live="polite" aria-atomic="false">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            <Check size={14} />
            {t.message}
          </div>
        ))}
      </div>
    </Context.Provider>
  );
}

export function useToast() {
  const value = useContext(Context);
  if (!value) throw new Error('ToastProvider is required');
  return value;
}
