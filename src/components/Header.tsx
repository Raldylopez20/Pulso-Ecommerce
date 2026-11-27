import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, Search, ShoppingBag, Heart, X } from 'lucide-react';
import { Brand } from './Brand';
import { usePreferences } from '../app/Preferences';
import { useCart } from '../features/cart/CartContext';
import './Header.css';

export function Header() {
  const { t, language, currency, setLanguage, setCurrency } = usePreferences();
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setMenu(false);
  }, [location]);
  return (
    <>
      <div className="announcement">
        <span>{t('Tu próximo nivel empieza contigo.', 'Your next level starts with you.')}</span>
        <Link to="/shop">
          {t('Descubre la colección', 'Discover the collection')} <ArrowUpRight size={12} />
        </Link>
      </div>
      <header className="site-header">
        <Brand />
        <nav className="desktop-nav" aria-label={t('Navegación principal', 'Main navigation')}>
          <NavLink to="/shop">{t('Tienda', 'Shop')}</NavLink>
          <NavLink className="showroom-nav" to="/showroom">
            Showroom
            <span className="new-dot" />
          </NavLink>
          <div className="nav-dropdown">
            <button type="button">
              {t('Categorías', 'Categories')} <span>⌄</span>
            </button>
            <div className="nav-dropdown-content">
              <Link to="/shop?category=shirts">T-shirts</Link>
              <Link to="/shop?category=tanks">{t('Franelas', 'Tank tops')}</Link>
              <Link to="/shop?category=shorts">Shorts</Link>
              <Link to="/shop?category=pants">{t('Pantalones', 'Track pants')}</Link>
              <Link to="/shop?category=joggers">Joggers</Link>
            </div>
          </div>
          <div className="nav-dropdown">
            <button type="button">
              {t('Disciplinas', 'Disciplines')} <span>⌄</span>
            </button>
            <div className="nav-dropdown-content">
              <Link to="/shop?activity=training">{t('Entrenamiento', 'Training')}</Link>
              <Link to="/shop?activity=running">Running</Link>
              <Link to="/shop?activity=everyday">{t('Día a día', 'Everyday')}</Link>
            </div>
          </div>
          <NavLink to="/about">{t('Nuestra esencia', 'Our story')}</NavLink>
        </nav>
        <div className="header-actions">
          <div className="preferences">
            <select
              aria-label={t('Idioma', 'Language')}
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'es' | 'en')}
            >
              <option value="es">ES</option>
              <option value="en">EN</option>
            </select>
            <select
              aria-label={t('Moneda', 'Currency')}
              value={currency}
              onChange={(e) => setCurrency(e.target.value as 'DOP' | 'USD')}
            >
              <option value="DOP">RD$</option>
              <option value="USD">US$</option>
            </select>
          </div>
          <Link
            className="icon-button favorites-link"
            to="/shop?favorites=1"
            aria-label={t('Ver favoritos', 'View favorites')}
          >
            <Heart size={19} />
          </Link>
          <Link
            className="icon-button search-link"
            to="/shop?search=1"
            aria-label={t('Buscar prendas', 'Search products')}
          >
            <Search size={20} />
          </Link>
          <button
            className="icon-button cart-trigger"
            onClick={() => setOpen(true)}
            aria-label={t(`Abrir bolsa, ${count} prendas`, `Open bag, ${count} items`)}
          >
            <ShoppingBag size={20} />
            <span>{count}</span>
          </button>
          <button
            className="icon-button menu-trigger"
            onClick={() => setMenu(!menu)}
            aria-label={t('Menú', 'Menu')}
            aria-expanded={menu}
            aria-controls="mobile-nav"
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        {menu && (
          <nav
            className="mobile-nav"
            id="mobile-nav"
            aria-label={t('Navegación móvil', 'Mobile navigation')}
          >
            <Link to="/shop">{t('Tienda', 'Shop')}</Link>
            <Link to="/showroom">
              Showroom <ArrowUpRight />
            </Link>
            <Link to="/shop?category=shorts">Shorts</Link>
            <Link to="/shop?category=shirts">T-shirts</Link>
            <Link to="/shop?category=tanks">{t('Franelas', 'Tank tops')}</Link>
            <Link to="/shop?category=pants">{t('Pantalones', 'Track pants')}</Link>
            <Link to="/shop?category=joggers">Joggers</Link>
            <Link to="/shop?favorites=1">{t('Favoritos', 'Favorites')}</Link>
            <Link to="/shop?activity=training">{t('Entrenamiento', 'Training')}</Link>
            <Link to="/shop?activity=running">Running</Link>
            <Link to="/about">{t('Nuestra esencia', 'Our story')}</Link>
          </nav>
        )}
      </header>
    </>
  );
}
