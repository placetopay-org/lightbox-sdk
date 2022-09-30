import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        open: '/src/clientPage.html',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/lib/core'),
        },
    },
    plugins: [react()],
});
