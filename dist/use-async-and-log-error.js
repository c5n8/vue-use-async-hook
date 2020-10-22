import { useAsyncWithHandler } from './use-async-with-handler';
export function useAsyncAndLogError(fn) {
    return useAsyncWithHandler(fn, {
        onRejected: (error) => console.error(error),
    });
}
