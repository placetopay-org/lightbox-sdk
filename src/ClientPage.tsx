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
            <button
                onClick={() =>
                    LightboxClient.init(`${window.location.origin}/src/appPage.html`, {
                        dispatch: true,
                        callbacks: {
                            onClose: (data) => {
                                console.log('cerrado', data);
                            },
                        },
                    })
                }
            >
                Open Example
            </button>
            <button onClick={() => lightboxInstance.open()}>Open Example async</button>
            <br />
            <br />
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
