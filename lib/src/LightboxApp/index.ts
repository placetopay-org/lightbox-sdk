import { LightboxAppEvents } from '../constants';
import { ClientStyles } from '../types';

export const LightboxApp = {
    close: () => {
        globalThis.parent.postMessage({ type: LightboxAppEvents.CLOSE }, '*');
    },
    emit: (type: string, payload: unknown) => {
        globalThis.parent.postMessage({ type: LightboxAppEvents.EMIT, payload: { type, payload } }, '*');
        return { close: LightboxApp.close };
    },
    sendStyles: (styles: ClientStyles) => {
        globalThis.parent.postMessage({ type: LightboxAppEvents.SEND_STYLES, payload: styles }, '*');
    },
};
