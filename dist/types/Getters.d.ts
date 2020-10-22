export interface Getters extends Readonly<{
    isStandby: boolean;
    isPending: boolean;
    isSettled: boolean;
    isFulfilled: boolean | undefined;
    isRejected: boolean | undefined;
    hasResult: boolean | undefined;
    hasError: boolean | undefined;
}> {
}
