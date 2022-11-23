import { PageHeader } from '@/components/molecules';

const PageTemplate = ({ children }: { children: JSX.Element }) => {
    return (
        <div className="min-h-exact-screen flex flex-col">
            <PageHeader />
            <div className="flex-grow bg-gray-100">
                <div className="max-w-3xl mx-auto p-4">{children}</div>
            </div>
        </div>
    );
};

export default PageTemplate;
