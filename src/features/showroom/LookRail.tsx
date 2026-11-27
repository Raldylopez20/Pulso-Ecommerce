import type { Look } from '../../types/catalog';
import { usePreferences } from '../../app/Preferences';
import './LookRail.css';
export function LookRail({
  looks,
  selected,
  onSelect,
}: {
  looks: Look[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  const { t } = usePreferences();
  return (
    <div className="look-rail">
      <span className="look-rail-title">{t('Elige tu look', 'Choose your look')}</span>
      <div className="look-rail-options">
        {looks.map((look) => (
          <button
            key={look.id}
            aria-label={`${t('Elegir look', 'Choose look')} ${look.id}: ${look.name}`}
            aria-pressed={selected === look.id}
            onClick={(event) => {
              onSelect(look.id);
              event.currentTarget.scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
                behavior: 'instant',
              });
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/${look.image}.webp`}
              alt=""
              loading="lazy"
            />
            <span>
              {look.id}
              <small>{look.name}</small>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
