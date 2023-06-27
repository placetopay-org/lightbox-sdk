import { Config } from '../config';
import { Styles, ElementIds, Dimensions, LightboxEvents } from '../constants';
import { ApiStructure, ClientCallbacks, LightboxStyles } from '../types';

export const mountListener = (callbacks: ClientCallbacks, styles: LightboxStyles) => {
    const listener = (event: MessageEvent<ApiStructure>) => {
        if (event.data.type === LightboxEvents.CLOSE) unmountLightbox(listener, event.data.target ?? event.origin);

        if (event.data.type === LightboxEvents.UPDATE_STYLES) {
            const receivedStyles = event.data.payload as LightboxStyles;
            mountStyles({
                ...receivedStyles,
                ...styles,
                background: { ...receivedStyles?.background, ...styles.background },
            });
        }

        if (event.data.type === LightboxEvents.HIDE_CLOSE_BUTTON) {
            document.getElementById(ElementIds.CLOSE_BUTTON_ID)?.remove();
        }

        callbacks[event.data.type]?.(event.data.payload);
    };

    globalThis.addEventListener('message', listener);
};

export const mountLightbox = (url: string, styles: LightboxStyles, closeButtonEnabled: boolean) => {
    const wrapper = document.createElement('div');
    wrapper.id = new URL(url).origin;
    wrapper.className = ElementIds.WRAPPER_ID;

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.id = ElementIds.IFRAME_ID;

    mountStyles(styles);

    document.body.appendChild(wrapper);
    wrapper.appendChild(iframe);

    if (closeButtonEnabled) {
        const closeButton = document.createElement('button');
        closeButton.id = ElementIds.CLOSE_BUTTON_ID;
        closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#4b5563" height="24px" width="24px">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        `;

        closeButton.addEventListener('click', () => {
            globalThis.postMessage({ type: LightboxEvents.CLOSE, target: new URL(url).origin }, '*');
        });

        wrapper.appendChild(closeButton);
    }
};

const mountStyles = (styles: LightboxStyles) => {
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

const unmountLightbox = (listener: (event: MessageEvent<ApiStructure>) => void, origin: string) => {
    const element = document.getElementById(origin);
    if (element) {
        element.remove();
        globalThis.removeEventListener('message', listener);
        document.documentElement.style.removeProperty(Styles.BACKGROUND_COLOR);
    } else throw new Error(`Frame from "${origin}" not found`);
};
