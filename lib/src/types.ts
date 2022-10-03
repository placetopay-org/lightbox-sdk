import { LightboxAppEvents } from './constants';

export type ClientCallback = (data: unknown) => void;

export type ClientCallbacks = {
    [key: string]: ClientCallback | undefined;
};

export type ClientStyles = {
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
    styles?: ClientStyles;
};

export type ApiStructure = {
    payload: unknown;
    type: string;
};

export type LightboxInstance = Required<InitOptions> & {
    open: () => void;
};

export type LightboxEvents =
    | { type: LightboxAppEvents.CLOSE }
    | { type: LightboxAppEvents.EMIT; payload: ApiStructure }
    | { type: LightboxAppEvents.SEND_STYLES; payload: ClientStyles };