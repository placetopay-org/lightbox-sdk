export enum ElementIds {
    WRAPPER_ID = 'placetopay_lightbox_wrapper',
    IFRAME_ID = 'placetopay_lightbox',
    STYLES_ID = 'placetopay-lightbox',
}

export enum LightboxAppEvents {
    CLOSE = 'close',
    EMIT = 'emit',
    SEND_STYLES = 'sendStyles',
}

export enum Styles {
    BACKGROUND_COLOR = '--placetopay-lightbox-background-color',
    ROUNDED = '--placetopay-lightbox-border-radius',
    MAX_HEIGHT = '--placetopay-lightbox-max-height',
    MAX_WIDTH = '--placetopay-lightbox-max-width',
}

export const Dimensions = {
    SM: { height: 400, width: 320 },
    MD: { height: 640, width: 512 },
    LG: { height: 1000, width: 800 },
};
