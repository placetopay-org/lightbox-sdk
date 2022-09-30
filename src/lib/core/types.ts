export type ClientCallback = (data: unknown) => void;

export type ClientCallbacks = {
    [key: string]: ClientCallback | undefined;
};

export type ClientStyles = {
    background?: {
        color?: string;
        opacity?: number;
    };
    rounded?: number;
    dimension?: 'sm' | 'md' | 'lg';
    height?: number;
    width?: number;
};

export type InitOptions = {
    dispatch?: boolean;
    callbacks?: ClientCallbacks;
    allowRedirects?: boolean;
    styles?: ClientStyles;
};

export type ApiStructure = {
    data: unknown;
    type: string;
};

export type LightboxInstance = {
    styles: ClientStyles;
    allowRedirects: boolean;
    callbacks: ClientCallbacks;
    open: () => void;
};
