import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@placetopay/lightbox-sdk/dist/css/styles.css';
import { handyman, viewport } from './helpers';

viewport.turnOnDynamicViewport();
const [root, page] = handyman.selectReactRoot();
ReactDOM.createRoot(root).render(<React.StrictMode>{page}</React.StrictMode>);
