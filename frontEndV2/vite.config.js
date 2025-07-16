import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@shadcn': path.resolve(__dirname, './src/shadcn'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@store': path.resolve(__dirname, 'src/Redux/store/store.js'),
      '@slice': path.resolve(__dirname, 'src/Redux/Slice'),
      '@redux': path.resolve(__dirname, 'src/Redux'),
      '@api': path.resolve(__dirname, 'src/apis'),
      '@inputComponents': path.resolve(__dirname, 'src/components/InputComponents'),

      // Add more aliases as needed
    },
  },
});
