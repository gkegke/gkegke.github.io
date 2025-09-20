import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Project root is now the default (where this config file is).
  // 'public' directory is also found from the project root by default.
  build: {
    // Output directory is 'dist' in the project root.
    outDir: 'dist',
  },
  base: './', // Important for relative paths in GitHub Pages deployment
  appType: 'spa',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
    }),
    react({
      // Use React plugin in all *.jsx and *.tsx files
      include: '**/*.{jsx,tsx}',
    }),
  ],
});