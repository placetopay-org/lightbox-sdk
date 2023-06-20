import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'Lightbox SDK',
  description: 'Manage iframes in an Easy Way',
  appearance: 'dark',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.ico',

    nav: [
      { text: 'Docs', link: '/what-is-lightbox-sdk', activeMatch: '/' },
      { text: 'Api', link: '/api' },
      { text: 'Playground', link: '/playground' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          { text: 'What is Lightbox SDK?', link: '/what-is-lightbox-sdk' },
          { text: 'Getting started', link: '/getting-started' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/placetopay-org/lightbox-sdk' }],
  },
});
