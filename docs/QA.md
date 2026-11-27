# Verificación de la demo

## Revisión tras continuar con otra IA

Se conservaron favoritos, avisos, botón de volver arriba y la sección de novedades. Se corrigieron:

- Proveedores desactualizados en las pruebas: ahora `Providers.tsx` se comparte con la aplicación.
- Favoritos sin pantalla de consulta: acceso en cabecera y menú móvil, filtro `#/shop?favorites=1` y eliminación desde la colección guardada.
- Mensaje de suscripción que prometía correos reales: ahora declara la simulación y no almacena ni transmite correos.
- Etiqueta del botón de volver arriba sin traducir.
- Cabecera ampliada: navegación móvil desde 1150 px y favoritos dentro del menú en pantallas estrechas.
- Código antes comprimido en líneas largas: formato consistente con Prettier y newsletter extraída a su componente/CSS.

## Comprobaciones

Pruebas en Vitest + jsdom: carrito por talla, cantidades, recuperación de datos, filtros, coherencia de 12 productos/7 looks, cambio de idioma/moneda, producto a bolsa, showroom a bolsa, favoritos y formulario simulado. jsdom prueba el comportamiento de componentes, no el renderizado visual de un navegador.

Resultado final: 13 pruebas aprobadas en 3 archivos. TypeScript y compilación de producción aprobados. La carpeta `dist` y el ZIP de release deben regenerarse después de cambios de código.

## Pendiente de revisión visual

No se certifica la composición final en escritorio/móvil. La revisión nativa de Chrome se interrumpió con Escape físico del usuario. No se continuó controlando el navegador. Revisar portada, tarjetas, selector de looks, cabecera móvil, foco de diálogos y transiciones antes de publicar.

Los pagos, pedidos, envíos y suscripciones son simulados. El showroom muestra fotografías preparadas, sin IA en vivo ni ajuste corporal por talla.
