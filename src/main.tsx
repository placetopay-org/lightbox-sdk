import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { handyman, viewport } from './helpers';
import '@placetopay/lightbox-sdk/dist/css/styles.css';

viewport.turnOnDynamicViewport();
const [root, page] = handyman.selectReactRoot();
ReactDOM.createRoot(root).render(<React.StrictMode>{page}</React.StrictMode>);
