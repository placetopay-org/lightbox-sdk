import React from 'react';
import { LightboxApp } from './lib/core/index';

const AppPage = () => {
    return (
        <div style={{ backgroundColor: '#fff' }}>
            <h1>App | Lightbox SDK</h1>
            <h2>Close example</h2>
            <pre>{'{ type: "onClose", data: "data" }'}</pre>
            <button
                onClick={() => {
                    LightboxApp.emit('onClose', 'data');
                }}
            >
                Close
            </button>
            <hr />
            <h2>Custo close</h2>
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
        </div>
    );
};

export default AppPage;
