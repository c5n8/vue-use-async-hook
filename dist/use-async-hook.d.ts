export default useAsync;
export declare function useAsync<F extends (...args: any[]) => Promise<Unpacked<ReturnType<F>>>>(fn: F): PromiseSnapshot<F>;
interface PromiseSnapshot<F extends AsyncFunction> extends State<F>, Getters, Methods<F> {
    readonly error: any;
    readonly result: Unpacked<ReturnType<F>> | undefined;
    readonly status: PromiseStatus;
}
interface State<F extends AsyncFunction> {
    error: any;
    result: Unpacked<ReturnType<F>> | undefined;
    status: PromiseStatus;
}
interface Getters {
    readonly isStandby: boolean;
    readonly isPending: boolean;
    readonly isSettled: boolean;
    readonly isFulfilled: boolean | undefined;
    readonly isRejected: boolean | undefined;
    readonly hasResult: boolean | undefined;
    readonly hasError: boolean | undefined;
}
interface Methods<F extends AsyncFunction> {
    start(...args: Parameters<F>): ReturnType<F>;
}
declare type PromiseStatus = 'standby' | 'pending' | 'fulfilled' | 'rejected';
declare type AsyncFunction = (...args: any[]) => Promise<unknown>;
declare type Unpacked<T> = T extends (infer U)[] ? U : T extends (...args: any[]) => infer U ? U : T extends Promise<infer U> ? U : T;
