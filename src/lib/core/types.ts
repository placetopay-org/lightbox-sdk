export type ClientCallback = (data: unknown) => void;

export type ClientCallbacks = {
    [key: string]: ClientCallback | undefined;
};

export type InitOptions = {
    dispatch?: boolean;
    callbacks?: ClientCallbacks;
    style?: {
        background?: {
            color?: string;
            opacity?: number;
        };
        rounded?: number;
        dimension?: 'sm' | 'md' | 'lg';
        height?: number;
        width?: number;
    };
};

export type ApiStructure = {
    data: unknown;
    type: string;
};

export type LightboxInstance = {
    callbacks: ClientCallbacks;
    open: () => void;
};
