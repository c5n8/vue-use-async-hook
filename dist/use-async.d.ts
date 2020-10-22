export default useAsync;
export declare function useAsync<F extends (...args: any[]) => Promise<any>>(fn: F): [F, PromiseSnapshot<Unpacked<ReturnType<F>>>];
interface PromiseSnapshot<R> extends Readonly<State<R>>, Getters {
}
interface State<R> {
    status: 'standby' | 'pending' | 'fulfilled' | 'rejected';
    result: R | undefined;
    error: any;
}
interface Getters extends Readonly<{
    isStandby: boolean;
    isPending: boolean;
    isSettled: boolean;
    isFulfilled: boolean | undefined;
    isRejected: boolean | undefined;
    hasResult: boolean | undefined;
    hasError: boolean | undefined;
}> {
}
declare type Unpacked<T> = T extends (infer U)[] ? U : T extends (...args: any[]) => infer U ? U : T extends Promise<infer U> ? U : T;
