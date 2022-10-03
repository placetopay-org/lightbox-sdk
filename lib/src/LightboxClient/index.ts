import { redirectBasedOnDriver } from '../helpers';
import { InitOptions, LightboxInstance } from '../types';
import { mountLightbox, mountListener } from './assemblers';

export const LightboxClient = {
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
