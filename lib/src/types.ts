export type ClientCallback = (payload?: unknown) => void;

export type ClientCallbacks = {
    [key: string]: ClientCallback | undefined;
};

export type LightboxStyles = {
    background?: {
        color?: string;
        opacity?: number;
    };
    dimension?: 'sm' | 'md' | 'lg';
    height?: number;
    rounded?: number;
    width?: number;
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
    on: (name: string, callback: ClientCallback) => void;
    open: () => void;
    close: (payload?: unknown) => void;
    updateStyles: (styles: LightboxStyles) => void;
    hideCloseButton: () => void;
};
