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
            { text: 'Docs', link: '/getting-started' },
            {
                text: 'Playground',
                link: '/playground',
            },
            {
                text: 'Api reference',
                link: '/api-reference',
            },
        ],

        sidebar: [
            {
                text: 'Guide',
                collapsed: false,
                items: [
                    { text: 'Getting started', link: '/getting-started' },
                    { text: 'Use without installation', link: '/use-without-installation' },
                ],
            },
            { text: 'Contributing', link: '/contributing' },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/placetopay-org/lightbox-sdk' }],
    },
});
