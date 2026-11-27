import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, MoveUpRight } from 'lucide-react';
import { usePreferences } from '../app/Preferences';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useEntrance } from '../animations/useEntrance';
import './Home.css';
import { Newsletter } from '../components/Newsletter';

export default function Home() {
  const { t } = usePreferences();
  const hero = useRef<HTMLElement>(null);
  useEntrance(hero);
  return (
    <>
      <section className="hero" ref={hero}>
        <img
          className="hero-photo"
          src={`${import.meta.env.BASE_URL}images/campaign-hero.webp`}
          alt={t(
            'Atleta PULSO con camiseta técnica negra',
            'PULSO athlete in a black performance tee',
          )}
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="hero-kicker" data-enter>
            PULSO / {t('Colección esencial', 'Essential collection')}
          </p>
          <h1 className="display" data-enter>
            {t('NO HAY', 'THERE ARE')}
            <br />
            {t('LÍMITES.', 'NO LIMITS.')}
          </h1>
          <p className="hero-description" data-enter>
            {t(
              'Solo tú. Tu ritmo. Tu siguiente versión.',
              'Just you. Your pace. Your next version.',
            )}
          </p>
          <div className="hero-buttons" data-enter>
            <Link className="button button--light" to="/shop">
              {t('Explorar colección', 'Explore collection')} <ArrowUpRight size={18} />
            </Link>
            <Link className="hero-showroom-link" to="/showroom">
              {t('Entrar al showroom', 'Enter the showroom')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="hero-bottom">
          <span>{t('Diseñado para tu movimiento.', 'Designed for your movement.')}</span>
          <button
            onClick={() =>
              document
                .getElementById('essentials')
                ?.scrollIntoView({
                  behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'instant'
                    : 'smooth',
                })
            }
            aria-label={t('Ver prendas esenciales', 'View essentials')}
          >
            <ArrowDown size={17} />
          </button>
          <span>TRAIN. MOVE. REPEAT.</span>
        </div>
      </section>
      <div className="brand-strip" aria-hidden="true">
        <div className="strip-track">
          {[0, 1].map((copy) => (
            <span key={copy} className="strip-set" aria-hidden={copy > 0 ? true : undefined}>
              <span>{t('MÁS QUE ROPA. UNA MENTALIDAD.', 'MORE THAN CLOTHING. A MINDSET.')}</span>
              <span className="strip-symbol">✳</span>
              <span>{t('HECHO PARA MOVERTE', 'MADE TO MOVE')}</span>
              <span className="strip-symbol">✳</span>
              <span>PULSO</span>
              <span className="strip-symbol">✳</span>
              <span>{t('A TU PROPIO RITMO', 'AT YOUR OWN PACE')}</span>
              <span className="strip-symbol">✳</span>
            </span>
          ))}
        </div>
      </div>
      <section className="section" id="essentials">
        <div className="section-heading">
          <div>
            <h2 className="display">{t('TUS NUEVOS ESENCIALES', 'YOUR NEW ESSENTIALS')}</h2>
            <p>
              {t(
                'Las prendas que no se quedan en el armario.',
                'The pieces that never stay in your wardrobe.',
              )}
            </p>
          </div>
          <Link className="text-link" to="/shop">
            {t('Ver todo', 'View all')} <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="product-grid">
          {products
            .filter((p) => p.featured)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>
      <section
        className="category-section"
        aria-label={t('Comprar por categoría', 'Shop by category')}
      >
        <Link className="category-tile" to="/shop?category=shirts">
          <img
            src={`${import.meta.env.BASE_URL}images/look-03.webp`}
            alt={t('Camiseta oversized gris carbón', 'Charcoal oversized tee')}
            loading="lazy"
          />
          <div>
            <span>{t('Para cada repetición', 'For every rep')}</span>
            <h2 className="display">T-SHIRTS</h2>
            <span className="category-cta">
              {t('Encuentra la tuya', 'Find yours')} <ArrowUpRight />
            </span>
          </div>
        </Link>
        <Link className="category-tile category-tile--shorts" to="/shop?category=shorts">
          <img
            src={`${import.meta.env.BASE_URL}images/look-02.webp`}
            alt={t('Shorts técnicos de running', 'Technical running shorts')}
            loading="lazy"
          />
          <div>
            <span>{t('Libertad en movimiento', 'Freedom in motion')}</span>
            <h2 className="display">SHORTS</h2>
            <span className="category-cta">
              {t('Sigue tu ritmo', 'Find your pace')} <ArrowUpRight />
            </span>
          </div>
        </Link>
      </section>
      <section className="showroom-feature">
        <div className="showroom-feature-copy">
          <span className="feature-pill">
            {t('Una nueva forma de elegir', 'A new way to choose')}
          </span>
          <h2 className="display">
            {t('TU ESTILO.', 'YOUR STYLE.')}
            <br />
            {t('EN PRIMERA', 'FRONT AND')}
            <br />
            {t('PERSONA.', 'CENTER.')}
          </h2>
          <p>
            {t(
              'Entra, explora y encuentra tu próximo look. Descubre cómo se ven tus prendas favoritas antes de llevarlas a la bolsa.',
              'Step inside and find your next look. See your favorite pieces styled together before adding them to your bag.',
            )}
          </p>
          <Link className="button button--light" to="/showroom">
            {t('Descubrir el showroom', 'Discover the showroom')} <MoveUpRight size={18} />
          </Link>
          <span className="showroom-feature-caption">
            {t('7 looks. Tu próxima versión.', '7 looks. Your next version.')}
          </span>
        </div>
        <Link
          className="showroom-feature-visual"
          to="/showroom"
          aria-label={t('Explorar showroom', 'Explore showroom')}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/look-06.webp`}
            alt={t(
              'Look Core Tee y Flow Jogger en el showroom',
              'Core Tee and Flow Jogger look in the showroom',
            )}
            loading="lazy"
          />
          <div className="floating-tag">
            <span className="live-dot" />
            Flow Tech Jogger <ArrowUpRight size={15} />
          </div>
          <div className="showroom-preview-label">
            PULSO <span>SHOWROOM</span>
          </div>
        </Link>
      </section>
      <section className="manifesto section">
        <p>{t('La disciplina se lleva puesta.', 'Wear your discipline.')}</p>
        <h2 className="display">
          {t('NO SE TRATA DE SER EL MEJOR.', "IT'S NOT ABOUT BEING THE BEST.")}
          <br />
          {t('SE TRATA DE NO PARAR.', "IT'S ABOUT KEEPING GOING.")}
        </h2>
        <Link className="text-link" to="/about">
          {t('Conoce nuestra esencia', 'Discover our story')} <ArrowUpRight size={16} />
        </Link>
      </section>
      <Newsletter />
    </>
  );
}
