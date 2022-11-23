import { Config } from '../config';
import { Styles, ElementIds, Dimensions, LightboxAppEvents } from '../constants';
import { ApiStructure, ClientCallbacks, LightboxStyles } from '../types';

export const mountListener = (callbacks: ClientCallbacks, styles: LightboxStyles) => {
    if (!callbacks) return;
    const listener = (event: MessageEvent<ApiStructure>) => {
        let receivedStyles: LightboxStyles;
        switch (event.data.type) {
            case LightboxAppEvents.CLOSE:
                unmountLightbox(listener, (event.data.payload as string) ?? event.origin);
                break;
            case LightboxAppEvents.CLOSE_OR_REDIRECT:
                unmountLightbox(listener, event.origin);
                break;
            case LightboxAppEvents.SEND_STYLES:
                receivedStyles = event.data.payload as LightboxStyles;
                mountStyles({
                    ...receivedStyles,
                    ...styles,
                    background: { ...receivedStyles?.background, ...styles.background },
                });
                break;
            case LightboxAppEvents.HIDE_CLOSE_BUTTON:
                document.getElementById(ElementIds.CLOSE_BUTTON_ID)?.remove();
                break;
            default:
                callbacks[event.data.type]?.(event.data.payload);
                break;
        }
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

        closeButton.addEventListener('click', () => {
            globalThis.postMessage({ type: LightboxAppEvents.CLOSE, payload: new URL(url).origin }, '*');
        });

        const closeButtonContent = document.createElement('span');
        closeButtonContent.classList.add('placetopay-close-button-content');
        closeButtonContent.textContent = 'x';

        closeButton.appendChild(closeButtonContent);
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
