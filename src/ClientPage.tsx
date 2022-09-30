import React from 'react';
import { LightboxClient } from './lib/core/index';
import './lib/styles/styles.css';

const ClientPage = () => {
    const lightboxInstance = LightboxClient.init(`${window.location.origin}/src/appPage.html`);
    lightboxInstance.callbacks.onClose = (data) => {
        console.log('cerrado', data);
    };
    // delete lightboxInstance.callbacks.onClose;
    return (
        <div style={{ backgroundColor: '#fff' }}>
            <h1>Client | Lightbox SDK</h1>
            <h2>Example</h2>
            <button
                onClick={() =>
                    LightboxClient.init(`${window.location.origin}/src/appPage.html`, {
                        dispatch: true,
                        callbacks: {
                            close: (data) => {
                                console.log('cerrado', data);
                            },
                        },
                        styles: {
                            background: {
                                color: '#f00',
                            },
                            rounded: 16,
                            height: 500,
                            width: 800,
                            dimension: 'lg',
                        },
                    })
                }
            >
                Open (custom styles)
            </button>
            <br />
            <button onClick={() => lightboxInstance.open()}>Open (async + default styles)</button>
            <h2>Custom</h2>
            <input id="inputUrl" type="text" placeholder="url" />
            <button
                onClick={() =>
                    LightboxClient.init((document.getElementById('inputUrl') as HTMLInputElement).value, {
                        dispatch: true,
                        callbacks: {
                            onClose: (data) => {
                                console.log('cerrado', data);
                            },
                        },
                    })
                }
            >
                Open
            </button>
        </div>
    );
};

export default ClientPage;
