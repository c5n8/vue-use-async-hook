export interface State<R> {
    status: 'standby' | 'pending' | 'fulfilled' | 'rejected';
    result: R | undefined;
    error: any;
}
