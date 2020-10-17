import { reactive, computed } from '@vue/composition-api'
import { extend } from 'vue-extend-reactive'

export default useAsync

export function useAsync<F extends Async<F>>(fn: F): Snapshot<F> {
  const state: State<F> = reactive({
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

  async function start(
    ...args: Parameters<F>
  ): Promise<Unpacked<ReturnType<F>>> {
    state.status = 'pending'
    state.result = undefined
    state.error = undefined

    let result

    try {
      result = await fn(...args)
    } catch (error) {
      state.error = error
      state.status = 'rejected'

      throw error
    }

    state.status = 'fulfilled'
    state.result = result
    state.error = null

    return result
  }

  return extend(
    extend(
      <State<F>>reactive({
        status: computed(() => state.status),
        result: computed(() => state.result),
        error: computed(() => state.error),
      }),
      getters
    ),
    { start }
  )
}

type Snapshot<F extends Async<F>> = Readonly<
  State<F> &
    Getters & {
      start(...args: Parameters<F>): Promise<Unpacked<ReturnType<F>>>
    }
>

interface State<F extends Async<F>> {
  status: 'standby' | 'pending' | 'fulfilled' | 'rejected'
  result: Unpacked<ReturnType<F>> | undefined
  error: any
}

type Getters = Readonly<{
  isStandby: boolean
  isPending: boolean
  isSettled: boolean
  isFulfilled: boolean | undefined
  isRejected: boolean | undefined
  hasResult: boolean | undefined
  hasError: boolean | undefined
}>

export type Async<F extends (...args: any[]) => Promise<unknown>> = (
  ...args: any[]
) => Promise<Unpacked<ReturnType<F>>>

export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T
