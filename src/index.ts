export const LightboxApp = {
    mount: () => {
        console.log('LightboxApp mounted');
    },
};

export const LightboxClient = {
    init: (url: string) => {
        console.log('LightboxClient initialized');
        mountIFrameElement(url);
    },
};

const mountIFrameElement = (url: string) => {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.border = 'none';
    iframe.style.overflow = 'auto';
    document.body.appendChild(iframe);
}
