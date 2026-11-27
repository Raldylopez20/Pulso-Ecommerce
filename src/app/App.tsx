import { lazy, Suspense, useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../features/cart/CartDrawer';
import { BackToTop } from '../components/BackToTop';
import { usePreferences } from './Preferences';
import Home from '../pages/Home';

// La experiencia del showroom y las fichas se cargan cuando se visitan.
const Shop = lazy(() => import('../pages/Shop'));
const Product = lazy(() => import('../pages/Product'));
const Showroom = lazy(() => import('../pages/Showroom'));
const About = lazy(() => import('../pages/About'));

export default function App() {
  const location = useLocation();
  const { t } = usePreferences();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    document.title = `${location.pathname === '/showroom' ? 'Showroom' : location.pathname === '/shop' ? t('Colección', 'Collection') : t('Hecho para moverte', 'Made to move')} — PULSO`;
  }, [location.pathname, t]);
  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('main')?.focus();
        }}
      >
        {t('Saltar al contenido', 'Skip to content')}
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense
          fallback={
            <div className="page-loading">
              {t('Preparando tu próxima sesión…', 'Preparing your next session…')}
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<Product key={location.pathname} />} />
            <Route path="/showroom" element={<Showroom />} />
            <Route path="/about" element={<About />} />
            <Route
              path="*"
              element={
                <div className="empty-state">
                  <h1>{t('Aquí empieza otro camino.', 'A new path starts here.')}</h1>
                  <Link className="button" to="/shop">
                    {t('Volver a la colección', 'Back to the collection')}
                  </Link>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>
      {location.pathname !== '/showroom' && <Footer />}
      <CartDrawer />
      <BackToTop />
    </>
  );
}
