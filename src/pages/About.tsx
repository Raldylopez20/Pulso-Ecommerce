import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { usePreferences } from '../app/Preferences';
import './About.css';
export default function About() {
  const { t } = usePreferences();
  const [params] = useSearchParams();
  useEffect(() => {
    if (params.get('section') === 'faq') document.getElementById('faq')?.scrollIntoView();
  }, [params]);
  return (
    <>
      <section className="about-hero">
        <div>
          <p>PULSO</p>
          <h1 className="display">
            {t('EL MOVIMIENTO', 'MOVEMENT')}
            <br />
            {t('ES NUESTRA', 'IS OUR')}
            <br />
            {t('ESENCIA.', 'ESSENCE.')}
          </h1>
          <p>
            {t(
              'No importa dónde empiezas. Importa que sigas.',
              'It doesn’t matter where you start. It matters that you keep going.',
            )}
          </p>
        </div>
        <img
          src={`${import.meta.env.BASE_URL}images/campaign-hero.webp`}
          alt={t('Atleta en un espacio de entrenamiento', 'Athlete in a training space')}
        />
      </section>
      <section className="about-story section">
        <h2 className="display">{t('A TU MANERA.\nA TU RITMO.', 'YOUR WAY.\nYOUR PACE.')}</h2>
        <div>
          <p>
            {t(
              'PULSO nace de una idea sencilla: la ropa deportiva debe acompañarte, no distraerte. Siluetas limpias, una paleta esencial y prendas que puedes combinar sin pensarlo demasiado.',
              'PULSO starts with a simple idea: sportswear should support you, not distract you. Clean silhouettes, an essential palette and pieces you can combine without overthinking it.',
            )}
          </p>
          <p>
            {t(
              'Del entrenamiento de fuerza a tu próxima carrera. Del primer paso al último kilómetro. Esta colección celebra el hábito de moverte.',
              'From strength training to your next run. From the first step to the last mile. This collection celebrates the habit of moving.',
            )}
          </p>
          <Link className="text-link" to="/shop">
            {t('Explora la colección', 'Explore the collection')} <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
      <section className="faq-section section" id="faq">
        <h2 className="display">{t('ANTES DE EMPEZAR', 'BEFORE YOU START')}</h2>
        <div>
          {[
            [
              t('¿Puedo comprar las prendas?', 'Can I buy the pieces?'),
              t(
                'Esta es una tienda conceptual creada por DevStudio para mostrar una experiencia de e-commerce. Puedes explorar productos y preparar una bolsa, pero no se realizan compras, pagos ni envíos.',
                'This is a concept store created by DevStudio to showcase an e-commerce experience. You can explore products and prepare a bag, but no purchases, payments or deliveries take place.',
              ),
            ],
            [
              t('¿Cómo funciona el showroom?', 'How does the showroom work?'),
              t(
                'Elige un look o combina las prendas disponibles en «Combina tu look». Pulsa la tarjeta de una prenda, selecciona su talla y agrégala a la bolsa. Las imágenes muestran combinaciones preparadas; no representan una prueba de talla personalizada.',
                'Choose a look or mix the available pieces in Build your look. Select a garment card, choose its size and add it to your bag. Images show prepared combinations; they are not a personalized size fitting.',
              ),
            ],
            [
              t('¿Puedo cambiar de idioma y moneda?', 'Can I change the language and currency?'),
              t(
                'Sí. Usa los selectores ES/EN y RD$/US$ de la cabecera. Tu preferencia y tu bolsa se guardan en este navegador. Los precios son ficticios y están definidos por moneda.',
                'Yes. Use the ES/EN and RD$/US$ selectors in the header. Your preferences and bag are saved in this browser. Prices are fictional and defined for each currency.',
              ),
            ],
            [
              t(
                '¿Esta experiencia puede adaptarse a mi marca?',
                'Can this experience be adapted to my brand?',
              ),
              t(
                'Esta demo muestra cómo pueden convivir una tienda y un showroom. El catálogo, las imágenes y la identidad pueden adaptarse a otro proyecto. Una tienda operativa necesita integrar inventario, pedidos y pagos.',
                'This demo shows how a store and a showroom can work together. The catalog, imagery and identity can be adapted to another project. An operational store requires inventory, order and payment integrations.',
              ),
            ],
          ].map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
