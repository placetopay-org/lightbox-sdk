export type ClientCallback = (payload?: unknown) => void;

export type ClientCallbacks = Record<string, ClientCallback | undefined>;

export type LightboxStyles = Partial<{
    backdropColor: string;
    backdropOpacity: number;
    height: string | number;
    width: string | number;
    radius: number;
}>;

export type ApiStructure = {
    type: string;
    payload?: unknown;
    preventClose?: boolean;
};

export type InternalOptions = Partial<{
    launch: boolean;
    enforceStyles: boolean;
}>;

export type ExposedOptions = Partial<{
    allowRedirects: boolean;
    callbacks: ClientCallbacks;
    closeButton: boolean;
    styles: LightboxStyles;
}>;

export type InitialOptions = ExposedOptions & InternalOptions;

export type MountLightboxOptions = {
    url: string;
    callbacks: ClientCallbacks;
    styles: LightboxStyles;
    closeButtonEnabled: boolean;
    enforceStyles: boolean;
};

export type MountListenerOptions = {
    callbacks: ClientCallbacks;
    styles: LightboxStyles;
    closeButton: HTMLButtonElement;
    enforceStyles: boolean;
};

export type LightboxInstance = Required<ExposedOptions> & {
    url: string;
    on: (name: string, callback: ClientCallback) => void;
    open: () => void;
    close: (payload?: unknown) => void;
    updateStyles: (styles: LightboxStyles) => void;
    hideCloseButton: () => void;
};
