import { reactive, computed } from '@vue/composition-api'
import { extend } from 'vue-extend-reactive'

export default useAsync

export function useAsync<F extends (...args: any[]) => Promise<any>>(
  fn: F
): [F, PromiseSnapshot<Unpacked<ReturnType<F>>>] {
  const state: State<Unpacked<ReturnType<F>>> = reactive({
    status: 'standby',
    result: undefined,
    error: undefined,
  })

  const getters: Getters = reactive({
    isStandby: computed(() => state.status === 'standby'),
    isPending: computed(() => state.status === 'pending'),
    isSettled: computed(
      () => state.status === 'fulfilled' || state.status === 'rejected'
    ),
    isFulfilled: computed(() =>
      getters.isSettled ? state.status === 'fulfilled' : undefined
    ),
    isRejected: computed(() =>
      getters.isSettled ? state.status === 'rejected' : undefined
    ),
    hasResult: computed(() =>
      getters.isSettled ? state.result != null : undefined
    ),
    hasError: computed(() =>
      getters.isSettled ? state.error != null : undefined
    ),
  })

  async function fnReactive(
    ...args: Parameters<F>
  ): Promise<Unpacked<ReturnType<F>>> {
    state.status = 'pending'
    state.result = undefined
    state.error = undefined

    try {
      const result = await fn(...args)
      state.status = 'fulfilled'
      state.result = result
      state.error = null

      return result
    } catch (error) {
      state.status = 'rejected'
      state.error = error

      throw error
    }
  }

  return [
    <F>fnReactive,
    extend(
      reactive({
        status: computed(() => state.status),
        result: computed(() => state.result),
        error: computed(() => state.error),
      }),
      getters
    ),
  ]
}

interface PromiseSnapshot<R> extends Readonly<State<R>>, Getters {}

interface State<R> {
  status: 'standby' | 'pending' | 'fulfilled' | 'rejected'
  result: R | undefined
  error: any
}

interface Getters
  extends Readonly<{
    isStandby: boolean
    isPending: boolean
    isSettled: boolean
    isFulfilled: boolean | undefined
    isRejected: boolean | undefined
    hasResult: boolean | undefined
    hasError: boolean | undefined
  }> {}

type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T
