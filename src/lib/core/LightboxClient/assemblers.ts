import { Config } from '@/config';
import { Styles, Ids, Dimensions } from '@/constants';
import { ClientCallbacks, ApiStructure, ClientStyles } from '@/types';

export const mountListener = (callbacks: ClientCallbacks) => {
    if (!callbacks) return;

    const listener = (event: MessageEvent<ApiStructure>) => {
        callbacks[event.data.type]?.(event.data.data);
        unmountLightbox(listener);
    };

    globalThis.addEventListener('message', listener);
};

export const mountIFrameElement = (url: string, styles: ClientStyles) => {
    const wrapper = document.createElement('div');
    wrapper.id = Ids.WRAPPER_ID;

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.id = Ids.IFRAME_ID;

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

const unmountLightbox = (listener: (event: MessageEvent<ApiStructure>) => void) => {
    document.getElementById(Ids.WRAPPER_ID)?.remove();
    globalThis.removeEventListener('message', listener);
    document.documentElement.style.removeProperty(Styles.BACKGROUND_COLOR);
};
