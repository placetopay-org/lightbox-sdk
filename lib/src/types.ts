export type ClientCallback = (payload?: unknown) => void;

export type ClientCallbacks = Record<string, ClientCallback | undefined>;

export type BackupTarget = 'self' | 'popup' | 'blank';

export type LightboxStyles = Partial<{
    backdropColor: string;
    backdropOpacity: number;
    height: string | number;
    width: string | number;
    radius: number;
    position: 'absolute' | 'fixed';
    wrapperWidth: string | number;
    wrapperHeight: string | number;
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
    id: string;
    element: HTMLElement;
    allowRedirects: boolean;
    callbacks: ClientCallbacks;
    closeButton: boolean;
    styles: LightboxStyles;
    backupTarget: BackupTarget;
}>;

export type InitialOptions = ExposedOptions & InternalOptions;

export type MountLightboxOptions = {
    id: string;
    url: string;
    element: HTMLElement;
    callbacks: ClientCallbacks;
    styles: LightboxStyles;
    closeButtonEnabled: boolean;
    enforceStyles: boolean;
    allowRedirects: boolean;
    backupTarget: BackupTarget;
};

export type MountListenerOptions = {
    id: string;
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
