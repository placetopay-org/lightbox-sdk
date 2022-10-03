import { LightboxAppEvents } from '../constants';
import { LightboxStyles } from '../types';

export const LightboxApp = {
    close: () => {
        globalThis.parent.postMessage({ type: LightboxAppEvents.CLOSE }, '*');
    },
    emit: (type: string, payload: unknown) => {
        globalThis.parent.postMessage({ type: LightboxAppEvents.EMIT, payload: { type, payload } }, '*');
        return { close: LightboxApp.close };
    },
    sendStyles: (styles: LightboxStyles) => {
        globalThis.parent.postMessage({ type: LightboxAppEvents.SEND_STYLES, payload: styles }, '*');
    },
    hideCloseButton: () => {
        globalThis.parent.postMessage({ type: LightboxAppEvents.HIDE_CLOSE_BUTTON }, '*');
    },
};
