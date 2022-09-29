import { ClientCallbacks, ApiStructure } from '@/types';

export const mountListener = (callbacks: ClientCallbacks | undefined) => {
    if (!callbacks) return;

    const listener = (event: MessageEvent<ApiStructure>) => {
        callbacks[event.data.type]?.(event.data.data);
        document.getElementById('placetopay_lightbox')?.remove();
        globalThis.removeEventListener('message', listener);
    };

    globalThis.addEventListener('message', listener);
};

export const mountIFrameElement = (url: string) => {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.id = 'placetopay_lightbox';
    iframe.classList.add('lightbox');
    document.body.appendChild(iframe);
};
