import { useRef, useState } from 'react';
import { PageTemplate } from './components/templates';
import { LightboxSdk } from '@placetopay/lightbox-sdk';

const App = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [options, setOptions] = useState({
        closeButton: true,
        rounded: '16',
        height: '640',
        width: '512',
        callbackName: 'close',
    });

    const setPage = (page: string) => {
        if (inputRef.current) inputRef.current.value = page;
    };

    const clear = () => {
        if (inputRef.current) inputRef.current.value = '';
    };

    const trackEvents = () => {
        console.log('Tracking events!');
        globalThis.addEventListener('message', (e) => console.log(e));
    };

    const open = () => {
        if (!inputRef.current) return;
        if (!inputRef.current.value) {
            alert('Please enter a url');
            return;
        }
        if (options.callbackName === '') {
            alert('Please enter a callback name');
            return;
        }

        LightboxSdk.init(inputRef.current.value, {
            callbacks: {
                [options.callbackName]: (data: unknown) => {
                    console.log(options.callbackName, data);
                },
            },
            closeButton: options.closeButton,
            styles: {
                background: {
                    opacity: 0.9,
                },
                rounded: Number(options.rounded),
                height: Number(options.height),
                width: Number(options.width),
                // dimension: 'sm',
            },
        }).open();
    };

    return (
        <PageTemplate>
            <>
                <div className="flex gap-4 items-center">
                    <input
                        ref={inputRef}
                        defaultValue="http://127.0.0.1:5173/example1.html"
                        className="input w-full"
                        type="text"
                        placeholder="url"
                    />
                    <button onClick={() => open()} className="btn whitespace-nowrap">
                        Open Lightbox
                    </button>
                </div>
                <hr className="border border-gray-300 my-3" />
                <div className="flex gap-4">
                    <button onClick={() => clear()} className="btn">
                        Clear
                    </button>
                    <button onClick={() => setPage(`${window.location.origin}/example1.html`)} className="btn">
                        Set example url
                    </button>
                    <button onClick={() => setPage('https://checkout-co.placetopay.dev')} className="btn">
                        Set web checkout url
                    </button>
                    <button onClick={() => trackEvents()} className="btn">
                        Track events
                    </button>
                    <button
                        onClick={() => (window.location.href = `${window.location.origin}/example1.html`)}
                        className="btn"
                    >
                        Go to example #1
                    </button>
                </div>
                <hr className="border border-gray-300 my-3" />
                <div className="flex flex-col gap-4">
                    <h1 className="font-bold text-gray-700 text-2xl">Options</h1>
                    <div>
                        <h1 className="font-bold text-gray-700 text-xl">Basics</h1>
                        <div className="flex gap-4 items-center">
                            <input
                                type="checkbox"
                                checked={options.closeButton}
                                onChange={(e) => setOptions({ ...options, closeButton: e.target.checked })}
                            />
                            <span className="font-bold text-gray-500">closeButton</span>
                        </div>
                    </div>
                    <div>
                        <h1 className="font-bold text-gray-700 text-xl">Styles</h1>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-4 items-center">
                                <span className="font-bold text-gray-500 w-28">rounded</span>
                                <input
                                    className="input w-28"
                                    type="number"
                                    value={options.rounded}
                                    onChange={(e) => setOptions({ ...options, rounded: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-4 items-center">
                                <span className="font-bold text-gray-500 w-28">height</span>
                                <input
                                    className="input w-28"
                                    type="number"
                                    value={options.height}
                                    onChange={(e) => setOptions({ ...options, height: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-4 items-center">
                                <span className="font-bold text-gray-500 w-28">width</span>
                                <input
                                    className="input w-28"
                                    type="number"
                                    value={options.width}
                                    onChange={(e) => setOptions({ ...options, width: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="font-bold text-gray-700 text-xl">Callback</h1>
                        <div className="flex flex-col">
                            <div>
                                <span className="font-bold text-gray-500">name: </span>
                                <input
                                    className="input w-28"
                                    type="text"
                                    value={options.callbackName}
                                    onChange={(e) => setOptions({ ...options, callbackName: e.target.value })}
                                />
                            </div>
                            <span>{`${options.callbackName}: (data: unknown) => {console.log('${options.callbackName}', data);}`}</span>
                        </div>
                    </div>
                </div>
            </>
        </PageTemplate>
    );
};

export default App;
