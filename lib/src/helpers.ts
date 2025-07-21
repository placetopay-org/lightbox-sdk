import type { BackupTarget } from './types';

export const postMessage = (type: string, payload?: unknown, preventClose?: boolean) => {
    const target = globalThis.opener || globalThis.parent;
    return target.postMessage({ type, preventClose, payload }, '*');
};

export const setStyle = (name: string, value: string) => {
    document.documentElement.style.setProperty(name, value);
};

export const unsetStyle = (name: string) => {
    document.documentElement.style.removeProperty(name);
};

let openedWindow: Window | null = null;
let backdropElement: HTMLElement | null = null;

const openedWindows: Record<string, { window: Window; type: BackupTarget }> = {};

// Private translations
const translations = {
    en: {
        popupTitle: 'Popup Opened',
        popupMessage: 'Please complete the process in the popup window. This window will remain blocked until finished.',
    },
    es: {
        popupTitle: 'Popup Abierto',
        popupMessage:
            'Por favor, complete el proceso en la ventana emergente. Esta ventana permanecerá bloqueada hasta que finalice.',
    },
};

function getLanguage(): 'en' | 'es' {
    const lang = navigator.language || (navigator as any).userLanguage;
    return lang.startsWith('es') ? 'es' : 'en';
}

function getText(key: keyof typeof translations.en): string {
    const lang = getLanguage();
    return translations[lang][key];
}

export const mountBackdrop = () => {
    if (backdropElement) return;

    backdropElement = document.createElement('div');
    backdropElement.className = 'placetopay-lightbox-backdrop-overlay';
    backdropElement.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 9998;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    const messageContainer = document.createElement('div');
    messageContainer.className = 'placetopay-lightbox-backdrop-message-container';
    messageContainer.style.cssText = `
        background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
        border-radius: 16px;
        padding: 40px;
        max-width: 420px;
        margin: 20px;
        text-align: center;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;

    const title = document.createElement('h2');
    title.className = 'placetopay-lightbox-backdrop-title';
    title.textContent = getText('popupTitle');
    title.style.cssText = `
        margin: 0 0 20px 0;
        font-size: 22px;
        font-weight: 700;
        color: #ffffff;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    `;

    const message = document.createElement('p');
    message.className = 'placetopay-lightbox-backdrop-message';
    message.textContent = getText('popupMessage');
    message.style.cssText = `
        margin: 0;
        font-size: 15px;
        line-height: 1.6;
        color: #d1d5db;
        opacity: 0.9;
    `;

    messageContainer.appendChild(title);
    messageContainer.appendChild(message);
    backdropElement.appendChild(messageContainer);
    document.body.appendChild(backdropElement);
    document.body.classList.add('placetopay-lightbox-open');

    // Add body styles to prevent scrolling
    document.body.style.overflow = 'hidden';

    // Monitor the popup window
    if (openedWindow) {
        const checkClosed = setInterval(() => {
            if (openedWindow?.closed) {
                clearInterval(checkClosed);
                unmountBackdrop();
            }
        }, 1000);
    }
};

export const unmountBackdrop = () => {
    if (backdropElement) {
        document.body.removeChild(backdropElement);
        backdropElement = null;
    }
    
    // Restore body styles
    document.body.style.overflow = '';
    document.body.classList.remove('placetopay-lightbox-open');
    
    openedWindow = null;
};

export const openWithBackup = (url: string, backupTarget: BackupTarget = 'self', lightboxId?: string) => {
    switch (backupTarget) {
        case 'blank':
            openedWindow = window.open(url, '_blank');
            break;
        case 'popup': {
            const popupWidth = 512;
            const popupHeight = 640;

            // Calculate center position
            const left = (window.screen.width - popupWidth) / 2;
            const top = (window.screen.height - popupHeight) / 2;

            openedWindow = window.open(
                url,
                'placetopay',
                `popup=true,width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
            );
            break;
        }
        case 'self':
        default:
            window.location.href = url;
            break;
    }

    if (openedWindow && lightboxId) {
        openedWindows[lightboxId] = { window: openedWindow, type: backupTarget };
    }

    if (openedWindow) {
        mountBackdrop();
    } else {
        window.location.href = url;
    }

    return openedWindow;
};

export const closePopupByLightboxId = (lightboxId: string) => {
    const openedWindow = openedWindows[lightboxId];
    if (openedWindow) {
        if (!openedWindow.window.closed) {
            openedWindow.window.close();
        }
        delete openedWindows[lightboxId];
        unmountBackdrop();
    }
};

export const hasOpenedPopup = (lightboxId: string): boolean => {
    return lightboxId in openedWindows;
};

export const getOpenedPopupType = (lightboxId: string): BackupTarget | null => {
    const openedWindow = openedWindows[lightboxId];
    return openedWindow ? openedWindow.type : null;
};
