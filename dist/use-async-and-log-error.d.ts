import type { PromiseSnapshot, Unpacked } from './types';
export declare function useAsyncAndLogError<F extends (...args: any[]) => Promise<any>>(fn: F): [
    (...args: Parameters<F>) => Promise<Unpacked<ReturnType<F>> | undefined>,
    PromiseSnapshot<Unpacked<ReturnType<F>>>
];
