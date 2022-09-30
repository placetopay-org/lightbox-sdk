import { useState, useEffect } from 'react';
import { LightboxClient, LightboxInstance } from '@placetopay/lightbox-sdk';

const ClientPage = () => {
    const [customUrl, setCustomUrl] = useState<string>('');
    const [lightboxInstance, setLightboxInstance] = useState<LightboxInstance>(
        LightboxClient.init(`${window.location.origin}/appPage.html`)
    );

    const deleteLightboxInstanceCloseCallback = () => {
        setLightboxInstance((lightbox) => {
            delete lightbox.callbacks.close;
            return lightbox;
        });
    };

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
                                opacity: 1,
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

            <hr />
            <button onClick={lightboxInstance.open}>Open (async + default styles)</button>
            <button onClick={deleteLightboxInstanceCloseCallback}>Delete close callback</button>
            <hr />

            <h2>Custom</h2>
            <input type="text" placeholder="url" onChange={(e) => setCustomUrl(e.target.value)} />
            <button
                onClick={() =>
                    LightboxClient.init(customUrl, {
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
