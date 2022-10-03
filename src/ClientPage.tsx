import { useState, useEffect } from 'react';
import { LightboxClient, LightboxInstance } from '@placetopay/lightbox-sdk';

const ClientPage = () => {
    const [customUrl, setCustomUrl] = useState<string>('');
    const [lightboxInstance, setLightboxInstance] = useState<LightboxInstance>(
        LightboxClient.init(`${window.location.origin}/appPage.html`)
    );

    useEffect(() => {
        setLightboxInstance((lightbox) => {
            lightbox.callbacks.close = (data) => {
                console.log('cerrado', data);
            };
            return lightbox;
        });
    }, []);

    return (
        <div style={{ backgroundColor: '#fff' }}>
            <h1>Client</h1>
            <h2>PlacetoPay | Lightbox SDK</h2>
            <hr />
            <button
                onClick={() =>
                    LightboxClient.init(`${window.location.origin}/appPage.html`, {
                        callbacks: {
                            close: (data) => {
                                console.log('cerrado', data);
                            },
                        },
                        closeButton: false,
                        styles: {
                            background: {
                                opacity: 0.9,
                            },
                            rounded: 16,
                            height: 500,
                            width: 800,
                            // dimension: 'sm',
                        },
                    }).open()
                }
            >
                Open (custom styles)
            </button>
            <hr />
            <button onClick={lightboxInstance.open}>Open (async + default styles)</button>
            <hr />
            <input type="text" placeholder="url" onChange={(e) => setCustomUrl(e.target.value)} />
            <button
                onClick={() =>
                    LightboxClient.init(customUrl, {
                        callbacks: {
                            close: (data) => {
                                console.log('cerrado', data);
                            },
                            custom: (data) => {
                                console.log('callback personalizado', data);
                            },
                        },
                    }).open()
                }
            >
                Open
            </button>
        </div>
    );
};

export default ClientPage;
