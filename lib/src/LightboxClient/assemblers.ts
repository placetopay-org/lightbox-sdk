import { Config } from '../config';
import { Styles, ElementIds, Dimensions, LightboxAppEvents } from '../constants';
import { ClientCallbacks, ClientStyles, LightboxEvents } from '../types';

export const mountListeners = (callbacks: ClientCallbacks, styles: ClientStyles) => {
    if (!callbacks) return;

    const listener = (event: MessageEvent<LightboxEvents>) => {
        switch (event.data.type) {
            case LightboxAppEvents.EMIT:
                callbacks[event.data.payload.type]?.(event.data.payload.payload);
                break;
            case LightboxAppEvents.SEND_STYLES:
                mountStyles({
                    ...event.data.payload,
                    ...styles,
                    background: { ...event.data.payload.background, ...styles.background },
                });
                break;
            case LightboxAppEvents.CLOSE:
                unmountLightbox(listener);
                break;
        }
    };

    globalThis.addEventListener('message', listener);
};

export const mountLightbox = (url: string, styles: ClientStyles, closeButton: boolean) => {
    const wrapper = document.createElement('div');
    wrapper.id = ElementIds.WRAPPER_ID;

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.id = ElementIds.IFRAME_ID;

    mountStyles(styles);

    document.body.appendChild(wrapper);
    wrapper.appendChild(iframe);
};

const mountStyles = (styles: ClientStyles) => {
    const background = styles.background?.color
        ?.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1)
        .match(/.{2}/g)
        ?.map((x) => parseInt(x, 16)) ?? [107, 114, 128];

    background.push(styles.background?.opacity ?? 0.75);
    document.documentElement.style.setProperty(Styles.BACKGROUND_COLOR, `rgb(${background.join(', ')})`);

    const rounded = styles.rounded ?? 0;
    document.documentElement.style.setProperty(Styles.ROUNDED, `${rounded.toString()}px`);

    let height = styles.height ?? Config.defaultDimension.height;
    if (styles.dimension) height = Dimensions[styles.dimension.toUpperCase() as keyof typeof Dimensions].height;
    document.documentElement.style.setProperty(Styles.MAX_HEIGHT, `${height.toString()}px`);

    let width = styles.width ?? Config.defaultDimension.width;
    if (styles.dimension) width = Dimensions[styles.dimension.toUpperCase() as keyof typeof Dimensions].width;
    document.documentElement.style.setProperty(Styles.MAX_WIDTH, `${width.toString()}px`);
};

const unmountLightbox = (listener: (event: MessageEvent<LightboxEvents>) => void) => {
    document.getElementById(ElementIds.WRAPPER_ID)?.remove();
    globalThis.removeEventListener('message', listener);
    document.documentElement.style.removeProperty(Styles.BACKGROUND_COLOR);
};