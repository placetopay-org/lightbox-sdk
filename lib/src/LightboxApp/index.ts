import { LightboxAppEvents } from '../constants';
import { ClientStyles } from '../types';

export const LightboxApp = {
    emit: (type: string, data: unknown) => {
        globalThis.parent.postMessage({ event: LightboxAppEvents.EMIT, type, data }, '*');
    },
    sendStyles: (styles: ClientStyles) => {
        globalThis.parent.postMessage({ event: LightboxAppEvents.SEND_STYLES, styles }, '*');
    },
};
