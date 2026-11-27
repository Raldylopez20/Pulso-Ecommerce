import { createContext, useContext, useEffect, type ReactNode } from 'react';
import type { Currency, Language, Product } from '../types/catalog';
import { usePersistentState } from '../hooks/usePersistentState';

interface Preferences {
  language: Language;
  currency: Currency;
  setLanguage: (language: Language) => void;
  setCurrency: (currency: Currency) => void;
  t: (es: string, en: string) => string;
  money: (value: number) => string;
  price: (product: Product) => string;
}
const Context = createContext<Preferences | null>(null);
export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = usePersistentState<Language>(
    'dss-language-v1',
    'es',
    (v): v is Language => v === 'es' || v === 'en',
  );
  const [currency, setCurrency] = usePersistentState<Currency>(
    'dss-currency-v1',
    'DOP',
    (v): v is Currency => v === 'DOP' || v === 'USD',
  );
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  const money = (value: number) =>
    `${currency === 'DOP' ? 'RD$' : 'US$'} ${new Intl.NumberFormat(language === 'es' ? 'es-DO' : 'en-US', { maximumFractionDigits: 0 }).format(value)}`;
  return (
    <Context.Provider
      value={{
        language,
        currency,
        setLanguage,
        setCurrency,
        t: (es, en) => (language === 'es' ? es : en),
        money,
        price: (product) => money(product.price[currency]),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function usePreferences() {
  const context = useContext(Context);
  if (!context) throw new Error('PreferencesProvider is required');
  return context;
}
