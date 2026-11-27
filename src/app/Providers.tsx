import type { ReactNode } from 'react';
import { PreferencesProvider } from './Preferences';
import { CartProvider } from '../features/cart/CartContext';
import { WishlistProvider } from '../features/wishlist/WishlistContext';
import { ToastProvider } from '../components/Toast';

// La aplicación y las pruebas comparten exactamente los mismos servicios.
export function Providers({ children }: { children: ReactNode }) {
  return (
    <PreferencesProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>{children}</ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </PreferencesProvider>
  );
}
