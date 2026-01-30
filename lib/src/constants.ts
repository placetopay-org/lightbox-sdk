export enum ElementIds {
    WRAPPER_ID = 'placetopay_lightbox_wrapper',
    IFRAME_ID = 'placetopay_lightbox',
    CLOSE_BUTTON_ID = 'placetopay_close_button',
    STYLES_ID = 'placetopay-lightbox',
}

export enum LightboxEvents {
    CLOSE = 'close',
    UPDATE_STYLES = 'updateStyles',
    HIDE_CLOSE_BUTTON = 'hideCloseButton',
    CLOSE_BY_USER = 'closeByUser',
}

export enum Styles {
    BACKDROP_COLOR = '--placetopay-lightbox-backdrop-color',
    RADIUS = '--placetopay-lightbox-border-radius',
    MAX_HEIGHT = '--placetopay-lightbox-max-height',
    MAX_WIDTH = '--placetopay-lightbox-max-width',
    POSITION = '--placetopay-lightbox-position',
    WRAPPER_WIDTH = '--placetopay-lightbox-wrapper-width',
    WRAPPER_HEIGHT = '--placetopay-lightbox-wrapper-height',
}
