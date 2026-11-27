import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Rutas relativas para publicar también dentro de una carpeta de DevStudio.
export default defineConfig({ plugins: [react()], base: './' });
