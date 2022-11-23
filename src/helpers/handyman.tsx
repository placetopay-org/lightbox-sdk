import App from '@/App';
import Example1 from '@/Example1';

export const selectReactRoot = (): [HTMLElement, JSX.Element] => {
    let element = document.getElementById('root');
    let component = <App />;

    if (!element) {
        element = document.getElementById('example1');
        component = <Example1 />;
    }

    if (!element) throw new Error('Could not find root element');

    return [element, component];
};
