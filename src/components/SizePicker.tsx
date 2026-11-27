import { sizes, type Size } from '../types/catalog';
import { usePreferences } from '../app/Preferences';
import './SizePicker.css';
export function SizePicker({
  value,
  onChange,
}: {
  value: Size | null;
  onChange: (size: Size) => void;
}) {
  const { t } = usePreferences();
  return (
    <fieldset className="size-picker">
      <legend>{t('Selecciona tu talla', 'Select your size')}</legend>
      <div>
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            aria-pressed={value === size}
            onClick={() => onChange(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
