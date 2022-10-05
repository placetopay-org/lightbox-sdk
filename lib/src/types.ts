export type ClientCallback = (data: unknown) => void;

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
    payload: unknown;
    type: string;
};

export type LightboxInstance = Required<InitOptions> & {
    open: () => void;
};
