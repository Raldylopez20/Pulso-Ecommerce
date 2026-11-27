import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { usePreferences } from '../app/Preferences';
import './Newsletter.css';

// Demuestra la interfaz sin transmitir ni conservar direcciones de correo.
export function Newsletter() {
  const { t } = usePreferences();
  const [emailSent, setEmailSent] = useState(false);
  return (
    <section className="newsletter-section">
      <div className="newsletter-inner">
        <div className="newsletter-copy">
          <p className="newsletter-kicker">PULSO</p>
          <h2 className="display">
            {t('ENTRENA.', 'TRAIN.')}
            <br />
            {t('RECIBE.', 'GET.')}
            <br />
            {t('REPITE.', 'REPEAT.')}
          </h2>
          <p>
            {t(
              'Novedades, lanzamientos y momentos que te empujan a seguir.',
              'New arrivals, launches and moments that keep you going.',
            )}
          </p>
        </div>
        {emailSent ? (
          <div className="newsletter-thanks">
            <ArrowRight size={20} />
            <p>
              {t(
                'Vista previa completada. No se ha enviado ni guardado tu correo.',
                'Preview complete. Your email has not been sent or saved.',
              )}
            </p>
          </div>
        ) : (
          <form
            aria-label={t('Suscripción de demostración', 'Demo subscription')}
            className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              setEmailSent(true);
            }}
          >
            <input
              aria-label={t('Correo electrónico de prueba', 'Demo email address')}
              type="email"
              required
              placeholder={t('Tu correo electrónico', 'Your email address')}
            />
            <button type="submit" className="button">
              {t('Probar suscripción', 'Preview signup')} <ArrowUpRight size={16} />
            </button>
            <small>
              {t(
                'Demostración: no enviamos ni guardamos correos.',
                'Demo: no emails are sent or stored.',
              )}
            </small>
          </form>
        )}
      </div>
    </section>
  );
}
