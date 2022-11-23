const PageHeader = () => {
    const pathname = window.location.pathname;
    const names = {
        '/': 'Playground',
        '/example1.html': 'Example Page #1',
    };

    return (
        <div className="flex justify-between border-b items-center border-gray-300 shadow p-4">
            <h1 className="font-bold text-gray-700 text-lg">Lightbox Sdk</h1>
            <h1 className="font-bold text-gray-700 text-lg">{names[pathname as keyof typeof names]}</h1>
        </div>
    );
};

export default PageHeader;
