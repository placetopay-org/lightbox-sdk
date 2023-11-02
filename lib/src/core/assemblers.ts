import { Styles, ElementIds, LightboxEvents as LE } from '../constants';
import { setStyle, unsetStyle } from '../helpers';
import { ApiStructure, LightboxStyles, MountLightboxOptions, MountListenerOptions } from '../types';

let listener: (event: MessageEvent<ApiStructure>) => void;

export const mountLightbox = ({
    id,
    url,
    element,
    callbacks,
    styles,
    closeButtonEnabled,
    enforceStyles,
}: MountLightboxOptions) => {
    const wrapper = document.createElement('div');
    wrapper.id = id;
    wrapper.className = ElementIds.WRAPPER_ID;
    if (element !== document.body) {
        wrapper.style.setProperty(Styles.POSITION, 'absolute');
        wrapper.style.setProperty(Styles.WRAPPER_HEIGHT, '100%');
        wrapper.style.setProperty(Styles.WRAPPER_WIDTH, '100%');
    }

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.id = ElementIds.IFRAME_ID;

    updateStyles(styles);

    console.log({ isBody: element === document.body });

    element.appendChild(wrapper);
    wrapper.appendChild(iframe);

    let closeButton: HTMLButtonElement;
    if (closeButtonEnabled) {
        closeButton = document.createElement('button');
        closeButton.id = ElementIds.CLOSE_BUTTON_ID;
        closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#4b5563" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>`;

        closeButton.addEventListener('click', () => {
            unmountLightbox(id);
        });

        wrapper.appendChild(closeButton);
    }

    mountListener({ id, callbacks, styles, closeButton, enforceStyles });
};

const mountListener = ({ id, callbacks, styles, closeButton, enforceStyles }: MountListenerOptions) => {
    listener = (event: MessageEvent<ApiStructure>) => {
        if (event.data.type === LE.CLOSE) unmountLightbox(id);
        if (event.data.type === LE.UPDATE_STYLES) {
            const newStyles = enforceStyles
                ? { ...(event.data.payload as LightboxStyles), ...styles }
                : { ...styles, ...(event.data.payload as LightboxStyles) };
            updateStyles(newStyles);
        }
        if (event.data.type === LE.HIDE_CLOSE_BUTTON) closeButton?.remove();
        callbacks[event.data.type]?.(event.data.payload);
    };

    globalThis.addEventListener('message', listener);
};

export const unmountLightbox = (target: string) => {
    const element = document.getElementById(target);
    if (element) {
        element.remove();
        clearStyles();
        globalThis.removeEventListener('message', listener);
    } else throw new Error(`Frame from "${target}" not found`);
};

const clearStyles = () => {
    unsetStyle(Styles.BACKDROP_COLOR);
    unsetStyle(Styles.RADIUS);
    unsetStyle(Styles.MAX_HEIGHT);
    unsetStyle(Styles.MAX_WIDTH);
};

const updateStyles = (styles: LightboxStyles) => {
    setStyle(Styles.BACKDROP_COLOR, buildBackdrop(styles.backdropColor ?? '#000000', styles.backdropOpacity ?? 0.7));
    setStyle(Styles.RADIUS, `${styles.radius ?? 0}px`);
    setStyle(Styles.MAX_HEIGHT, buildDimension('height', styles.height ?? 640));
    setStyle(Styles.MAX_WIDTH, buildDimension('width', styles.width ?? 512));
    setStyle(Styles.POSITION, styles.position ?? 'fixed');
    setStyle(Styles.WRAPPER_WIDTH, buildDimension('width', styles.wrapperWidth ?? '100vw'));
    setStyle(Styles.WRAPPER_HEIGHT, buildDimension('height', styles.wrapperHeight ?? '100vh'));
};

const buildBackdrop = (color: string, opacity: number) => {
    const backdrop = color
        ?.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1)
        .match(/.{2}/g)
        ?.map((x) => parseInt(x, 16));

    backdrop.push(opacity);

    return `rgba(${backdrop.join(', ')})`;
};

const buildDimension = (type: 'height' | 'width', value: string | number) => {
    const result = String(value);

    if (result.match(/^\d+(vh|vw|px|%)$/)) return result;
    if (result.match(/^\d+$/)) return `${result}px`;

    console.warn(`Invalid ${type}. Must be a number, a number followed by "px", or a number followed by "%".`);
};
