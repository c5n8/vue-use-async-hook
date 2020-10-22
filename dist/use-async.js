import { reactive, computed } from 'vue';
import { extend } from 'vue-extend-reactive';
export default useAsync;
export function useAsync(fn) {
    const state = reactive({
        status: 'standby',
        result: undefined,
        error: undefined,
    });
    const getters = reactive({
        isStandby: computed(() => state.status === 'standby'),
        isPending: computed(() => state.status === 'pending'),
        isSettled: computed(() => state.status === 'fulfilled' || state.status === 'rejected'),
        isFulfilled: computed(() => getters.isSettled ? state.status === 'fulfilled' : undefined),
        isRejected: computed(() => getters.isSettled ? state.status === 'rejected' : undefined),
        hasResult: computed(() => getters.isSettled ? state.result != null : undefined),
        hasError: computed(() => getters.isSettled ? state.error != null : undefined),
    });
    async function fnReactive(...args) {
        state.status = 'pending';
        state.result = undefined;
        state.error = undefined;
        try {
            const result = await fn(...args);
            state.status = 'fulfilled';
            state.result = result;
            state.error = null;
            return result;
        }
        catch (error) {
            state.status = 'rejected';
            state.error = error;
            throw error;
        }
    }
    return [
        fnReactive,
        extend(reactive({
            status: computed(() => state.status),
            result: computed(() => state.result),
            error: computed(() => state.error),
        }), getters),
    ];
}
