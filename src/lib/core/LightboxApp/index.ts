export const LightboxApp = {
    emit: (type: string, data: unknown) => {
        globalThis.parent.postMessage({ type, data }, '*');
    },
};
