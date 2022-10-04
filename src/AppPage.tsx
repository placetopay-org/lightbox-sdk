import { LightboxApp } from '@placetopay/lightbox-sdk';
import { useEffect, useState } from 'react';

const AppPage = () => {
    const [isInside, setIsInside] = useState(false);

    useEffect(() => {
        setIsInside(LightboxApp.isInside());
    }, []);

    return (
        <div style={{ backgroundColor: '#fff' }}>
            <h1>App</h1>
            <h2>PlacetoPay | Lightbox SDK</h2>
            <hr />
            <h4>Is it inside a lightbox?: {isInside ? 'yes' : 'no'}</h4>
            <hr />
            <button onClick={() => LightboxApp.sendStyles({ background: { color: '#ff0' }, rounded: 99 })}>
                request styles
            </button>
            <button onClick={() => LightboxApp.hideCloseButton()}>hide close button</button>
            <hr />
            <pre>{'{ type: "close", data: "data" }'}</pre>
            <button
                onClick={() => {
                    LightboxApp.emit('close', 'data').close();
                }}
            >
                Emit and close
            </button>
            <hr />
            <h2>Custom close</h2>
            <label htmlFor="type">type</label>
            <input id="type" type="text" />
            <br />
            <label htmlFor="data">data</label>
            <input id="data" type="text" />
            <br />
            <button
                onClick={() => {
                    LightboxApp.emit(
                        (document.getElementById('type') as HTMLInputElement).value,
                        (document.getElementById('data') as HTMLInputElement).value
                    );
                }}
            >
                Emit
            </button>
            <button
                onClick={() => {
                    LightboxApp.close();
                }}
            >
                Close
            </button>
            <button
                onClick={() => {
                    LightboxApp.close('https://www.google.com');
                }}
            >
                Close and redirect to google
            </button>
        </div>
    );
};

export default AppPage;
