export type Language = 'es' | 'en';
export type Currency = 'DOP' | 'USD';
export type Localized = Record<Language, string>;
export type Category = 'shirts' | 'tanks' | 'shorts' | 'pants' | 'joggers';
export type Size = 'S' | 'M' | 'L' | 'XL';
export interface Product {
  id: string;
  name: string;
  category: Category;
  description: Localized;
  color: Localized;
  colorHex: string;
  price: Record<Currency, number>;
  image: string;
  crop: 'top' | 'bottom';
  fit: Localized;
  material: Localized;
  lookId: string;
  featured?: boolean;
}
export interface Look {
  id: string;
  name: string;
  image: string;
  products: string[];
}
export const sizes: Size[] = ['S', 'M', 'L', 'XL'];
