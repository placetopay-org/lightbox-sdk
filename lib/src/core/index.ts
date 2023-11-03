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
        id: options?.id ?? new URL(url).origin,
        element: options?.element ?? document.body,
        allowRedirects: options?.allowRedirects ?? true,
        callbacks: options?.callbacks ?? {},
        closeButton: options?.closeButton ?? true,
        styles: options?.styles ?? {},
        url: url,
        close: () => unmountLightbox(lightbox.id),
        updateStyles,
        hideCloseButton,
        on: (name: string, callback: ClientCallback) => {
            lightbox.callbacks[name] = callback;
        },
        open: () => {
            if (lightbox.allowRedirects) redirectBasedOnDriver(url);
            mountLightbox({
                id: lightbox.id,
                url,
                element: lightbox.element,
                callbacks: lightbox.callbacks,
                styles: lightbox.styles,
                closeButtonEnabled: lightbox.closeButton,
                enforceStyles: options?.enforceStyles ?? false,
            });
        },
    };

    if (options?.launch) lightbox.open();

    return lightbox;
};
