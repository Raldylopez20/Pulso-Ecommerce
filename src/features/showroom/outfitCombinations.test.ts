import { describe, expect, it } from 'vitest';
import { findCombination, outfitTops, outfitBottoms } from './outfitCombinations';

describe('Combinaciones preparadas del showroom', () => {
  it('cada selección conserva ambas prendas y tiene una imagen propia', () => {
    const images = new Set<string>();
    for (const top of outfitTops) {
      for (const bottom of outfitBottoms) {
        const look = findCombination(top, bottom);
        expect(look?.products).toEqual([top, bottom]);
        expect(look?.image).toBeTruthy();
        images.add(look!.image);
      }
    }
    expect(images.size).toBe(6);
  });

  it('no inventa imágenes para prendas fuera de la colección combinable', () => {
    expect(findCombination('motion-tank', 'rest-jogger')).toBeUndefined();
    expect(findCombination('core-tee', 'track-pant')).toBeUndefined();
  });
});
