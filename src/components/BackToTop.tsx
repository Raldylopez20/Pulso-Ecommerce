import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { usePreferences } from '../app/Preferences';
import './BackToTop.css';

export function BackToTop() {
  const { t } = usePreferences();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      className="back-to-top"
      aria-label={t('Volver arriba', 'Back to top')}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        })
      }
    >
      <ArrowUp size={16} />
    </button>
  );
}
