# Combinador del showroom

La prueba aprobada se integra con tres prendas superiores y dos inferiores:
camiseta negra, camiseta blanca y muestra gris sin mangas; short negro y jogger negro.
Son seis fotografías completas, no capas ni generación durante la navegación.
Los siete looks anteriores se conservan; cuatro nuevas fotos llevan el total a once.

`outfitCombinations.ts` resuelve cada pareja a su look. `OutfitPicker.tsx` permite
cambiar una pieza conservando la otra. Las prendas fuera de esta selección siguen
disponibles como looks completos; para ampliarla hay que preparar las fotos faltantes.

La muestra gris procede de la referencia enviada por el usuario, con su emblema visible.
Está identificada como producto demo con importe ficticio; no acredita disponibilidad
comercial ni una relación con la marca de referencia.

## Imágenes

Originales conservados en `source-assets/images/mix-*.png`; copias WebP optimizadas
en `public/images`. Las cuatro imágenes se generaron con la herramienta ImageGen.
Los looks 01 y 07 completan la matriz de seis. La lámina comparativa no se recortó
para la web: se prepararon fotografías individuales para mantener resolución y encuadre.

Instrucción de las nuevas variantes: conservar identidad, pose, manos, reloj, cámara,
fondo e iluminación del look base y sustituir únicamente la camiseta por la referencia.
Blanca/short: look 01 como base y camiseta de look 07.
Negra/jogger: look 07 como base y camiseta de look 01.
Gris/short: prueba previamente aprobada por el usuario.
Gris/jogger: look 07 como base y camiseta de la prueba gris/short.

La IA puede introducir pequeñas diferencias de pliegues, pose o anatomía. La
compilación y las comprobaciones de datos no sustituyen la revisión visual del usuario.
