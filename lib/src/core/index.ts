import { LightboxEvents } from '../constants';
import { postMessage, redirectBasedOnDriver } from '../helpers';
import { InitOptions, LightboxInstance, ApiStructure, LightboxStyles, ClientCallback } from '../types';
import { mountLightbox, mountListener } from './assemblers';

export const isInside = () => globalThis.location !== globalThis.parent.location;

export const emitClose = (payload?: unknown) => postMessage(LightboxEvents.CLOSE, payload);

export const emitUpdateStyles = (styles: LightboxStyles) => postMessage(LightboxEvents.UPDATE_STYLES, styles);

export const emitHideCloseButton = () => postMessage(LightboxEvents.HIDE_CLOSE_BUTTON);

export const emit = ({ type, payload, preventClose }: ApiStructure) => {
    postMessage(type, payload, preventClose);
    return { close: emitClose };
};

export const createLightbox = (
    url: string,
    options?: InitOptions & {
        launch?: boolean;
    }
): LightboxInstance => {
    const lightbox: LightboxInstance = {
        allowRedirects: options?.allowRedirects ?? true,
        callbacks: options?.callbacks ?? {},
        closeButton: options?.closeButton ?? true,
        styles: options?.styles ?? {},
        url: url,
        close: emitClose,
        updateStyles: emitUpdateStyles,
        hideCloseButton: emitHideCloseButton,
        on: (name: string, callback: ClientCallback) => {
            lightbox.callbacks[name] = callback;
        },
        open: () => {
            if (lightbox.allowRedirects) redirectBasedOnDriver(url);
            mountListener(lightbox.callbacks, lightbox.styles);
            mountLightbox(url, lightbox.styles, lightbox.closeButton);
        },
    };

    if (options?.launch) lightbox.open();

    return lightbox;
};
