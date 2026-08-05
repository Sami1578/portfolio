import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        react({ jsxRuntime: 'automatic' }),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            ssr: 'resources/js/ssr.jsx', // <-- Make sure this line exists
            refresh: true,
        }),
        tailwindcss(),
    ],
    server: {
        host: 'localhost', // Forces Vite to use IPv4 localhost instead of [::1]
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
