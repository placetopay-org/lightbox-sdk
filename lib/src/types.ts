export type ClientCallback = (payload?: unknown) => void;

export type ClientCallbacks = {
    [key: string]: ClientCallback | undefined;
};

export type LightboxStyles = {
    backdropColor?: string;
    backdropOpacity?: number;
    dimension?: 'sm' | 'md' | 'lg';
    height?: string;
    width?: string;
    rounded?: number;
};

export type InitOptions = {
    allowRedirects?: boolean;
    callbacks?: ClientCallbacks;
    closeButton?: boolean;
    styles?: LightboxStyles;
};

export type ApiStructure = {
    type: string;
    target?: string;
    payload?: unknown;
    preventClose?: boolean;
};

export type LightboxInstance = Required<InitOptions> & {
    url: string;
    on: (name: string, callback: ClientCallback) => void;
    open: () => void;
    close: (payload?: unknown) => void;
    updateStyles: (styles: LightboxStyles) => void;
    hideCloseButton: () => void;
};
