# PULSO

Tienda deportiva conceptual para el portafolio de **DevStudio**, con showroom integrado. React + TypeScript + Vite, CSS por componente y animaciones GSAP. Español/inglés y RD$/US$.

## Abrir el proyecto

Requiere Node.js 22.12 o posterior (o una versión compatible con Vite 7).

```powershell
npm install
npm run dev
```

Abre la dirección local que imprime Vite (normalmente http://127.0.0.1:5173).

```powershell
npm test       # Pruebas de lógica y flujos de componentes en jsdom
npm run build # Comprobación TypeScript y producción
npm run preview
```

## Dónde editar cada cosa

| Carpeta / archivo         | Responsabilidad                                                         |
| ------------------------- | ----------------------------------------------------------------------- |
| `src/pages/`              | Inicio, catálogo, producto, showroom y marca. CSS separado.             |
| `src/components/`         | Cabecera, pie, tarjetas, imágenes, tallas y diálogos.                   |
| `src/data/products.ts`    | Los 12 productos, descripciones ES/EN, precios y referencias de imagen. |
| `src/data/looks.ts`       | Las 7 combinaciones del showroom.                                       |
| `src/data/activities.ts`  | Agrupación por disciplina.                                              |
| `src/features/cart/`      | Estado persistente, reglas de variantes y bolsa lateral.                |
| `src/features/catalog/`   | Búsqueda, filtros y orden del catálogo.                                 |
| `src/features/showroom/`  | Escenario y selector de looks.                                          |
| `src/app/Preferences.tsx` | Idioma, moneda y formato de precios.                                    |
| `src/animations/`         | Animaciones encapsuladas y movimiento reducido.                         |
| `src/styles/global.css`   | Tipografía, variables y utilidades compartidas.                         |
| `public/images/`          | 9 fotografías WebP utilizadas por la web.                               |
| `source-assets/images/`   | Originales PNG de las generaciones. No se publican en `dist`.           |
| `docs/image-prompts.json` | Prompts y trazabilidad de imágenes.                                     |

Los nombres de colección y prendas permanecen como nombres comerciales en inglés. El resto de la interfaz, descripciones y mensajes tiene traducción.

## Showroom reutilizable

`ShowroomStage` recibe el look, sus productos y callbacks de selección y navegación. `LookRail` recibe la lista y la selección. `pages/Showroom.tsx` conecta estos componentes con el catálogo, preferencias, rutas y carrito de esta tienda. Para integrarlo en otro proyecto, sustituir esa capa y conservar los estilos, imágenes y animación. Los componentes compartidos `ProductImage` y `Preferences` también son dependencias a adaptar.

No hay generación de fotos en vivo ni mezcla libre de prendas: cada look es una fotografía preparada. Elegir una tarjeta selecciona qué prenda comprar. La talla no altera la imagen.

## Publicar en DevStudio

`npm run build` genera `dist/`. Se puede alojar el contenido de esa carpeta en un hosting estático, incluso bajo una subcarpeta. Las rutas usan `#/shop`, `#/product/core-tee` y `#/showroom`, por lo que no requieren reescrituras del servidor. El archivo `release/pulso.zip`, cuando exista, contiene la versión compilada.

Sirve la carpeta por HTTP; no abras `index.html` directamente como `file://`. No es un tema Liquid instalable en Shopify. Una integración real requiere trabajo adicional.

## Límites de la demostración

- Sin pagos, pedidos, inventario, cuentas, envíos o suscripciones reales.
- Los precios y la guía de tallas son ficticios; cada moneda tiene importes propios, sin cambio en vivo.
- La bolsa y preferencias se guardan localmente en el navegador, con validación al recuperar los datos.
- Fotografías creadas con la herramienta integrada imagegen a partir de referencias autorizadas por el usuario. No se reutilizan fotos ni logos de Gymshark, Adidas o Acclaim.
- Las fotos son una representación generada; la identidad y los detalles de prendas deben revisarse antes de presentar como fotografía real de productos.

Consulta `docs/QA.md` para las verificaciones ejecutadas y las pendientes.
