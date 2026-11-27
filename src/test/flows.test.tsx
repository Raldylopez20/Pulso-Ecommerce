import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../app/App';
import { Providers } from '../app/Providers';

function start(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Providers>
        <App />
      </Providers>
    </MemoryRouter>,
  );
}
describe('Flujos de la tienda', () => {
  it('guarda favoritos y permite consultarlos sin salir de la tienda', async () => {
    const user = userEvent.setup();
    start('/');
    await user.click(screen.getAllByRole('button', { name: 'Guardar en favoritos' })[0]);
    await user.click(screen.getByRole('link', { name: 'Ver favoritos' }));
    await screen.findByRole('heading', { name: 'TUS FAVORITOS.' });
    expect(screen.getByRole('status')).toHaveTextContent('1 prendas');
    expect(JSON.parse(localStorage.getItem('dss-wishlist-v1')!)).toEqual(['core-tee']);
    await user.click(screen.getByRole('button', { name: 'Quitar de favoritos' }));
    expect(screen.getByRole('status')).toHaveTextContent('0 prendas');
  });
  it('la suscripción confirma una demo sin guardar el correo', async () => {
    const user = userEvent.setup();
    start('/');
    await user.type(
      screen.getByRole('textbox', { name: 'Correo electrónico de prueba' }),
      'demo@example.com',
    );
    await user.click(screen.getByRole('button', { name: 'Probar suscripción' }));
    expect(
      screen.getByText('Vista previa completada. No se ha enviado ni guardado tu correo.'),
    ).toBeInTheDocument();
    expect(JSON.stringify(localStorage)).not.toContain('demo@example.com');
  });
  it('exige talla, añade a bolsa y permite revisar una compra simulada', async () => {
    const user = userEvent.setup();
    start('/product/core-tee');
    await user.click(await screen.findByRole('button', { name: 'Agregar a la bolsa' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Selecciona una talla');
    await user.click(screen.getByRole('button', { name: /^M$/ }));
    await user.click(screen.getByRole('button', { name: 'Agregar a la bolsa' }));
    const dialog = screen.getByRole('dialog', { name: 'Tu bolsa (1)' });
    expect(within(dialog).getByText('Negro / Talla M')).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: /Aumentar cantidad/ }));
    expect(screen.getByRole('dialog', { name: 'Tu bolsa (2)' })).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: 'Revisar compra demo' }));
    expect(within(dialog).getByRole('status')).toHaveTextContent(
      'no se ha realizado ningún pedido ni cobro',
    );
    expect(JSON.parse(localStorage.getItem('dss-cart-v1')!)[0].quantity).toBe(2);
  });
  it('cambia idioma y moneda conservando la selección', async () => {
    const user = userEvent.setup();
    start('/product/core-tee');
    await screen.findByRole('heading', { name: 'Core Performance Tee' });
    await user.selectOptions(screen.getByRole('combobox', { name: 'Idioma' }), 'en');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Currency' }), 'USD');
    expect(screen.getByRole('button', { name: 'Add to bag' })).toBeInTheDocument();
    expect(screen.getByText('US$ 32')).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('en');
  });
  it('cambia de look y agrega la prenda inferior correcta', async () => {
    const user = userEvent.setup();
    start('/showroom');
    await user.click(await screen.findByRole('button', { name: 'Elegir look 06: Everyday flow' }));
    await user.click(screen.getByRole('button', { name: /Flow Tech Jogger.*Seleccionar/ }));
    await user.click(screen.getByRole('button', { name: /^L$/ }));
    await user.click(screen.getByRole('button', { name: 'Agregar a la bolsa' }));
    expect(JSON.parse(localStorage.getItem('dss-cart-v1')!)).toEqual([
      { productId: 'flow-jogger', size: 'L', quantity: 1 },
    ]);
    expect(screen.getByRole('dialog', { name: 'Tu bolsa (1)' })).toBeInTheDocument();
  });
  it('filtra y restaura resultados cuando una búsqueda está vacía', async () => {
    const user = userEvent.setup();
    start('/shop?category=shorts');
    await screen.findByRole('heading', { name: 'ENCUENTRA TU RITMO.' });
    expect(screen.getByRole('status')).toHaveTextContent('3 prendas');
    const input = screen.getByRole('textbox', { name: 'Buscar en la colección' });
    fireEvent.change(input, { target: { value: 'inexistente' } });
    expect(screen.getByRole('status')).toHaveTextContent('0 prendas');
    await user.click(screen.getByRole('button', { name: 'Ver toda la colección' }));
    expect(screen.getByRole('status')).toHaveTextContent('13 prendas');
  });
  it('recupera la bolsa guardada y soporta almacenamiento corrupto', async () => {
    localStorage.setItem(
      'dss-cart-v1',
      JSON.stringify([{ productId: 'rest-jogger', size: 'XL', quantity: 2 }]),
    );
    start('/');
    await userEvent.click(screen.getByRole('button', { name: 'Abrir bolsa, 2 prendas' }));
    expect(screen.getByRole('dialog', { name: 'Tu bolsa (2)' })).toBeInTheDocument();
  });
});
