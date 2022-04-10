import { useCallback } from 'react';

export default function useIframePublisher() {
    const publishAction = useCallback((type, payload) => {
        window.parent.postMessage({ type, payload }, '*');
    }, []);

    return { publishAction };
}
