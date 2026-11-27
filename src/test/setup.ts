import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Emula APIs de plataforma ausentes en jsdom; no reemplaza la revisión visual.
Object.defineProperty(window, 'matchMedia', {
  value: vi
    .fn()
    .mockImplementation(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
});
window.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();
HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute('open', '');
};
HTMLDialogElement.prototype.close = function () {
  this.removeAttribute('open');
};
afterEach(() => {
  cleanup();
  localStorage.clear();
});
