import { InitOptions, LightboxInstance } from '@/types';
import { mountIFrameElement, mountListener } from './assemblers';

export const LightboxClient = {
    init: (url: string, options?: InitOptions): LightboxInstance => {
        const lightbox: LightboxInstance = {
            callbacks: options?.callbacks ?? {},
            styles: options?.styles ?? {},
            open: () => {
                mountListener(lightbox.callbacks);
                mountIFrameElement(url, lightbox.styles);
            },
        };

        if (options?.dispatch) lightbox.open();
        console.log(`lightbox-sdk | client initialized (${url})`);
        return lightbox;
    },
};
