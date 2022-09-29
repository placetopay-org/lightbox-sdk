import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        open: '/src/clientPage.html',
    },
    plugins: [react()],
});
