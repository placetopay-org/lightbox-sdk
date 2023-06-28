import { Config } from '../config';
import { Styles, ElementIds, Dimensions, LightboxEvents as LE } from '../constants';
import { setStyle } from '../helpers';
import { ApiStructure, ClientCallbacks, LightboxStyles } from '../types';

export const mountListener = (callbacks: ClientCallbacks, styles: LightboxStyles) => {
    const listener = (event: MessageEvent<ApiStructure>) => {
        if (event.data.type === LE.CLOSE) unmountLightbox(listener, event.data.target ?? event.origin);
        if (event.data.type === LE.UPDATE_STYLES) mountStyles({ ...(event.data.payload as LightboxStyles), ...styles });
        if (event.data.type === LE.HIDE_CLOSE_BUTTON) document.getElementById(ElementIds.CLOSE_BUTTON_ID)?.remove();

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
            globalThis.postMessage({ type: LE.CLOSE, target: new URL(url).origin }, '*');
        });

        wrapper.appendChild(closeButton);
    }
};

const unmountLightbox = (listener: (event: MessageEvent<ApiStructure>) => void, origin: string) => {
    const element = document.getElementById(origin);
    if (element) {
        element.remove();
        globalThis.removeEventListener('message', listener);
        document.documentElement.style.removeProperty(Styles.BACKDROP_COLOR);
    } else throw new Error(`Frame from "${origin}" not found`);
};

const mountStyles = (styles: LightboxStyles) => {
    setStyle(Styles.BACKDROP_COLOR, buildBackdrop(styles.backdropColor, styles.backdropOpacity));
    setStyle(Styles.ROUNDED, `${styles.rounded ?? 0}px`);
    setStyle(Styles.MAX_HEIGHT, buildDimension('height', styles.height, styles.dimension));
    setStyle(Styles.MAX_WIDTH, buildDimension('width', styles.width, styles.dimension));
};

const buildBackdrop = (color: string, opacity: number) => {
    const backdrop = color
        ?.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1)
        .match(/.{2}/g)
        ?.map((x) => parseInt(x, 16)) ?? [107, 114, 128];

    backdrop.push(opacity ?? 0.75);

    return `rgba(${backdrop.join(', ')})`;
};

const buildDimension = (type: 'height' | 'width', value = '', dimension: LightboxStyles['dimension']) => {
    let result = value;
    if (dimension) result = Dimensions[dimension.toUpperCase() as keyof typeof Dimensions][type];

    if (result.match(/^\d+%$/) || result.match(/^\d+px$/)) return result;
    if (result.match(/^\d+$/)) return `${result}px`;

    if (value) {
        console.warn(`Invalid ${type}. Must be a number, a number followed by "px", or a number followed by "%".`);
    }
    return `${Config.defaultDimension[type]}px`;
};
