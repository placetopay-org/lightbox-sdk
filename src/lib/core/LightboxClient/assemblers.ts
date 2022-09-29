import { Styles, Ids } from '@/constants';
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
};

const unmountLightbox = (listener: (event: MessageEvent<ApiStructure>) => void) => {
    document.getElementById(Ids.WRAPPER_ID)?.remove();
    globalThis.removeEventListener('message', listener);
    document.documentElement.style.removeProperty(Styles.BACKGROUND_COLOR);
};
