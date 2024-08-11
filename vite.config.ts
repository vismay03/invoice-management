import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react-swc'
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';



export default defineConfig({
    plugins: [
        laravel({
            input: [ 'resources/app/styles/index.scss',
                    'resources/app/index.tsx'],
            refresh: true,

            postcss: [
                tailwindcss(),
                autoprefixer(),
            ],

        }),
        react()
    ],
    css: {
        preprocessorOptions: {
            scss: {},
        },
    },
    resolve: {
        alias: {
            "@": "/resources/app",
        },
    },

   
});
