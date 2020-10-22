import { useAsyncWithHandler } from './use-async-with-handler';
export function useAsyncIgnoringError(fn) {
    return useAsyncWithHandler(fn, {
        onRejected: () => { },
    });
}
