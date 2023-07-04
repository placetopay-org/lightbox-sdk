export type ClientCallback = (payload?: unknown) => void;

export type ClientCallbacks = {
    [key: string]: ClientCallback | undefined;
};

export type LightboxStyles = {
    backdropColor?: string;
    backdropOpacity?: number;
    height?: string | number;
    width?: string | number;
    radius?: number;
};

export type ApiStructure = {
    type: string;
    payload?: unknown;
    preventClose?: boolean;
};

export type InternalOptions = {
    launch?: boolean;
};

export type ExposedOptions = {
    allowRedirects?: boolean;
    callbacks?: ClientCallbacks;
    closeButton?: boolean;
    styles?: LightboxStyles;
};

export type InitialOptions = ExposedOptions & InternalOptions;

export type LightboxInstance = Required<ExposedOptions> & {
    url: string;
    on: (name: string, callback: ClientCallback) => void;
    open: () => void;
    close: (payload?: unknown) => void;
    updateStyles: (styles: LightboxStyles) => void;
    hideCloseButton: () => void;
};
