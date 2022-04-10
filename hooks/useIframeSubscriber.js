import { useEffect } from 'react';

export default function useIframeSubscriber(iframe, reducer) {
    useEffect(() => {
        if (!iframe) {
            return;
        }

        window.addEventListener('message', (event) => {
            if (event.origin !== window.location.origin) {
                return;
            }

            const { type, payload } = event.data;
            reducer(type, payload);
        });

        return () => {
            window.removeEventListener('message', () => {});
        };
    }, [iframe, reducer]);
}
