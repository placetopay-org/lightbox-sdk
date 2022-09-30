import React from 'react';
import ReactDOM from 'react-dom/client';
import ClientPage from './ClientPage';
import AppPage from './AppPage';
import '@placetopay/lightbox-sdk/dist/styles/styles.css';

const client = document.getElementById('clientRoot') as HTMLElement;
const app = document.getElementById('appRoot') as HTMLElement;

let root;
let page;

if (client) {
    root = client;
    page = <ClientPage />;
} else if (app) {
    root = app;
    page = <AppPage />;
}

if (root) ReactDOM.createRoot(root).render(<React.StrictMode>{page}</React.StrictMode>);
