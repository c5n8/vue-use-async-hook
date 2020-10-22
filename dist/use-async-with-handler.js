import useAsync from './use-async';
export function useAsyncWithHandler(fn, { onFulfilled, onRejected, onSettled, }) {
    const [_call, snapshot] = useAsync(fn);
    async function call(...args) {
        let result;
        try {
            result = await _call(...args);
        }
        catch (error) {
            onRejected?.(error);
            return undefined;
        }
        finally {
            onSettled?.();
        }
        onFulfilled?.(result);
        return result;
    }
    return [call, snapshot];
}
