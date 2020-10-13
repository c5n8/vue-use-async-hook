import { reactive, computed } from '@vue/composition-api'
import { extend } from 'vue-extend-reactive'

export default useAsyncFunction

export function useAsyncFunction<
  F extends (...args: any[]) => Promise<Unpacked<ReturnType<F>>>
>(fn: F): PromiseSnapshot<F> {
  const state: State<F> = reactive({
    error: undefined,
    result: undefined,
    status: 'standby',
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

  async function start(
    ...args: Parameters<F>
  ): Promise<Unpacked<ReturnType<F>> | undefined> {
    state.error = undefined
    state.result = undefined
    state.status = 'pending'

    let result: Unpacked<ReturnType<F>> | undefined

    try {
      result = await fn(...args)
    } catch (error) {
      state.error = error
      state.status = 'rejected'

      throw error
    }

    state.error = null
    state.result = result
    state.status = 'fulfilled'

    return result
  }

  return extend(extend(state, getters), <Methods<F>>{
    start,
  })
}

interface PromiseSnapshot<F extends AsyncFunction>
  extends State<F>,
    Getters,
    Methods<F> {
  readonly error: any
  readonly result: Unpacked<ReturnType<F>> | undefined
  readonly status: PromiseStatus
}

interface State<F extends AsyncFunction> {
  error: any
  result: Unpacked<ReturnType<F>> | undefined
  status: PromiseStatus
}

interface Getters {
  readonly isStandby: boolean
  readonly isPending: boolean
  readonly isSettled: boolean
  readonly isFulfilled: boolean | undefined
  readonly isRejected: boolean | undefined
  readonly hasResult: boolean | undefined
  readonly hasError: boolean | undefined
}

interface Methods<F extends AsyncFunction> {
  start(...args: Parameters<F>): ReturnType<F>
}

type PromiseStatus = 'standby' | 'pending' | 'fulfilled' | 'rejected'

type AsyncFunction = (...args: any[]) => Promise<unknown>

type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T
