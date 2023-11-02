export const postMessage = (type: string, payload?: unknown, preventClose?: boolean) => {
    return globalThis.parent.postMessage({ type, preventClose, payload }, '*');
};

export const setStyle = (name: string, value: string) => {
    document.documentElement.style.setProperty(name, value);
};

export const unsetStyle = (name: string) => {
    document.documentElement.style.removeProperty(name);
};

export const redirectBasedOnDriver = (url: string) => {
    if (
        navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent) // regex from https://stackoverflow.com/a/23522755
    ) {
        if (window.self !== window.top) {
          window.parent.postMessage(
            { type: "placetopay-lightbox:redirect", url },
            "*"
          ); // dont change this, it would be a broken change
        }

        location.href = url;
    }
};
