import type { PromiseSnapshot, Unpacked } from './types'
import { useAsyncHandler } from './use-async-handler'

export function useAsyncLogError<F extends (...args: any[]) => Promise<any>>(
  fn: F
): [
  (...args: Parameters<F>) => Promise<Unpacked<ReturnType<F>> | undefined>,
  PromiseSnapshot<Unpacked<ReturnType<F>>>
] {
  return useAsyncHandler(fn, {
    onRejected: (error) => console.error(error),
  })
}
