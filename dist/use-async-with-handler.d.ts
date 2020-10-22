import type { PromiseSnapshot, Unpacked } from './types';
export declare function useAsyncWithHandler<F extends (...args: any[]) => Promise<any>>(fn: F, { onFulfilled, onRejected, onSettled, }: {
    onFulfilled?: (result: any) => void;
    onRejected?: (error: any) => void;
    onSettled?: () => void;
}): [
    (...args: Parameters<F>) => Promise<Unpacked<ReturnType<F>> | undefined>,
    PromiseSnapshot<Unpacked<ReturnType<F>>>
];
