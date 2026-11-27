import { usePreferences } from '../../app/Preferences';
import { ProductImage } from '../../components/ProductImage';
import { findProduct } from '../../data/products';
import type { Look } from '../../types/catalog';
import { findCombination, outfitTops, outfitBottoms } from './outfitCombinations';
import './OutfitPicker.css';

export function OutfitPicker({ look, onSelect }: { look: Look; onSelect: (id: string) => void }) {
  const { t } = usePreferences();
  const compatible = Boolean(findCombination(look.products[0], look.products[1]));

  // Conserva la otra prenda al cambiar una pieza. Desde un look no combinable,
  // inicia con la camiseta negra o el short de la colección combinable.
  const choose = (id: string, slot: number) => {
    const top = slot === 0 ? id : compatible ? look.products[0] : outfitTops[0];
    const bottom = slot === 1 ? id : compatible ? look.products[1] : outfitBottoms[0];
    const next = findCombination(top, bottom);
    if (next) onSelect(next.id);
  };

  return (
    <section className="outfit-picker" aria-labelledby="outfit-title">
      <div className="outfit-picker-intro">
        <span>{t('A TU MANERA', 'YOUR WAY')}</span>
        <h2 id="outfit-title">{t('Combina tu look', 'Build your look')}</h2>
        <p>
          {compatible
            ? t(
                'Cambia una pieza. Conserva la otra. Seis combinaciones para explorar.',
                'Change one piece. Keep the other. Six combinations to explore.',
              )
            : t(
                'Este look es un conjunto completo. Elige una pieza de abajo para entrar a la colección combinable.',
                'This look is a complete outfit. Choose a piece below to enter the mix-and-match collection.',
              )}
        </p>
      </div>
      {[outfitTops, outfitBottoms].map((ids, slot) => (
        <fieldset key={slot}>
          <legend>
            {slot === 0
              ? t('01 / Parte superior', '01 / Tops')
              : t('02 / Parte inferior', '02 / Bottoms')}
          </legend>
          <div className="outfit-options">
            {ids.map((id) => {
              const product = findProduct(id)!;
              const active = compatible && look.products[slot] === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(id, slot)}
                >
                  <div className="outfit-option-photo">
                    <ProductImage image={product.image} crop={product.crop} alt="" />
                  </div>
                  <span>{product.name}</span>
                  <small>{active ? t('Seleccionado', 'Selected') : t('Combinar', 'Combine')}</small>
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
    </section>
  );
}
