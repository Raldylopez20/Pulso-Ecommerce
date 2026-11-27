import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Brand } from './Brand';
import { usePreferences } from '../app/Preferences';
import './Footer.css';
export function Footer() {
  const { t } = usePreferences();
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Brand />
          <p>
            {t(
              'Para los que se mueven.\nPara los que van por más.',
              'For those who move.\nFor those who go further.',
            )}
          </p>
        </div>
        <div>
          <h3>{t('Explora', 'Explore')}</h3>
          <Link to="/shop">{t('Toda la colección', 'The collection')}</Link>
          <Link to="/showroom">
            Showroom <ArrowUpRight size={13} />
          </Link>
          <Link to="/about">{t('Nuestra esencia', 'Our story')}</Link>
        </div>
        <div>
          <h3>{t('Tu próxima sesión', 'Your next session')}</h3>
          <Link to="/shop?category=shorts">Shorts</Link>
          <Link to="/shop?category=shirts">T-shirts</Link>
          <Link to="/shop?category=joggers">Joggers</Link>
        </div>
        <div className="footer-note">
          <h3>{t('Hecho para moverte.', 'Made to move.')}</h3>
          <p>
            {t(
              'Una visión del deporte desde República Dominicana.',
              'A vision of sport from the Dominican Republic.',
            )}
          </p>
          <Link to="/about?section=faq">
            {t('Preguntas frecuentes', 'Frequently asked questions')}
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} PULSO</span>
        <span>
          {t('Tienda de demostración · Sin compras reales', 'Demo store · No real purchases')}
        </span>
        <span>
          {t('Diseñado por', 'Designed by')} <strong>DevStudio ↗</strong>
        </span>
      </div>
    </footer>
  );
}
