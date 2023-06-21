// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue';
import Theme from 'vitepress/theme';
import './style.css';

export default {
    ...Theme,
    Layout,
    enhanceApp({ app, router, siteData }) {
        // ...
    },
};
