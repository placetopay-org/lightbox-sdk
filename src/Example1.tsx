import { LightboxSdk } from '@placetopay/lightbox-sdk';
import { useEffect, useRef, useState } from 'react';
import { PageTemplate } from './components/templates';

const AppPage = () => {
    const [isInside, setIsInside] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const open = () => {
        if (!inputRef.current) return;
        if (!inputRef.current.value) {
            alert('Please enter a url');
            return;
        }

        LightboxSdk.init(inputRef.current.value, {
            callbacks: {
                close: (data: unknown) => {
                    console.log('close', data);
                },
            },
            closeButton: true,
            styles: {
                background: {
                    opacity: 0.9,
                },
                rounded: 0,
                height: 640,
                width: 512,
                // dimension: 'sm',
            },
        }).open();
    };

    useEffect(() => {
        setIsInside(LightboxSdk.isInside());
    }, []);

    return (
        <PageTemplate>
            <>
                <h1 className="font-bold text-gray-700 text-lg">Information</h1>
                <p>
                    Is it inside a lightbox?: <span className="font-bold">{isInside ? 'yes' : 'no'}</span>
                </p>
                <hr className="border border-gray-300 my-3" />
                <div className="flex flex-col gap-4">
                    <h1 className="font-bold text-gray-700 text-lg">Actions</h1>
                    <div className="flex gap-4">
                        <button
                            className="btn"
                            onClick={() => LightboxSdk.sendStyles({ background: { color: '#ff0' }, rounded: 99 })}
                        >
                            Request styles
                        </button>
                        <button className="btn" onClick={() => LightboxSdk.hideCloseButton()}>
                            Hide close button
                        </button>
                    </div>
                    <div className="flex gap-4 items-center">
                        <button
                            className="btn"
                            onClick={() => {
                                LightboxSdk.emit('close', 'data').close();
                            }}
                        >
                            Emit and close
                        </button>
                        <pre>{'{ type: "close", data: "data" }'}</pre>
                    </div>
                </div>
                <hr className="border border-gray-300 my-3" />
                <div className="flex flex-col gap-4">
                    <h2 className="font-bold text-gray-700 text-lg">Custom emit</h2>
                    <div className="flex gap-4 items-center">
                        <label htmlFor="type">Type</label>
                        <input defaultValue="close" className="input" id="type" type="text" />
                    </div>
                    <div className="flex gap-4 items-center">
                        <label htmlFor="data">Data</label>
                        <input defaultValue="data" className="input" id="data" type="text" />
                    </div>
                    <div className="flex gap-4">
                        <button
                            className="btn"
                            onClick={() => {
                                LightboxSdk.emit(
                                    (document.getElementById('type') as HTMLInputElement).value,
                                    (document.getElementById('data') as HTMLInputElement).value
                                );
                            }}
                        >
                            Emit
                        </button>
                        <button
                            className="btn"
                            onClick={() => {
                                LightboxSdk.close();
                            }}
                        >
                            Close
                        </button>
                        <button
                            className="btn"
                            onClick={() => {
                                LightboxSdk.closeOrRedirect('https://www.google.com');
                            }}
                        >
                            Close and redirect to google
                        </button>
                    </div>
                </div>
                <hr className="border border-gray-300 my-3" />
                <div className="flex flex-col gap-4">
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
                    <button onClick={() => (window.location.href = `${window.location.origin}`)} className="btn">
                        Go to playground
                    </button>
                </div>
            </>
        </PageTemplate>
    );
};

export default AppPage;
