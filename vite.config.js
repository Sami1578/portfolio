import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
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
