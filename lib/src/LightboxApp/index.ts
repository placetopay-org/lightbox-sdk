import { LightboxAppEvents } from '../constants';
import { LightboxStyles } from '../types';

export const LightboxApp = {
    isInside: () => globalThis.location !== globalThis.parent.location,
    sendStyles: (styles: LightboxStyles) => {
        globalThis.parent.postMessage({ type: LightboxAppEvents.SEND_STYLES, payload: styles }, '*');
    },
    hideCloseButton: () => {
        globalThis.parent.postMessage({ type: LightboxAppEvents.HIDE_CLOSE_BUTTON }, '*');
    },
    close: (url?: string) => {
        if (!url || LightboxApp.isInside()) globalThis.parent.postMessage({ type: LightboxAppEvents.CLOSE }, '*');
        else globalThis.location.href = url;
    },
    emit: (type: string, payload: unknown) => {
        globalThis.parent.postMessage({ type, payload }, '*');
        return { close: LightboxApp.close };
    },
};
