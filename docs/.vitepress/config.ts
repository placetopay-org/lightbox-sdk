import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'en-US',
    title: 'Lightbox SDK',
    base: '/lightbox-sdk/',
    description: 'Manage iframes in an Easy Way',
    appearance: 'dark',
    cleanUrls: true,
    head: [['link', { rel: 'icon', href: '/lightbox-sdk/favicon.ico' }]],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/favicon.ico',

        nav: [
            { text: 'Home', link: '/what-is-lightbox-sdk' },
            { text: 'Example Page', link: '/example-page' },
        ],

        sidebar: [
            {
                text: 'Guide',
                collapsed: false,
                items: [
                    { text: 'What is Lightbox SDK?', link: '/what-is-lightbox-sdk' },
                    { text: 'Getting started', link: '/getting-started' },
                ],
            },
            {
                text: 'Playground',
                link: '/playground',
            },
            {
                text: 'Api reference',
                link: '/api-reference',
            },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/placetopay-org/lightbox-sdk' }],
    },
});
