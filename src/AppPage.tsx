import { LightboxApp } from '@placetopay/lightbox-sdk';

const AppPage = () => {
    return (
        <div style={{ backgroundColor: '#fff' }}>
            <h1>App</h1>
            <h2>PlacetoPay | Lightbox SDK</h2>
            <hr />
            <button onClick={() => LightboxApp.sendStyles({ background: { color: '#ff0' }, rounded: 99 })}>
                request styles
            </button>
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
        </div>
    );
};

export default AppPage;
