import { LightboxAppEvents } from '../constants';
import { redirectBasedOnDriver } from '../helpers';
import { InitOptions, LightboxInstance, LightboxStyles } from '../types';
import { mountLightbox, mountListener } from './assemblers';

export const LightboxSdk = {
    isInside: () => globalThis.location !== globalThis.parent.location,
    close: (frame?: string) => {
        globalThis.parent.postMessage({ type: LightboxAppEvents.CLOSE, payload: frame }, '*');
    },
    sendStyles: (styles: LightboxStyles) => {
        globalThis.parent.postMessage({ type: LightboxAppEvents.SEND_STYLES, payload: styles }, '*');
    },
    hideCloseButton: () => {
        globalThis.parent.postMessage({ type: LightboxAppEvents.HIDE_CLOSE_BUTTON }, '*');
    },
    closeOrRedirect: (url?: string) => {
        if (!url || LightboxSdk.isInside())
            globalThis.parent.postMessage({ type: LightboxAppEvents.CLOSE_OR_REDIRECT }, '*');
        else globalThis.location.href = url;
    },
    emit: (type: string, payload: unknown) => {
        globalThis.parent.postMessage({ type, payload }, '*');
        return { close: LightboxSdk.close };
    },
    init: (url: string, options?: InitOptions): LightboxInstance => {
        const lightbox: LightboxInstance = {
            allowRedirects: options?.allowRedirects ?? true,
            callbacks: options?.callbacks ?? {},
            closeButton: options?.closeButton ?? true,
            styles: options?.styles ?? {},
            open: () => {
                if (lightbox.allowRedirects) redirectBasedOnDriver(url);
                mountListener(lightbox.callbacks, lightbox.styles);
                mountLightbox(url, lightbox.styles, lightbox.closeButton);
            },
        };

        return lightbox;
    },
};
