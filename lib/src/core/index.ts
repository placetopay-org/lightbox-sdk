import { LightboxEvents as LE } from '../constants';
import { postMessage, redirectBasedOnDriver } from '../helpers';
import { InitialOptions, LightboxInstance, ApiStructure, LightboxStyles, ClientCallback } from '../types';
import { mountLightbox, unmountLightbox } from './assemblers';

export const isInside = () => globalThis.location !== globalThis.parent.location;
export const updateStyles = (styles: LightboxStyles) => postMessage(LE.UPDATE_STYLES, styles);
export const hideCloseButton = () => postMessage(LE.HIDE_CLOSE_BUTTON);

export const emitClose = (payload?: unknown, preventClose?: boolean) => {
    postMessage(LE.CLOSE, payload, preventClose);
};

export const emit = ({ type, payload, preventClose }: ApiStructure) => postMessage(type, payload, preventClose);

export const createLightbox = (url: string, options?: InitialOptions): LightboxInstance => {
    const lightbox: LightboxInstance = {
        allowRedirects: options?.allowRedirects ?? true,
        callbacks: options?.callbacks ?? {},
        closeButton: options?.closeButton ?? true,
        styles: options?.styles ?? {},
        url: url,
        close: () => unmountLightbox(url),
        updateStyles,
        hideCloseButton,
        on: (name: string, callback: ClientCallback) => {
            lightbox.callbacks[name] = callback;
        },
        open: () => {
            if (lightbox.allowRedirects) redirectBasedOnDriver(url);
            mountLightbox(url, lightbox.callbacks, lightbox.styles, lightbox.closeButton);
        },
    };

    if (options?.launch) lightbox.open();

    return lightbox;
};
