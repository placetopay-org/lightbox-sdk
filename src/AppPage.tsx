import React from 'react';
import { LightboxApp } from './lib/core/index';

const AppPage = () => {
    return (
        <div style={{ backgroundColor: '#fff' }}>
            <h1>App | Lightbox SDK</h1>
            <button
                onClick={() => {
                    LightboxApp.emit('onClose', 'data');
                }}
            >
                Close
            </button>
        </div>
    );
};

export default AppPage;
