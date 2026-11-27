import { Link } from 'react-router-dom';
import './Brand.css';
export function Brand() {
  return (
    <Link className="brand" to="/" aria-label="PULSO — Inicio">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 40 48" focusable="false">
          <path
            d="M6 43V5h17c9 0 14 5 14 13s-5 13-14 13h-7v12H6zm10-22h7c3 0 4-1 4-3s-1-3-4-3h-7v6z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="brand-name">
        PULSO<span>SPORT</span>
      </span>
    </Link>
  );
}
