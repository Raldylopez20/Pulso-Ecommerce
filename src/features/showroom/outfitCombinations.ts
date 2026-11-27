import { looks } from '../../data/looks';

// Solo ofrecemos combinaciones que tienen una fotografía preparada.
// El resto del catálogo mantiene sus looks completos originales.
export const outfitTops = ['core-tee', 'essential-tee', 'reference-tank'];
export const outfitBottoms = ['training-short', 'rest-jogger'];

export function findCombination(top: string, bottom: string) {
  if (!outfitTops.includes(top) || !outfitBottoms.includes(bottom)) return undefined;
  return looks.find((look) => look.products[0] === top && look.products[1] === bottom);
}
