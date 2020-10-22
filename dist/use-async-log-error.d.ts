import { useAsyncWithHandler } from './use-async-with-handler';
import { PromiseSnapshot, Unpacked } from './types';
export declare function useAsyncLogError<F extends (...args: any[]) => Promise<any>>(fn: F): [
    (...args: Parameters<F>) => Promise<Unpacked<ReturnType<F>> | undefined>,
    PromiseSnapshot<Unpacked<ReturnType<typeof useAsyncWithHandler>>>
];
